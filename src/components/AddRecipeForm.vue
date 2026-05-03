<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import { useToast } from '../composables/useToast';
import { Plus, Minus, ChefHat, Clock, Utensils } from 'lucide-vue-next';

const emit = defineEmits<{ close: [] }>();

const store = useRecipeStore();
const { showToast } = useToast();

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

const form = reactive({
  name: '',
  cuisine: '',
  difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
  prepTime: 10,
  cookTime: 20,
  servings: 4,
  image: '',
  ingredients: [''],
  instructions: [''],
});

const errors = reactive<Record<string, string>>({});
const touched = ref(new Set<string>());
const isSubmitting = ref(false);

function validateField(field: keyof typeof form): string {
  switch (field) {
    case 'name':
      return form.name.trim() ? '' : 'Recipe name is required.';
    case 'cuisine':
      return form.cuisine.trim() ? '' : 'Cuisine is required.';
    default:
      return '';
  }
}

function onBlur(field: keyof typeof form) {
  touched.value.add(field);
  errors[field] = validateField(field);
}

function addIngredient() { form.ingredients.push(''); }
function removeIngredient(index: number) { form.ingredients.splice(index, 1); }

function addInstruction() { form.instructions.push(''); }
function removeInstruction(index: number) { form.instructions.splice(index, 1); }

function handleSubmit() {
  isSubmitting.value = true;
  
  if (!form.name.trim() || !form.cuisine.trim()) {
    onBlur('name');
    onBlur('cuisine');
    isSubmitting.value = false;
    return;
  }

  store.recipes.unshift({
    id: `recipe-${Date.now()}`,
    name: form.name.trim(),
    cuisine: form.cuisine.trim(),
    difficulty: form.difficulty,
    prepTimeMinutes: form.prepTime,
    cookTimeMinutes: form.cookTime,
    servings: form.servings,
    image: form.image.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    ingredients: form.ingredients.filter(i => i.trim()),
    instructions: form.instructions.filter(i => i.trim()),
    caloriesPerServing: 350,
    rating: 4.5,
    reviewCount: 1,
    tags: [form.cuisine, form.difficulty],
    mealType: ['Dinner'],
    isFavorited: false
  });

  showToast(`"${form.name.trim()}" added to your collection!`, 'success');
  emit('close');
}

function hasError(field: string): boolean {
  return touched.value.has(field) && !!errors[field];
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 max-h-[70vh] overflow-y-auto px-1">
    
    <!-- Basic Info Row -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recipe Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Garlic Butter Shrimp"
          @blur="onBlur('name')"
          class="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          :class="{ 'border-rose-400': hasError('name') }"
        />
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cuisine</label>
        <input
          v-model="form.cuisine"
          type="text"
          placeholder="e.g. Italian"
          @blur="onBlur('cuisine')"
          class="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          :class="{ 'border-rose-400': hasError('cuisine') }"
        />
      </div>
    </div>

    <!-- Times & Servings Row -->
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Prep Time (min)</label>
        <input v-model.number="form.prepTime" type="number" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cook Time (min)</label>
        <input v-model.number="form.cookTime" type="number" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Servings</label>
        <input v-model.number="form.servings" type="number" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-emerald-500" />
      </div>
    </div>

    <!-- Difficulty & Image -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Difficulty</label>
        <select v-model="form.difficulty" class="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500">
          <option v-for="d in DIFFICULTIES" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Image URL</label>
        <input v-model="form.image" type="url" placeholder="https://..." class="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
      </div>
    </div>

    <!-- Ingredients -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Ingredients</label>
        <button type="button" @click="addIngredient" class="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700">
          <Plus :size="14" /> Add
        </button>
      </div>
      <div class="space-y-2">
        <div v-for="(ing, idx) in form.ingredients" :key="idx" class="flex gap-2">
          <input v-model="form.ingredients[idx]" type="text" class="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-emerald-500" placeholder="Ingredient name..." />
          <button v-if="form.ingredients.length > 1" type="button" @click="removeIngredient(idx)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
            <Minus :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Instructions</label>
        <button type="button" @click="addInstruction" class="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700">
          <Plus :size="14" /> Add Step
        </button>
      </div>
      <div class="space-y-2">
        <div v-for="(step, idx) in form.instructions" :key="idx" class="flex gap-2">
          <textarea v-model="form.instructions[idx]" rows="2" class="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-emerald-500 resize-none" placeholder="Step description..."></textarea>
          <button v-if="form.instructions.length > 1" type="button" @click="removeInstruction(idx)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
            <Minus :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
      <button type="button" @click="$emit('close')" class="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
      <button type="submit" class="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">Add Recipe</button>
    </div>
  </form>
</template>
