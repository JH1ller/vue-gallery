<template>
  <div
    class="gallery-video"
    :class="{ 'card-tall': randomCardSize(), 'card-wide': randomCardSize() }"
  >
    <!--  <router-link :to="{ name: 'image-detail', params: { image: image.path }}"> -->
    <video
      ref="player"
      :src="getPath()"
      class="gallery-video__video"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      :type="getType()"
      loop
      muted
    />
    <!-- </router-link> -->
  </div>
</template>

<script lang="ts" src="./gallery-video.ts"></script>
<style scoped lang="scss" src="./gallery-video.scss"></style>
