<script setup lang="ts">
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { CharityDetails } from '~/types/charity-details-results'
import type { CharitySearchParams } from '~/types/charity-search-params'
import type { CharitySearchResult } from '~/types/charity-search-result'
import { TabServerTransport } from '@mcp-b/transports'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { charityDetailsSearchParamsSchema } from '~/types/charity-details-params'
import { createSearchParametersSchema } from '~/types/charity-search-params'

const showResults = ref(false)
const charityResults = ref<CharitySearchResult[]>([])
const currentCharityDetails = ref<CharityDetails | null>(null)
let currentCharitySearchParams: CharitySearchParams | null = null

async function registerTools(server: McpServer) {
  // #region charity_search tool registration
  const charitySearchParamsSchema = await createSearchParametersSchema()
  server.tool('charity_search', 'Search for charities that the user is interested in', charitySearchParamsSchema.shape, async (params) => {
    try {
      currentCharitySearchParams = params
      const response = await $fetch<CharitySearchResult[]>('/api/charity/search', {
        method: 'POST',
        body: params,
      })

      if (response.length === 0) {
        return {
          content: [{ type: 'text' as const, text: `No charities found matching your criteria. Try changing your parameters: ${JSON.stringify(params)}` }],
        }
      }
      console.log('Charity search results:', response.length, 'results found')
      charityResults.value = [...charityResults.value, ...response]
      showResults.value = true
      return {
        content: [{ type: 'text' as const, text: `Found the following charities matching your criteria: ${JSON.stringify(response)}` }],
      }
    }
    catch (error) {
      console.error('Error in charity_search tool:', error)
      return {
        content: [{ type: 'text' as const, text: 'An error occurred while searching for charities.' }],
        isError: true,
      }
    }
  })
  // #endregion

  // #region charity_details tool registration
  server.tool('get_charity_details', 'Get detailed information about a specific charity', charityDetailsSearchParamsSchema.shape, async (params) => {
    try {
      const response = await $fetch<CharityDetails>('/api/charity/details', {
        method: 'POST',
        body: params,
      })

      if (!response) {
        return {
          content: [{ type: 'text' as const, text: `No details found for charity with EIN ${params.ein}` }],
        }
      }
      console.log('Charity details fetched:', response)

      // Set the current charity details to trigger the modal
      currentCharityDetails.value = response

      return {
        content: [{ type: 'text' as const, text: `Details for charity ${response.name}: ${JSON.stringify(response)}` }],
      }
    }
    catch (error) {
      console.error('Error in charity_details tool:', error)
      return {
        content: [{ type: 'text' as const, text: 'An error occurred while fetching charity details.' }],
        isError: true,
      }
    }
  })
  // #endregion

  // #region clear_charity_results tool registration
  server.tool('clear_charity_results', 'Clear the current charity search results', {}, async () => {
    const count = charityResults.value.length
    charityResults.value = []
    currentCharitySearchParams = null
    return {
      content: [{ type: 'text' as const, text: `Cleared ${count} charity search results.` }],
    }
  })
  // #endregion

  // #region get_next_page tool registration
  server.tool('get_next_page', 'Get the next page of charity search results', {}, async () => {
    if (!currentCharitySearchParams) {
      return {
        content: [{ type: 'text' as const, text: 'No previous search parameters found. Please perform a search first.' }],
      }
    }

    // Increment the start index for pagination
    currentCharitySearchParams.start = (currentCharitySearchParams.start || 0) + currentCharitySearchParams.rows

    const response = await $fetch<CharitySearchResult[]>('/api/charity/search', {
      method: 'POST',
      body: currentCharitySearchParams,
    })

    if (response.length === 0) {
      return {
        content: [{ type: 'text' as const, text: 'No more results found.' }],
      }
    }

    charityResults.value = [...charityResults.value, ...response]
    return {
      content: [{ type: 'text' as const, text: `Found ${response.length} more charities.` }],
    }
  })
  // #endregion
}

if (import.meta.client) {
  const transport: Transport = new TabServerTransport({ allowedOrigins: ['*'] })
  const server = new McpServer({
    name: 'Charity Search',
    version: '1.0.0',
  })
  await registerTools(server)
  await server.connect(transport)
}

// Clear charity details after a short delay to allow modal to open
watch(currentCharityDetails, (newDetails) => {
  if (newDetails) {
    setTimeout(() => {
      currentCharityDetails.value = null
    }, 100)
  }
})
</script>

<template>
  <div>
    <WelcomeComponent v-if="!showResults" />
    <CharityResultList
      v-if="showResults"
      :charities="charityResults"
      :external-charity-details="currentCharityDetails"
    />
  </div>
</template>
