<template>
  <div class="gallery-folder">
    <router-link
      :to="{ name: 'folder-detail', params: { folders: getFolderString() }}"
      class="gallery-folder__wrapper"
    >
      <img :src="getThumb()" class="gallery-folder__img" />
      <div class="gallery-folder__label">{{folder.name}}</div>
      <div class="gallery-folder__count">{{getCount()}}</div>
    </router-link>
  </div>
</template>

<script lang="ts" src="./gallery-folder.ts"></script>
<style scoped lang="scss" src="./gallery-folder.scss"></style>
