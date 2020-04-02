<template>
  <div class="lightbox" @click="close" ref="wrapper">
    <transition name="fade">
      <img :key="getPath()" :src="getPath()" class="lightbox__image" />
    </transition>
    <div class="lightbox__btn-prev" @click="goPrev(image)">
      <font-awesome-icon icon="chevron-left" />
    </div>
    <div class="lightbox__btn-next" @click="goNext(image)">
      <font-awesome-icon icon="chevron-right" />
    </div>
  </div>
</template>

<script lang="ts" src="./lightbox.ts"></script>
<style scoped lang="scss" src="./lightbox.scss"></style>
