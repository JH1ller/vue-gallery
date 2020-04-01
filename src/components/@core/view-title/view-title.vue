<template>
  <div class="component">
    <div class="view-title">
      <transition name="fade">
        <router-link to="/gallery" class="view-title__backbtn-wrapper">
          <font-awesome-icon icon="arrow-left" v-show="showBackBtn" class="view-title__backbtn" />
        </router-link>
      </transition>
      <span class="view-title__text" :class="{ '-move-left': !showBackBtn }">{{ title }}</span>
    </div>
  </div>
</template>

<script lang="ts" src="./view-title.ts"></script>
<style scoped lang="scss" src="./view-title.scss"></style>
