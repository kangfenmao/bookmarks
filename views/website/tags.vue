<template>
  <div class="tag-list">
    <ul class="list-group">
      <li v-for="tag in tags" class="list-group-item" :class="{active: tag.id == selected}" @click="changeTag(tag.id, tag.name)">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import Tag from 'App/Models/Tag'
  import Site from 'App/Models/Site'

  export default {
    data() {
      return {
        tags : Tag.all() || this.getAllTags(),
        selected : window.selected_tag_id
      }
    },
    created() {
      if (this.$route.params.id == undefined) return

      let site = Site.get(this.$route.params.id)
      let tag = Tag.get(site.tag_id)
      this.selected = tag.id
      app.$emit('select-tag', tag.id, tag.name)
    },
    methods: {
      getAllTags() {
        app.$http.get('tags').then((response) => {
          this.tags = Tag.cache(response.body)
        })
      },
      changeTag(id, name) {
        this.selected = id
        app.$emit('select-tag', id, name)
      }
    }
  }
</script>
