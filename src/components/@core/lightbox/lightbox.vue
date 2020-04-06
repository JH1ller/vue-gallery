<template>
  <div class="lightbox" @click="close" ref="wrapper">
    <transition name="fade">
      <img
        :key="getPath()"
        :src="getPath()"
        class="lightbox__image"
        v-if="isImage(file)"
        ref="image_wrapper"
        :class="{ '-fullscreen': isFullScreen }"
      />
      <video
        :key="getPath()"
        :src="getPath()"
        class="lightbox__video"
        :class="{ '-fullscreen': isFullScreen }"
        v-else
        autoplay
        controls
      />
    </transition>
    <div class="lightbox__btn-prev" @click="goPrev(file)" :class="{ '-fullscreen': isFullScreen }">
      <font-awesome-icon icon="chevron-left" />
    </div>
    <div class="lightbox__btn-next" @click="goNext(file)" :class="{ '-fullscreen': isFullScreen }">
      <font-awesome-icon icon="chevron-right" />
    </div>
    <span
      class="lightbox__btn-diashow"
      @click="toggleDiashow"
      :class="{ '-fullscreen': isFullScreen }"
    >{{ isFullScreen ? 'Exit diashow' : 'Start diashow' }}</span>
  </div>
</template>

<script lang="ts" src="./lightbox.ts"></script>
<style scoped lang="scss" src="./lightbox.scss"></style>
