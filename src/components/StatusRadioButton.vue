<template>
  <div :class="$style.wrapper">
    <template v-for="(item, index) in list">
      <label
        :key="index"
        :class="{[$style.checked]: item.status}">
        <input
          type="radio"
          name="status"
          :value="item.name"
          :checked="item.status"
          @change="$emit('change', item.name)"
          /> {{item.name}}
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'StatusRadioButton',
  props: {
    list: Array
  },
  methods: {
  }
}
</script>

<style lang="stylus" module>
.wrapper
  display inline-block
  margin-right 20px
  input
    display none
  label
    position relative
    margin-right 5px
    padding-left 22px
    font-size 14px
    &:before
      display inline-block
      position absolute
      content ''
      width 18px
      height 18px
      border-radius 10px
      border 2px solid #ddd
      box-sizing border-box
      top 50%
      left 0
      transform translateY(-50%)
  label.checked
    &:before
      border-color #65C799
    &:after
      display inline-block
      position absolute
      left 5px
      top 50%
      transform translateY(-50%)
      content ''
      width 8px
      height 8px
      border-radius 4px
      background #65C799
</style>
