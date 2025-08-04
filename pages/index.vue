<script setup lang="ts">
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import { TabServerTransport } from '@mcp-b/transports'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { charitySearchParamsSchema } from '~/types/charity-search-params'

const showResults = ref(false)

if (import.meta.client) {
  const transport: Transport = new TabServerTransport({ allowedOrigins: ['*'] })
  const server = new McpServer({
    name: 'Charity Search',
    version: '1.0.0',
  })

  server.tool('charity_search', 'Search for charities that the user is interested in', charitySearchParamsSchema.shape, async (params) => {
    $fetch('/api/charity/search', {
      method: 'POST',
      body: params,
    }).then((response) => {
      showResults.value = true
      console.log('Charity search results:', response)
      return response
    }).catch((error) => {
      console.error('Error fetching charity search results:', error)
      showResults.value = false
      return {
        content: [{ type: 'text', text: 'Failed to fetch charity search results. Please try again later.' }, { isError: true }],
      }
    })
    return {
      content: [{ type: 'text', text: `Searching for charities with the following parameters: ${JSON.stringify(params)}` }],
    }
  })

  await server.connect(transport)
}
</script>

<template>
  <div>
    <WelcomeComponent />
  </div>
</template>
