<template>
  <div id="app">
    <toast></toast>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text-primary;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: $color-bg-primary;
}

.component {
  width: 100%;
}

</style>
