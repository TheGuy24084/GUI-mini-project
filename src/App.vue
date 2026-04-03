<script setup lang="ts">
import MainLayout from './components/Layout/MainLayout.vue';
import ToastNotification from './components/ToastNotification.vue';
import BookDetailSheet from './components/BookDetailSheet.vue';
</script>

<template>
  <MainLayout>
    <router-view />
  </MainLayout>

  <ToastNotification />
  <BookDetailSheet />
</template>
