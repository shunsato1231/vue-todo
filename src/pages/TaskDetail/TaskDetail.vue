<template>
  <div class="about">
    <h2>Edit Task<span>ID: {{$route.params.id}}</span></h2>
    <div :class="$style.edit">
      <EditForm
        @update="updateTask"
        @delete="deleteTask"
        @changeStatus="task.status = $event"
        @changeComment="task.comment = $event"
        :task="task"
        :disabled="disabled"
      />
    </div>
    <router-link to="/" :class="$style.back">
      <i class="fas fa-chevron-left"></i>
    <span>back</span>
  </router-link>
  </div>
</template>

<script>
import storage from '../../storage/storage'
import EditForm from '../../components/EditForm/EditForm.vue'

export default {
  name: 'TaskDetail',
  components: {
    EditForm
  },
  data () {
    return {
      task: {},
      beforeChangeTask: {}
    }
  },
  computed: {
    disabled () {
      if (!this.task.comment || (this.beforeChangeTask.status === this.task.status &&
        this.beforeChangeTask.comment === this.task.comment)) {
        return true
      }
      return false
    }
  },
  created () {
    this.getTask()
  },
  methods: {
    async getTask () {
      const task = await storage.get(this.$route.params.id)
      this.task = JSON.parse(JSON.stringify(task))
      this.beforeChangeTask = JSON.parse(JSON.stringify(task))
    },
    async updateTask () {
      if (!this.task.comment) return

      await storage.put(this.task)
      this.$router.push('/')
    },
    async deleteTask () {
      await storage.delete(this.$route.params.id)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" module>
  h2
    font-size 16px
    margin-top 56px
    span
      font-size 14px
      margin-left 10px
      color #aaa
      font-weight normal
  .editor
    margin 56px auto
  .back
    cursor pointer
    display flex
    margin 24px 0
    text-decoration none
    align-items center
    i
      font-size 40px
      margin-right 10px
      color #f0f0f0
    span
      font-size 14px
      color #bbb
</style>
