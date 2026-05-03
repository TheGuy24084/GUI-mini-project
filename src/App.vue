<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './components/Layout/MainLayout.vue';
import ToastNotification from './components/ToastNotification.vue';
import RecipeDetailSheet from './components/RecipeDetailSheet.vue';
import SettingsDrawer from './components/SettingsDrawer.vue';
import AuthModal from './components/AuthModal.vue';
import { useDark } from '@vueuse/core';

// Ensure dark mode initializes properly on root html
useDark();

const route = useRoute();
const showSettings = ref(false);

</script>

<template>
  <MainLayout v-if="route.path !== '/login'" @open-settings="showSettings = true">
    <router-view />
  </MainLayout>

  <router-view v-else />

  <SettingsDrawer :is-open="showSettings" @close="showSettings = false" />
  <AuthModal />
  <ToastNotification />
  <RecipeDetailSheet />
</template>
