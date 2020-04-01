<template>
  <div class="gallery-image-list">
    <router-link
      :to="{ name: 'image-detail', params: { image: img.pathOriginal }}"
      :key="'img-'+index"
      v-for="(img, index) in images"
      class="gallery-image-list__img-wrapper"
      :class="{ 'card-tall': randomCardSize(), 'card-wide': randomCardSize() }"
    >
      <img :src="img.pathResolved" class="gallery-image-list__img" @load="imageLoaded" />
    </router-link>
    <transition name="fade">
      <div v-if="showLoader" class="gallery-image-list__loader">
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./gallery-image-list.ts"></script>
<style scoped lang="scss" src="./gallery-image-list.scss"></style>
