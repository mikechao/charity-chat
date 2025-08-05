<script setup lang="ts">
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { CharityDetails } from '~/types/charity-details-results'
import type { CharitySearchResult } from '~/types/charity-search-result'
import { TabServerTransport } from '@mcp-b/transports'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { charityDetailsSearchParamsSchema } from '~/types/charity-details-params'
import { createSearchParametersSchema } from '~/types/charity-search-params'

const showResults = ref(false)
const charityResults = ref<CharitySearchResult[]>([])

async function registerTools(server: McpServer) {
  const charitySearchParamsSchema = await createSearchParametersSchema()
  server.tool('charity_search', 'Search for charities that the user is interested in', charitySearchParamsSchema.shape, async (params) => {
    try {
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
</script>

<template>
  <div>
    <WelcomeComponent v-if="!showResults" />
    <CharityResultList v-if="showResults" :charities="charityResults" />
  </div>
</template>
