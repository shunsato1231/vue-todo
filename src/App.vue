<template>
  <div id="app">
    <header>
      <h1>Vue Todo</h1>
    </header>
    <div class="wrapper">
      <router-view/>
    </div>
    <footer>
      <small>© 2020 Shun Sato</small>
    </footer>
  </div>
</template>

<style lang="stylus">
/* ヘッダ */
header
  background #42b983
  position fixed
  top 0
  left 0
  width 100%
  height 56px
  line-height 56px
  z-index 100
  h1
    width 90%
    max-width 1200px
    margin 0 auto
    font-size 16px
    color #fff

/*Wrapper*/
.wrapper
  width 90%
  max-width 1200px
  min-height calc(100vh - 105px) /** margin-top 56px + margin-bottom 24px + footer 25px **/
  margin 56px auto 24px
  overflow hidden /* marginが突き抜けるのを回避 */
  &:before /* marginの相殺回避 */
    display block
    content ''

/*Footer*/
footer
  width 100%
  height 25px
  background #42b983
  margin 0
  small
    display block
    margin 0 auto
    width 90%
    max-width 1200px
    font-size 12px
    line-height 25px
    color #fff
</style>
