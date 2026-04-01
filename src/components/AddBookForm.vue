<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useBookStore } from '../store/bookStore';
import { useToast } from '../composables/useToast';
import { aiService } from '../services/aiService';
import { Sparkles, Loader2 } from 'lucide-vue-next';

const emit = defineEmits<{ close: [] }>();

const store = useBookStore();
const { showToast } = useToast();

// ─── Form State ──────────────────────────────────────────────
const CATEGORIES = ['Fiction', 'Science', 'Engineering', 'History'] as const;

const form = reactive({
  title: '',
  author: '',
  category: '',
  isbn: '',
  coverUrl: '',
  description: '',
  tags: [] as string[],
});

const errors = reactive<Record<string, string>>({});
const touched = ref(new Set<string>());
const isSubmitting = ref(false);
const isAISummarizing = ref(false);

// ─── Validation ───────────────────────────────────────────────
const ISBN_REGEX = /^\d{9}[\dX]$|^\d{13}$/;

function validateField(field: keyof typeof form): string {
  switch (field) {
    case 'title':
      return form.title.trim() ? '' : 'Title is required.';
    case 'author':
      return form.author.trim() ? '' : 'Author is required.';
    case 'category':
      return form.category ? '' : 'Please select a category.';
    case 'isbn':
      if (!form.isbn.trim()) return '';
      return ISBN_REGEX.test(form.isbn.trim()) ? '' : 'Must be a valid ISBN-10 or ISBN-13 (digits only).';
    case 'coverUrl':
      return '';
    default:
      return '';
  }
}

function onBlur(field: keyof typeof form) {
  touched.value.add(field);
  errors[field] = validateField(field);
}

function validateAll(): boolean {
  const fields = Object.keys(form) as Array<keyof typeof form>;
  let valid = true;
  fields.forEach((field) => {
    touched.value.add(field);
    const err = validateField(field);
    errors[field] = err;
    if (err) valid = false;
  });
  return valid;
}

// ─── AI Integration ──────────────────────────────────────────
async function handleGenerateAI() {
  if (!form.title || !form.author) {
    showToast('Please enter Title and Author first!', 'error');
    return;
  }

  isAISummarizing.value = true;
  try {
    const [summary, tags] = await Promise.all([
      aiService.generateSummary(form.title, form.author),
      aiService.suggestTags(form.title, form.author, form.category || 'General')
    ]);
    
    form.description = summary;
    form.tags = tags;
    showToast('AI magic complete!', 'success');
  } catch (error) {
    showToast('AI is resting 😴', 'error');
  } finally {
    isAISummarizing.value = false;
  }
}

// ─── Submission ───────────────────────────────────────────────
function handleSubmit() {
  isSubmitting.value = true;
  if (!validateAll()) {
    isSubmitting.value = false;
    return;
  }

  store.addBook({
    id: `book-${Date.now()}`,
    title: form.title.trim(),
    author: form.author.trim(),
    category: form.category,
    isbn: form.isbn.trim() || undefined,
    coverImage: form.coverUrl.trim() || '',
    isAvailable: true,
    description: form.description.trim() || undefined,
    tags: form.tags.length > 0 ? form.tags : undefined,
  });

  showToast(`"${form.title.trim()}" was added to your library.`, 'success');
  emit('close');
}

// ─── Helpers ──────────────────────────────────────────────────
function hasError(field: string): boolean {
  return touched.value.has(field) && !!errors[field];
}
</script>

