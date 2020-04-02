<template>
  <div
    class="gallery-image"
    :class="{ 'card-tall': randomCardSize(), 'card-wide': randomCardSize() }"
  >
    <router-link :to="{ name: 'image-detail', params: { image: image.path }}">
      <img :src="getPath()" class="gallery-image__img" @load="imageLoaded" />
    </router-link>
  </div>
</template>

<script lang="ts" src="./gallery-image.ts"></script>
<style scoped lang="scss" src="./gallery-image.scss"></style>
