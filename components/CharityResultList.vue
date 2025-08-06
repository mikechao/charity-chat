<script setup lang="ts">
import type { PropType } from 'vue'
import type { CharityDetailsSearchParams } from '~/types/charity-details-params'
import type { CharityDetails } from '~/types/charity-details-results'
import type { CharitySearchResult } from '~/types/charity-search-result'

const props = defineProps({
  charities: {
    type: Array as PropType<CharitySearchResult[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showLoadMore: {
    type: Boolean,
    default: false,
  },
  loadingMore: {
    type: Boolean,
    default: false,
  },
  // New prop for externally provided charity details (from MCP tool)
  externalCharityDetails: {
    type: Object as PropType<CharityDetails | null>,
    default: null,
  },
})

defineEmits<{
  loadMore: []
}>()

// Modal state management
const showDetailsModal = ref(false)
const charityDetails = ref<CharityDetails | null>(null)
const loadingDetails = ref(false)

// Handle charity details card click
async function handleCharityDetailsRequest(charity: CharitySearchResult) {
  // Close any existing modal first
  showDetailsModal.value = false
  charityDetails.value = null

  // Open new modal
  showDetailsModal.value = true

  // Fetch details
  await fetchCharityDetails(charity.ein)
}

async function fetchCharityDetails(ein: string | number) {
  loadingDetails.value = true

  try {
    const params: CharityDetailsSearchParams = {
      ein: String(ein),
    }

    const response = await $fetch<CharityDetails>('/api/charity/details', {
      method: 'POST',
      body: params,
    })

    charityDetails.value = response
  }
  catch (err) {
    console.error('Error fetching charity details:', err)
  }
  finally {
    loadingDetails.value = false
  }
}

function closeDetailsModal() {
  showDetailsModal.value = false
  charityDetails.value = null
}

// Watch for external charity details (from MCP tool)
watch(() => props.externalCharityDetails, (newDetails) => {
  if (newDetails) {
    // Close any existing modal first
    showDetailsModal.value = false
    charityDetails.value = null

    // Set new details and open modal
    charityDetails.value = newDetails
    showDetailsModal.value = true
  }
}, { immediate: true })
</script>

<template>
  <div class="charity-results-container">
    <!-- Header Section -->
    <div class="mb-6 sticky top-0 z-30 bg-gradient-to-r from-blue-50 via-white to-blue-50 backdrop-blur-lg shadow-lg border-b border-blue-300 px-8 py-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        <span class="inline-block text-4xl font-extrabold text-blue-700 drop-shadow-sm tracking-tight">Charity Search Results</span>
      </h1>
      <p class="text-gray-600">
        <span class="text-lg font-semibold text-blue-600 bg-blue-100 rounded px-3 py-1 shadow">Found {{ charities.length }} {{ charities.length === 1 ? 'charity' : 'charities' }}</span>
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>

    <!-- Empty State -->
    <div v-else-if="charities.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.935-6.02-2.457M15 21v-3a6 6 0 00-6-6l-3 3-3-3a6 6 0 00-6 6v3" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No charities found
      </h3>
      <p class="text-gray-500">
        Try adjusting your search criteria
      </p>
    </div>

    <!-- Results Grid -->
    <div v-else class="charity-grid">
      <CharityResultCard
        v-for="charity in charities"
        :key="charity.ein || charity.charityName"
        :charity="charity"
        class="charity-grid-item"
        @details-requested="handleCharityDetailsRequest"
      />
    </div>

    <!-- Load More Button (if needed) -->
    <div v-if="showLoadMore" class="text-center mt-8">
      <button
        class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="loadingMore"
        @click="$emit('loadMore')"
      >
        <span v-if="loadingMore" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
        <span v-else>Load More</span>
      </button>
    </div>

    <!-- Centralized Details Modal -->
    <CharityDetailsModal
      :charity-details="charityDetails"
      :is-open="showDetailsModal"
      :loading="loadingDetails"
      @close="closeDetailsModal"
    />
  </div>
</template>

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
