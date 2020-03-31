<template>
  <div :class="$style.wrapper">
  <div :class="$style.status">
    <template v-for="(item, index) of statusList">
      <label
        :class="{[$style.checked]: task.status === item}"
        :key="index"
        >
        <input
          type="radio"
          name="status"
          @change="$emit('changeStatus', item)"/> {{item}}
      </label>
    </template>
  </div>
  <input
    :class="$style.text"
    placeholder="task comment"
    v-model="task.comment"
    @input="$emit('changeComment', task.comment)" />
  <div :class="$style.button">
    <button :class="[$style.update, disabledClass]" @click="$emit('update')">update task</button>
    <button :class="$style.delete" @click="$emit('delete')">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</div>
</template>
<script>
export default {
  name: 'EditForm',
  props: {
    disabled: Boolean,
    task: {}
  },
  data () {
    return {
      statusList: ['new', 'wip', 'done', 'pending']
    }
  },
  computed: {
    disabledClass () {
      if (this.disabled) {
        return this.$style.disabled
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  max-width 850px
  margin 0 auto
  .status
    display flex
    justify-content space-between
    input
      display none
    label
      flex 1
      display block
      height 40px
      line-height 40px
      text-align center
      border-style solid
      border-width 1px 1px 0 0
      border-color #ddd
      color #ccc
      font-size 14px
      cursor pointer
      &:first-child
        border-width 1px 1px 0 1px
        border-radius 5px 0 0 0
      &:last-child
        border-radius 0 5px 0 0
    .checked
      font-weight bold
      color #fff
      background #65c799

  .text
    height 60px
    width 100%
    border-style solid
    border-width 1px
    border-color #ddd
    outline none
    padding 20px
    font-size 18px
    &::placeholder
      color #ddd
    &:-ms-input-placeholder
      color #ddd
    &::-ms-input-placeholder
      color #ddd

  .button
    display flex
    height 35px
    .update
      flex 1
      outline none
      border-style solid
      border-color #ddd
      border-width 0 1px 1px 1px
      border-radius 0 0 0 5px
      background #f8f8f8
      color #888
      cursor pointer
      font-size 13px
      &.disabled
        background #fcfcfc
        color #eee
        pointer-events none
    .delete
      width 40px
      outline none
      cursor pointer
      border-style solid
      border-color #ddd
      border-width 0 1px 1px 0
      border-radius 0 0 5px 0
      background #fff
      i
        font-size 18px
        color #888
</style>
