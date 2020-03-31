<template>
  <div>
    <h2>add new task</h2>
      <div :class="$style.form">
        <input placeholder="task comment"
          v-model="comment"
          @input="$emit('change', comment)"
          @keydown.enter="trigger"
          />
        <button
          @click="add"
          :class="disabledClass"
          >add</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AddTaskForm',
  props: {
    disabled: Boolean
  },
  computed: {
    disabledClass () {
      if (this.disabled) {
        return this.$style.disabled
      }
      return ''
    }
  },
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    add () {
      this.$emit('add', this.comment)
      this.comment = ''
    },
    trigger (event) {
      if (event.keyCode !== 13) return
      this.add()
    }
  }
}
</script>

<style lang="stylus" module>
  h2
    font-size 16px
    margin-bottom 10px
  .form
    display flex
    justify-content space-between
    width 100%
    input
      border 1px solid #ddd
      border-width 1px 0 1px 1px
      outline none
      font-size 14px
      line-height 40px
      padding 0 10px
      border-radius 5px 0 0 5px
      flex-grow 1
      &::placeholder
        color #ddd
      &:-ms-input-placeholder
        color #ddd
      &::-ms-input-placeholder
        color #ddd
    button
      font-size 14px
      border none
      border-radius 0 5px 5px 0
      line-height 40px
      padding 0 20px
      background #65c799
      border 1px solid #65c799
      border-width 1px 1px 1px 0
      color #fff
      cursor pointer
      outline none
      &.disabled
        background #ade0c7
        border 1px solid #ade0c7
        pointer-events none
</style>
