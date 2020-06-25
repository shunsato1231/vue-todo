<template>
  <div :class="$style.wrapper">
    <div :class="$style.heading">
      <div :class="$style.id">ID</div>
      <div :class="$style.comment">Comment</div>
      <div :class="$style.status">Status</div>
    </div>
    <ul>
      <template v-for="(task, index) in tasks">
        <li :key="index" :class="taskItemClass(task.status)">
          <div :class="$style.id">{{ task.id }}</div>
          <div :class="$style.comment">{{ task.comment }}</div>
          <div :class="$style.status">
            <span :class="[statusLabelClass(task.status), $style.label]">{{ task.status }}</span>
          </div>
          <div :class="$style.edit">
            <router-link :to="'/' + task.id">
              <i class="fas fa-edit" :class="$style.icon"></i>
            </router-link>
          </div>
          <div :class="$style.trash">
            <button @click="$emit('delete', task.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </li>
    </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: Array
  },
  methods: {
    statusLabelClass (name) {
      if (name === 'new') return this.$style.new
      if (name === 'done') return this.$style.done
      if (name === 'wip') return this.$style.wip
      if (name === 'pending') return this.$style.pending
      return ''
    },
    taskItemClass (status) {
      if (status === 'done' || status === 'pending') return this.$style.gray
      if (status === 'wip') return this.$style.green

      return ''
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  width 100%
  .heading
    display flex
    justify-content space-between
    width 100%
    border-bottom 2px solid #65c799
    .id
      color #65c799
      font-weight bold
      text-align center
      width 50px
    .comment
      color #65c799
      font-weight bold
      text-align center
      flex 1
    .status
      color #65c799
      font-weight bold
      text-align center
      width 120px
      margin-right 80px
  ul
    li
      display flex
      line-height 40px
      border-bottom 1px solid #eee
      &.gray
        background #f0f0f0
      &.green
        background #ECF7F2
      .id
        font-weight bold
        text-align center
        width 50px
      .comment
        flex 1
      .status
        width 120px
        text-align center
        .label
          display inline-block
          margin 0 auto
          padding 0 10px
          font-size 14px
          border-radius 5px
          height 25px
          line-height 25px
        .new
          background #ADE0C7
          color #fff
        .done
          background #ddd
          color #fff
        .wip
          background #65c799
          color #fff
          font-weight bold
        .pending
          background #CEECDE
          color #fff
      .edit
        width 40px
        text-align center
        .icon
          color #bbb
          font-size 14px
      .trash
        width 40px
        text-align center
        button
          outline none
          cursor pointer
          border none
          background none
          i
            color #bbb
            font-size 14px
</style>
