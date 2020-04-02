<template>
  <div class="gallery-grid">
    <template v-for="(item, index) in items" class="gallery-grid__item">
      <gallery-folder :folder="item" v-if="isDirectory(item)" :key="'folder' + index"></gallery-folder>
      <gallery-image :image="item" v-else :key="'image' + index"></gallery-image>
    </template>
  </div>
</template>

<script lang="ts" src="./gallery-grid.ts"></script>
<style scoped lang="scss" src="./gallery-grid.scss"></style>
