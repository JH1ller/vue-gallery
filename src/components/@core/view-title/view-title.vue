<template>
  <div class="view-title">
    <router-link :to="getPrevRoute()" class="view-title__backbtn-wrapper">
      <transition name="fade">
        <font-awesome-icon icon="arrow-left" class="view-title__backbtn" v-if="showBackBtn" />
      </transition>
    </router-link>

    <div class="view-title__folders" :class="{ '-move-left': !showBackBtn }">
      <transition-group name="fade">
        <div
          class="view-title__label-wrapper"
          v-for="(folder, index) in folderList"
          :key="'label-wrapper' + index"
        >
          <router-link :to="getRoute(index)" v-if="showLink(index)">
            <span class="view-title__label" :key="'label' + index">{{ folder }}</span>
          </router-link>
          <span class="view-title__label" :key="'label' + index" v-else>{{ folder }}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" src="./view-title.ts"></script>
<style scoped lang="scss" src="./view-title.scss"></style>
