<template>
  <div class="navbar">
    <div class="navbar__content">
      <router-link :to="{ name: 'home' }">
        <div class="navbar__logo">
          <!-- <img src="@/assets/images/logo.png" alt class="navbar__logo-image" /> -->
          <span class="navbar__logo-text">Hiller</span>
        </div>
      </router-link>
      <ul class="navbar__links" :class="{ '-open': menuOpen }">
        <li class="navbar__links-link">Gallerie</li>
        <li class="navbar__links-link">Kontakt</li>
        <li class="navbar__links-link">Über uns</li>
      </ul>
      <font-awesome-icon
        icon="bars"
        class="navbar__burger"
        @click="toggleMenu"
        :class="{ '-open': menuOpen }"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./navbar.ts"></script>
<style scoped lang="scss" src="./navbar.scss"></style>
