<template>
  <div class="charity-card border rounded-lg p-4 shadow-md">
    <h2 class="text-xl font-bold mb-2">{{ charity.charityName }}</h2>
    <p class="text-sm text-gray-600 mb-1">
      {{ charity.city }}, {{ charity.state }} {{ charity.zipCode }}
    </p>
    <p class="text-sm text-gray-600 mb-4">{{ charity.missionStatement }}</p>

    <div class="flex items-center mb-4">
      <span
        class="px-2 py-1 text-xs font-semibold rounded-full"
        :class="{
          'bg-green-100 text-green-800': charity.acceptingDonations === '1',
          'bg-red-100 text-red-800': charity.acceptingDonations === '0'
        }"
      >
        {{ charity.acceptingDonations === '1' ? 'Accepting Donations' : 'Not Accepting Donations' }}
      </span>
    </div>

    <div class="flex space-x-4">
      <a
        :href="charity.website"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        Visit Website
      </a>
      <a
        :href="charity.url"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        View on OrgHunter
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { CharitySearchResult } from '~/types/charity-search-result';

defineProps({
  charity: {
    type: Object as PropType<CharitySearchResult>,
    required: true
  }
});
</script>

<style scoped>
.charity-card {
  max-width: 400px;
}
</style>
