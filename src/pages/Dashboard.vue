<template>
  <div class="dashboard">
    <div :class="$style.sort">
      <StatusRadioButton
        :list="statusList"
        @change="changeStatus" />
    </div>
    <TaskList
      :tasks="tasks"
      @delete="deleteTask"
    />
    <p
      :class="[{[$style.hidden]: allTasks.length === 0 }, $style.resetButton]"
      @click="resetTasks"
    >
      reset tasks
      <i class="fas fa-redo"></i>
    </p>
    <div :class="$style.add">
      <AddTaskForm
        :disabled="addTaskDisabled"
        @add="addTask"
        @change="validateInputText"
      />
    </div>
  </div>
</template>

<script>
import storage from '../storage/storage'

import StatusRadioButton from '../components/StatusRadioButton.vue'
import TaskList from '../components/TaskList.vue'
import AddTaskForm from '../components/AddTaskForm.vue'

export default {
  name: 'Dashboard',
  components: {
    StatusRadioButton,
    TaskList,
    AddTaskForm
  },
  data () {
    return {
      allTasks: [],
      statusName: 'all',
      statusList: [
        { name: 'all', status: true },
        { name: 'new', status: false },
        { name: 'wip', status: false },
        { name: 'done', status: false },
        { name: 'pending', status: false }
      ],
      addTaskDisabled: 'disabled'
    }
  },
  computed: {
    tasks () {
      if (this.statusName === 'all') {
        return this.allTasks
      }
      return this.allTasks.filter((task) => task.status === this.statusName)
    }
  },
  created () {
    this.getTasks()
  },
  methods: {
    async getTasks () {
      const tasks = await storage.get()
      this.allTasks = tasks
    },
    addTask (comment) {
      if (!comment) return

      storage
        .post({
          status: 'new',
          comment
        })
        .then((id) => {
          this.allTasks.push({
            id,
            comment,
            status: 'new'
          })
          this.changeStatus('all')
        })
    },
    deleteTask (id) {
      storage
        .delete(id)
        .then(() => {
          const index = this.allTasks.findIndex((v) => v.id === id)
          this.allTasks.splice(index, 1)
        })
    },
    resetTasks () {
      storage
        .deleteDb()
    },
    changeStatus (name) {
      const prevSelectedIndex = this.statusList.findIndex((item) => item.name === this.statusName)
      const nextSelectIndex = this.statusList.findIndex((item) => item.name === name)

      this.statusList[prevSelectedIndex].status = false
      this.statusList[nextSelectIndex].status = true

      this.statusName = name
    },
    validateInputText (text) {
      if (!text) {
        this.addTaskDisabled = true
      } else {
        this.addTaskDisabled = false
      }
    }
  }
}
</script>

<style lang="stylus" module>
.sort
  margin 56px 0 24px 0
.add
  margin-top 24px
.resetButton
  font-size 12px
  margin-top 5px
  color #999
  i
    margin-left 3px
    color #bbb
  &.hidden
    display none
  &:hover
    cursor pointer
</style>
