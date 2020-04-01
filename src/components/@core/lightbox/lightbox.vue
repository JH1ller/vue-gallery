<template>
  <div class="lightbox" @click="close" ref="wrapper">
    <img :src="image.pathResolved" alt class="lightbox__image" />
  </div>
</template>

<script lang="ts" src="./lightbox.ts"></script>
<style scoped lang="scss" src="./lightbox.scss"></style>
