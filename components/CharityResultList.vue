<template>
  <div class="charity-results-container">
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Charity Search Results
      </h1>
      <p class="text-gray-600">
        Found {{ charities.length }} {{ charities.length === 1 ? 'charity' : 'charities' }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="charities.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.935-6.02-2.457M15 21v-3a6 6 0 00-6-6l-3 3-3-3a6 6 0 00-6 6v3" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No charities found</h3>
      <p class="text-gray-500">Try adjusting your search criteria</p>
    </div>

    <!-- Results Grid -->
    <div v-else class="charity-grid">
      <CharityResultCard
        v-for="charity in charities"
        :key="charity.ein || charity.charityName"
        :charity="charity"
        class="charity-grid-item"
      />
    </div>

    <!-- Load More Button (if needed) -->
    <div v-if="showLoadMore" class="text-center mt-8">
      <button
        @click="$emit('loadMore')"
        class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="loadingMore"
      >
        <span v-if="loadingMore" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
        <span v-else>Load More</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { CharitySearchResult } from '~/types/charity-search-result';

defineProps({
  charities: {
    type: Array as PropType<CharitySearchResult[]>,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  showLoadMore: {
    type: Boolean,
    default: false
  },
  loadingMore: {
    type: Boolean,
    default: false
  }
});

defineEmits<{
  loadMore: []
}>();
</script>

<style scoped>
.charity-results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.charity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.charity-grid-item {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.charity-grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .charity-results-container {
    padding: 1rem;
  }
  
  .charity-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .charity-results-container {
    padding: 0.5rem;
  }
}
</style>