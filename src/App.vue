<script setup lang="ts">
import MainLayout from './components/Layout/MainLayout.vue';
import ToastNotification from './components/ToastNotification.vue';
</script>

<template>
  <MainLayout>
    <router-view />
  </MainLayout>

  <ToastNotification />
</template>
