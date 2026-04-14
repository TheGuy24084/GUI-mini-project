<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './components/Layout/MainLayout.vue';
import ToastNotification from './components/ToastNotification.vue';
import BookDetailSheet from './components/BookDetailSheet.vue';
import SettingsOverlay from './components/SettingsOverlay.vue';
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

  <SettingsOverlay :is-open="showSettings" @close="showSettings = false" />
  <AuthModal />
  <ToastNotification />
  <BookDetailSheet />
</template>
