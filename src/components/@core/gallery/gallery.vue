<template>
  <div class="component">
    <div class="gallery">
      <transition name="fade">
        <gallery-image-list :images="currentFolderImages" v-if="!showFolders" key="image-list"></gallery-image-list>
        <gallery-folder-overview
          @open-folder="openFolder"
          :folders="folders"
          v-else
          key="folder-overview"
        ></gallery-folder-overview>
      </transition>
      <transition name="fade">
        <lightbox :image="currentLightboxImage" v-if="showLightbox"></lightbox>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./gallery.ts"></script>
<style scoped lang="scss" src="./gallery.scss"></style>
