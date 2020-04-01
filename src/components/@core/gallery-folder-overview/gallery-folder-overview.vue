<template>
  <div class="gallery-folder-overview">
    <router-link
      :to="{ name: 'folder-detail', params: { foldername: folder.name }}"
      :key="'folder-'+index"
      v-for="(folder, index) in folders"
      class="gallery-folder-overview__folder-wrapper"
    >
      <img :src="folder.thumb" class="gallery-folder-overview__folder-img" />
      <div class="gallery-folder-overview__folder-label">{{folder.name}}</div>
      <div class="gallery-folder-overview__folder-count">{{folder.count}}</div>
    </router-link>
  </div>
</template>

<script lang="ts" src="./gallery-folder-overview.ts"></script>
<style scoped lang="scss" src="./gallery-folder-overview.scss"></style>
