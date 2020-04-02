<template>
  <div class="component">
    <div class="gallery">
      <transition name="fade">
        <gallery-grid :items="currentFolder.children"></gallery-grid>
      </transition>
      <transition name="fade">
        <lightbox :image="currentLightboxImage" v-if="showLightbox"></lightbox>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./gallery.ts"></script>
<style scoped lang="scss" src="./gallery.scss"></style>
