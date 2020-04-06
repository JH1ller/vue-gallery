<template>
  <div
    class="gallery-video"
    :class="{ 'card-tall': randomCardSize(), 'card-wide': randomCardSize() }"
  >
    <router-link :to="{ name: 'file-detail', params: { file: video.name }}">
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
      <font-awesome-icon icon="play" class="gallery-video__btn-play" />
    </router-link>
  </div>
</template>

<script lang="ts" src="./gallery-video.ts"></script>
<style scoped lang="scss" src="./gallery-video.scss"></style>
