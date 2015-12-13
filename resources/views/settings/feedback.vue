<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <form id="feedback-form">
        <div class="row">
          <div class="form-group col-md-6">
            <textarea class="form-control" rows="5" placeholder="在这里输入您的反馈内容..." v-model="feedback" required></textarea>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success">留言反馈</button>
          <a href="http://push.ijustplay.cn" target="_blank" class="btn btn-link">邮箱反馈</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        feedback: ''
      }
    },
    components: {
      'nav-menu' : require('./menu'),
    },
    mounted() {
      $('#feedback-form').validator().on('submit', this.submit)
    },
    methods: {
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()
          this.$http.post('feedback', {feedback: this.feedback}).then((response) => {
            this.feedback = ''
            alert('感谢您的反馈！')
          });
        }
      }
    }
  }
</script>
