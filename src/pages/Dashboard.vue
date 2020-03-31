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
import axios from 'axios'

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
      const tasks = (await axios.get('http://localhost:8081/')).data
      this.allTasks = tasks
    },
    addTask (comment) {
      if (!comment) return

      axios
        .post('http://localhost:8081/', {
          status: 'new',
          comment
        })
        .then(() => {
          const getId = () => {
            if (this.allTasks.length === 0) return 1
            return this.allTasks[this.allTasks.length - 1].id + 1
          }

          this.allTasks.push({
            id: getId(),
            comment,
            status: 'new'
          })
          this.changeStatus('all')
        })
    },
    deleteTask (id) {
      axios
        .delete(`http://localhost:8081/${id}`)
        .then(() => {
          const index = this.allTasks.findIndex((v) => v.id === id)
          this.allTasks.splice(index, 1)
        })
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
</style>
