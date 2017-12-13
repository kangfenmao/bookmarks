<template>
  <div class="main">
    <navigation></navigation>
    <tags></tags>
    <div class="main-content">
      <form class="form-horizontal col-md-8 col-xs-12" id="add-form">
        <div class="form-group has-feedback">
          <div class="col-md-10">
            <input type="url" class="form-control" v-model="url" placeholder="输入网址" @input="getSiteInfo" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group has-feedback">
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="title" placeholder="网站标题" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="keywords" placeholder="关键词（选填）">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <textarea rows="3" class="form-control" v-model="description" placeholder="网站描述（选填）"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="tag" placeholder="请在左侧选择标签或输入新标签">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <button type="submit" class="btn btn-success" id="save">保存</button>
            <button type="button" class="btn btn-default" onclick="javascript:router.go(-1)">取消</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Tag from 'App/Models/Tag'
  import Site from 'App/Models/Site'

  export default {
    data() {
      return {
        url : '',
        title : '',
        keywords : '',
        description : '',
        tag_id: '',
        tag: '',
        site_id : this.$route.params.id
      }
    },
    components: {
      tags : require('./tags').default,
    },
    created() {
      app.$on('select-tag', this.tagSelected)

      // edit mode
      if (this.site_id) this.editSite(this.site_id)

      // select tag on create
      let tag = Tag.get(window.selected_tag_id)
      this.tag = tag ? tag.name : ''
    },
    mounted() {
      $('#add-form').validator().on('submit', this.submit)
    },
    methods: {
      tagSelected(id, name) {
        this.tag_id = id
        this.tag = name
      },
      getSiteInfo(event) {
        let url = event.target.value
        if(!/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(url)) return

        this.title = ''
        this.keywords = ''
        this.description = ''

        this.$http.get('site-info?url=' + url).then(function(response) {
          this.title = response.body.title
          this.keywords = response.body.keywords
          this.description = response.body.description
        })
      },
      editSite(id) {
        let site = Site.get(id)
        this.url = site.url
        this.title = site.title
        this.keywords = site.keywords
        this.description = site.description
      },
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()

          let data = {
            id: this.site_id,
            url: this.url,
            title: this.title,
            keywords: this.keywords,
            description: this.description,
            tag: this.tag ? this.tag : '未分类'
          }

          let url = this.site_id ? 'site/update' : 'site/create'

          this.$http.post(url, data).then((response) => {
            Tag.clearCache()
            Site.clearCache()
            Tag.cache(response.body.tags)
            Site.cache(response.body.sites)
            router.push('/tag/' + response.body.tag_id)
          }, (response) => {
            alert('保存失败！')
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main {display: flex}
  .main-content {
    flex: 1;
    padding-left: 260px;
    padding-right: 40px;
    padding-top: 86px;
    padding-bottom: 20px;
    height: 100%;
  }
  form {margin-left: -15px}
  .form-control {
    border-radius: 0;
    box-shadow: none;
  }
</style>
