<script setup lang="ts">
import { computed } from 'vue';

interface UserData {
  name: string;
  profilePic?: string;
}

const props = defineProps<{
  user?: UserData | null;
  size?: string;
}>();

const initials = computed(() => {
  if (!props.user?.name) return '??';
  return props.user.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// Detect if the profilePic is a standard ui-avatars URL or a custom image
const isCustomPic = computed(() => {
  const pic = props.user?.profilePic;
  if (!pic) return false;
  // If it's a data URL (Base64) or a direct URL that doesn't include ui-avatars
  return pic.startsWith('data:') || !pic.includes('ui-avatars.com');
});
</script>

<template>
  <div :class="[size || 'w-10 h-10', 'relative rounded-full overflow-hidden flex-shrink-0']">
    <!-- custom base64 or custom URL image -->
    <img
      v-if="isCustomPic"
      :src="user?.profilePic"
      :alt="user?.name || 'User'"
      class="w-full h-full object-cover"
    />
    
    <!-- Fallback Gradient with Initials -->
    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white select-none"
    >
      <span :class="size?.includes('w-24') ? 'text-2xl font-bold' : 'text-xs font-bold'">
        {{ initials }}
      </span>
    </div>
  </div>
</template>
