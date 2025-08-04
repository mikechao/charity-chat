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
    console.log('charity_search called with params:', params)
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
