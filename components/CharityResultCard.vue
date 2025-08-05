<script setup lang="ts">
import type { PropType } from 'vue'
import type { CharityDetailsSearchParams } from '~/types/charity-details-params'
import type { CharityDetails } from '~/types/charity-details-results'
import type { CharitySearchResult } from '~/types/charity-search-result'

const props = defineProps({
  charity: {
    type: Object as PropType<CharitySearchResult>,
    required: true,
  },
})

const showDetailsModal = ref(false)
const charityDetails = ref<CharityDetails | null>(null)
const loadingDetails = ref(false)

async function openDetailsModal() {
  showDetailsModal.value = true

  if (!charityDetails.value) {
    await fetchCharityDetails()
  }
}

function closeDetailsModal() {
  showDetailsModal.value = false
}

async function fetchCharityDetails() {
  loadingDetails.value = true

  try {
    const params: CharityDetailsSearchParams = {
      ein: String(props.charity.ein),
    }

    const response = await $fetch<CharityDetails>('/api/charity/details', {
      method: 'POST',
      body: params,
    })

    charityDetails.value = response
  }
  catch (err) {
    console.error('Error fetching charity details:', err)
    // You could add error handling here if needed
  }
  finally {
    loadingDetails.value = false
  }
}

console.log('CharityResultCard props:', props.charity)
</script>

<template>
  <div class="charity-card border rounded-lg p-4 shadow-md">
    <h2 class="text-xl font-bold mb-2">
      {{ charity.charityName }}
    </h2>
    <p class="text-sm text-gray-600 mb-1">
      {{ charity.city }}, {{ charity.state }} {{ charity.zipCode }}
    </p>
    <p class="text-sm text-gray-600 mb-4">
      {{ charity.missionStatement }}
    </p>

    <div class="flex items-center mb-4">
      <span
        class="px-2 py-1 text-xs font-semibold rounded-full"
        :class="{
          'bg-green-100 text-green-800': String(charity.acceptingDonations) === '1',
          'bg-red-100 text-red-800': String(charity.acceptingDonations) === '0',
        }"
      >
        {{ String(charity.acceptingDonations) === '1' ? 'Accepting Donations' : 'Not Accepting Donations' }}
      </span>
    </div>

    <div class="flex space-x-4">
      <UButton
        variant="solid"
        color="primary"
        class="transition-all duration-200"
        @click="openDetailsModal"
      >
        <template #leading>
          <UIcon name="i-heroicons-information-circle" />
        </template>
        <span>Details</span>
      </UButton>
      <UButton
        :to="charity.website"
        target="_blank"
        external
        variant="outline"
        color="primary"
        class="transition-all duration-200"
        :disabled="!charity.website || charity.website.length === 0"
      >
        <template #leading>
          <UIcon name="i-heroicons-arrow-top-right-on-square" />
        </template>
        <span>Visit Website</span>
      </UButton>
      <UButton
        :to="charity.url"
        target="_blank"
        external
        variant="outline"
        color="primary"
        class="transition-all duration-200"
      >
        <template #leading>
          <UIcon name="i-heroicons-arrow-top-right-on-square" />
        </template>
        <span>View on OrgHunter</span>
      </UButton>
    </div>

    <!-- Details Modal -->
    <CharityDetailsModal
      :charity-details="charityDetails"
      :is-open="showDetailsModal"
      :loading="loadingDetails"
      @close="closeDetailsModal"
    />
  </div>
</template>

<style scoped>
.charity-card {
  max-width: 400px;
}
</style>
