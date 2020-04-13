<template>
  <div class="gallery">
    <transition name="fade">
      <gallery-grid :key="currentFolder.name" :items="currentFolder.children"></gallery-grid>
    </transition>
    <transition name="fade">
      <lightbox @go-prev="goPrev" @go-next="goNext" :file="currentLightboxFile" v-if="showLightbox"></lightbox>
    </transition>
  </div>
</template>

<script lang="ts" src="./gallery.ts"></script>
<style scoped lang="scss" src="./gallery.scss"></style>
