<template>
  <div class="bookmarks">
    <div class="items-count">
      {{ sites.length }} 个网站
      <span @click="edit_mode = !edit_mode" class="edit-btn pull-right">
        {{ edit_mode ? '完成编辑' : '编辑' }}
      </span>
    </div>
    <div class="list-group row" v-for="(site, index) in sites" :key="site.id">
      <div class="list-group-item" :title="site.description">
        <img v-bind:src="'http://api.byi.pw/favicon/?url='+site.url" class="favicon">
        <a :href="site.url" target="_blank"><span class="title">{{ site.title }}</span></a>
        <a :href="site.url" target="_blank"><span class="url" :title="site.keywords">{{ site.url }}</span></a>
        <div class="menu-bar pull-right">
          <span v-show="!tag_id && !edit_mode" @click="gotoTag(site.tag_id)">{{ getTagName(site.tag_id) }}</span>
          <router-link :to="'/site/'+site.id+'/edit'" class="glyphicon glyphicon-edit" v-show="edit_mode" title="编辑"></router-link>
          <span class="glyphicon glyphicon-trash" v-show="edit_mode" title="删除" @click.self="deleteSite(site.id, index)"></span>
        </div>
      </div>
    </div>
    <div v-show="sites == ''" class="empty">请点击上方 + 按钮添加书签... (＾－＾)V</div>
    <div v-show="keywords" class="search-engine">
      <a :href="baiduLink" target="black" title="在百度中搜索">百度: {{ keywords }}</a>
      <a :href="googleLink" target="black" title="在Google中搜索">Google: {{ keywords }}</a>
    </div>
  </div>
</template>

<script>
  import Tag from 'App/Models/Tag'
  import Site from 'App/Models/Site'
  import Search from 'App/Service/Search'

  export default {
    data() {
      return {
        keywords: null,
        edit_mode: false,
        tag_id: null,
        sites: [],
      }
    },
    watch: {
      $route () {
        this.tag_id = this.$route.params.id
      }
    },
    created() {
      this.init(this.$route.params.id)
      app.$on('refresh', this.getAllSites)
      app.$on('tag-changed', this.getSitesByTag)
      app.$on('search', this.showSearchResult)
      app.$on('open-link', this.openLink)
    },
    computed: {
      baiduLink: () => 'https://www.baidu.com/s?wd=' + this.keywords,
      googleLink: () => 'https://www.google.com.hk/#&q=' + this.keywords
    },
    methods: {
      init(tag_id) {
        this.sites = tag_id == undefined ? Site.take(30) : Tag.sites(tag_id)
      },
      getAllSites() {
        app.$http.get('sites').then((response) => {
          this.sites = Site.cache(response.body)
        })
      },
      getSitesByTag(id) {
        this.keywords = false
        this.sites = id == 'all' ? Site.take(30) : Tag.sites(id)
      },
      showSearchResult(keywords) {
        this.keywords = keywords
        if (keywords.length > 1) {
          this.sites = Search.sites(keywords)
        } else {
          this.sites = Site.take(30)
        }
      },
      getTagName(tag_id) {
        let tag = Tag.get(tag_id)
        return tag == null ? '' : tag.name
      },
      gotoTag(tag_id) {
        router.push('/tag/' + tag_id)
      },
      openLink() {
        let first_result = this.sites[0]
        if (first_result) {
          window.open(first_result.url);
        } else {
          window.open(this.baiduLink);
        }
      },
      deleteSite(id, index) {
        if(!confirm('确定删除？')) return;
        this.$http.get('site/delete/' + id).then(() => {
          this.sites.splice(index, 1)
          const site = Site.get(id)
          const tag_id = site.tag_id
          Site.remove(id)
          if (Tag.sites(tag_id).length == 0) {
            Tag.remove(tag_id)
            app.$emit('reload-tags')
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .bookmarks {
    flex: 1;
    padding-left: 260px;
    padding-right: 40px;
    padding-top: 80px;
    padding-bottom: 20px;
    height: 100%;
    .items-count {
      color: #6bbd7a;
      margin-bottom: 5px;
    }
  }
  .edit-btn {
    color: #303133;
    cursor: pointer;
  }
  .list-group {
    margin-bottom: 0;
  }
  .list-group-item {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #eee;
    .favicon {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    .url {color: #ccc}
    a {color: inherit}
    &:first-child,
    &:last-child {border-radius: 0}
    &:hover,&:focus {
      background: inherit;
    }
  }
  .menu-bar {
    span {
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .search-engine {
    padding: 15px 0;
    a {margin-right: 10px}
  }
  @media (max-width: 600px) {
    .bookmarks {
      padding: 51px 10px;
      padding-bottom: 0;
      width: 100%;
      .list-group {margin: 0 -10px}
      .menu-bar, .favicon, .url {display: none}
    }
  }
</style>
