import type { CharityApiResponse } from '~/types/charity-api-response'
import type { CharitySearchParams } from '~/types/charity-search-params'
import type { CharitySearchResult } from '~/types/charity-search-result'
import { charitySearchParamsSchema } from '~/types/charity-search-params'

const API_URL = 'http://data.orghunter.com/v1/charitysearch'

export default defineEventHandler(async (event): Promise<CharitySearchResult[]> => {
  const body = await readBody<CharitySearchParams>(event)

  // Validate the input parameters
  const validationResult = charitySearchParamsSchema.safeParse(body)

  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid search parameters',
      data: validationResult.error,
    })
  }
  console.log('Validated charity search parameters:', validationResult.data)
  const runtimeConfig = useRuntimeConfig()

  const apiKey = runtimeConfig.charityApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'API key is not configured',
    })
  }
  const queryParams = new URLSearchParams({
    user_key: apiKey,
    ...Object.fromEntries(
      Object.entries(validationResult.data).map(([key, value]) => [
        key,
        value !== undefined ? String(value) : '',
      ]),
    ),
  })

  const response = await $fetch<CharityApiResponse>(`${API_URL}?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
  if (!response || !response.data || response.code !== '200') {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from the charity API',
    })
  }
  const charityResults = response.data as CharitySearchResult[]
  console.log('Charity search results:', charityResults.length, 'results found')
  return charityResults
})
