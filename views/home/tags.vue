<template>
  <div class="tag-list">
    <ul class="list-group">
      <li
        v-for="tag in tags"
        :key="tag.id"
        class="list-group-item"
        :class="{active: tag.id == selected}"
        @click="changeTag(tag.id)">
        {{ tag.name }}
        <div class="pull-right" v-show="tag.id == selected">
          <a @click.stop="editTag(tag.id, tag.name)" class="glyphicon glyphicon-edit" title="编辑"></a>
          <a @click.stop="deleteTag(tag.id)" class="glyphicon glyphicon-trash" title="删除"></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Tag from 'App/Models/Tag'

  export default {
    data() {
      return {
        tags : Tag.all(),
        selected : this.$route.params.id,
      }
    },
    watch: {
      $route () {
        let id = this.$route.params.id
        id = id == undefined ? 'all' : id
        this.selected = id
        app.$emit('tag-changed', id)
      }
    },
    created() {
      app.$off()
      app.$on('refresh', this.getAllTags)
      app.$on('reload-tags', this.reloadTags)
    },
    methods: {
      getAllTags() {
        app.$http.get('tags').then((response) => {
          this.tags = Tag.cache(response.body)
        })
      },
      changeTag(id) {
        router.push('/tag/'+id)
      },
      reloadTags() {
        this.tags = Tag.all()
        router.push('')
      },
      editTag(id, name) {
        let new_name = prompt('请输入新的标签名', name)

        if (new_name == name || new_name == null) {
          return
        }

        name = new_name.replace(/^\s+|\s+$/g,"")

        this.$http.post('tag/rename', {id,name}).then((response) => {
          Tag.clearCache()
          this.getAllTags()
        }, (response) => {
          alert('保存失败，请稍后再试！')
        })
      },
      deleteTag(id) {
        if(confirm("删除该标签会删除该标签下所有网站！！！")) {
          this.$http.get('tag/delete/' + id).then((response) => {
            Tag.clearCache()
            this.getAllTags()
          }, (response) => {
            alert('删除失败，请稍后再试！')
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .tag-list {
    ::-webkit-scrollbar{display: none}
    padding: 0;
    width: 220px;
    position: fixed;
    top: 51px;
    left: 0;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid #ddd;
    .glyphicon {color: #666; font-size: 13px}
    .list-group {padding-bottom: 32px}
    .list-group-item {
      border: 0;
      transition: all 0.3s;
      padding-left: 45px;
      &:first-child,
      &:last-child {
        border-radius: 0;
      }
      &:hover {
         background: #eee;
         cursor: pointer;
      }
      &.active,
      &.active:hover {
        text-shadow: none;
        color: black;
        background: #ddd;
      }
    }
  }
  @media (max-width: 600px) {
    .tag-list {
      display: none;
    }
  }
</style>
