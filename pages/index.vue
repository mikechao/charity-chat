<script setup lang="ts">
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { CharityCategory } from '~/types/charity-category'
import type { CharitySearchResult } from '~/types/charity-search-result'
import { TabServerTransport } from '@mcp-b/transports'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { charitySearchParamsSchema } from '~/types/charity-search-params'

const showResults = ref(false)
const charityResults = ref<CharitySearchResult[]>([])

function registerTools(server: McpServer) {
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

  server.tool('get_charity_categories', 'Gets the list of categories that charities can belong to', {}, async () => {
    try {
      const response = await $fetch<CharityCategory[]>('/api/charity/categories')
      if (response.length === 0) {
        return {
          content: [{ type: 'text' as const, text: 'No charity categories found.' }],
        }
      }
      console.log('Charity categories:', response)
      return {
        content: [{ type: 'text' as const, text: `Available charity categories: ${response.join(', ')}` }],
      }
    }
    catch (error) {
      console.error('Error in get_charity_categories tool:', error)
      return {
        content: [{ type: 'text' as const, text: 'An error occurred while fetching charity categories.' }],
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
  registerTools(server)
  await server.connect(transport)
}
</script>

<template>
  <div>
    <WelcomeComponent v-if="!showResults" />
    <CharityResultList v-if="showResults" :charities="charityResults" />
  </div>
</template>
