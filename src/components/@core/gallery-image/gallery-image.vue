<template>
  <div
    class="gallery-image"
    :class="{ 'card-tall': randomCardSize(), 'card-wide': randomCardSize() }"
  >
    <router-link :to="{ name: 'file-detail', params: { file: image.name }}">
      <img :src="getPath()" class="gallery-image__img" loading="lazy" />
    </router-link>
  </div>
</template>

<script lang="ts" src="./gallery-image.ts"></script>
<style scoped lang="scss" src="./gallery-image.scss"></style>
