<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from './components/Layout/MainLayout.vue';
import DashboardHeader from './components/DashboardHeader.vue';
import BookGrid from './components/BookGrid.vue';
import BaseModal from './components/BaseModal.vue';
import AddBookForm from './components/AddBookForm.vue';
import ToastNotification from './components/ToastNotification.vue';

const isAddModalOpen = ref(false);
</script>

<template>
  <MainLayout>
    <div class="flex flex-col h-full w-full">
      <DashboardHeader />
      <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <!-- Page Header Row -->
        <div class="mb-6 max-w-7xl mx-auto flex items-start justify-between gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Library Overview</h2>
            <p class="text-slate-500">Discover and manage your book collection.</p>
          </div>
          <button
            id="open-add-book-modal-btn"
            @click="isAddModalOpen = true"
            class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] transition-all shadow-sm shadow-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Book
          </button>
        </div>

        <div class="max-w-7xl mx-auto pb-12">
          <BookGrid />
        </div>
      </div>
    </div>
  </MainLayout>

  <!-- Add Book Modal -->
  <BaseModal v-model="isAddModalOpen" title="Add New Book">
    <AddBookForm @close="isAddModalOpen = false" />
  </BaseModal>

  <!-- Global Toast -->
  <ToastNotification />
</template>