<template>
  <form id="add-book-form" @submit.prevent="handleSubmit" novalidate class="space-y-5">

    <!-- Title -->
    <div>
      <label for="book-title" class="block text-sm font-medium text-slate-700 mb-1.5">
        Title <span class="text-rose-500">*</span>
      </label>
      <input
        id="book-title"
        v-model="form.title"
        type="text"
        placeholder="e.g. The Pragmatic Programmer"
        @blur="onBlur('title')"
        class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border transition-all duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white"
        :class="hasError('title')
          ? 'border-rose-400 focus:ring-rose-400/40 focus:border-rose-400'
          : 'border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500'"
      />
      <Transition name="err">
        <p v-if="hasError('title')" class="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          {{ errors.title }}
        </p>
      </Transition>
    </div>

    <!-- Author -->
    <div>
      <label for="book-author" class="block text-sm font-medium text-slate-700 mb-1.5">
        Author <span class="text-rose-500">*</span>
      </label>
      <input
        id="book-author"
        v-model="form.author"
        type="text"
        placeholder="e.g. Andrew Hunt"
        @blur="onBlur('author')"
        class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border transition-all duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white"
        :class="hasError('author')
          ? 'border-rose-400 focus:ring-rose-400/40 focus:border-rose-400'
          : 'border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500'"
      />
      <Transition name="err">
        <p v-if="hasError('author')" class="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          {{ errors.author }}
        </p>
      </Transition>
    </div>

    <!-- Category -->
    <div>
      <label for="book-category" class="block text-sm font-medium text-slate-700 mb-1.5">
        Category <span class="text-rose-500">*</span>
      </label>
      <select
        id="book-category"
        v-model="form.category"
        @blur="onBlur('category')"
        class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white appearance-none cursor-pointer"
        :class="[
          form.category ? 'text-slate-900' : 'text-slate-400',
          hasError('category')
            ? 'border-rose-400 focus:ring-rose-400/40 focus:border-rose-400'
            : 'border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500',
        ]"
      >
        <option value="" disabled>Select a category</option>
        <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <Transition name="err">
        <p v-if="hasError('category')" class="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          {{ errors.category }}
        </p>
      </Transition>
    </div>

    <!-- AI Description -->
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label for="book-description" class="block text-sm font-medium text-slate-700">
          Description
        </label>
        <button 
          type="button"
          @click="handleGenerateAI"
          :disabled="isAISummarizing || !form.title || !form.author"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
        >
          <Loader2 v-if="isAISummarizing" class="w-3 h-3 animate-spin" />
          <Sparkles v-else class="w-3 h-3 group-hover:scale-110 transition-transform" />
          {{ isAISummarizing ? 'Generating...' : '✨ Generate AI Summary' }}
        </button>
      </div>
      <textarea
        id="book-description"
        v-model="form.description"
        rows="3"
        placeholder="A brief summary of the book..."
        class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border border-slate-200 transition-all duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 focus:bg-white resize-none"
      ></textarea>
      
      <!-- Smart Tags -->
      <div v-if="form.tags.length > 0" class="mt-2.5 flex flex-wrap gap-1.5">
        <span 
          v-for="tag in form.tags" 
          :key="tag"
          class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- ISBN & Cover URL — row -->
    <div class="grid grid-cols-2 gap-4">
      <!-- ISBN -->
      <div>
        <label for="book-isbn" class="block text-sm font-medium text-slate-700 mb-1.5">ISBN</label>
        <input
          id="book-isbn"
          v-model="form.isbn"
          type="text"
          placeholder="ISBN-10 or ISBN-13"
          @blur="onBlur('isbn')"
          class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border transition-all duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white"
          :class="hasError('isbn')
            ? 'border-rose-400 focus:ring-rose-400/40 focus:border-rose-400'
            : 'border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500'"
        />
        <Transition name="err">
          <p v-if="hasError('isbn')" class="mt-1.5 text-xs text-rose-500 leading-tight">
            {{ errors.isbn }}
          </p>
        </Transition>
      </div>

      <!-- Cover URL -->
      <div>
        <label for="book-cover" class="block text-sm font-medium text-slate-700 mb-1.5">
          Cover URL <span class="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="book-cover"
          v-model="form.coverUrl"
          type="url"
          placeholder="https://..."
          class="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 bg-slate-100 border border-slate-200 transition-all duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 focus:bg-white"
        />
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex gap-3 pt-2">
      <button
        type="button"
        id="cancel-add-book-btn"
        @click="$emit('close')"
        class="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400/50"
      >
        Cancel
      </button>
      <button
        type="submit"
        id="submit-add-book-btn"
        class="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-1 shadow-sm shadow-emerald-600/30"
      >
        Add Book
      </button>
    </div>
  </form>
</template>

<style scoped>
.err-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.err-leave-active {
  transition: opacity 0.15s ease;
}
.err-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.err-leave-to {
  opacity: 0;
}
</style>
