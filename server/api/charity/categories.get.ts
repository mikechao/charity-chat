import type { CharityApiResponse } from '~/types/charity-api-response'
import type { CharityCategory } from '~/types/charity-category'

const API_URL = 'http://data.orghunter.com/v1/categories'

export default defineEventHandler(async (): Promise<CharityCategory[]> => {
  const runtimeConfig = useRuntimeConfig()

  const apiKey = runtimeConfig.charityApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'API key is not configured',
    })
  }

  const response = await $fetch<CharityApiResponse>(`${API_URL}?user_key=${apiKey}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response || !response.data || response.code !== '200') {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from the charity category API',
    })
  }

  const categories = response.data as CharityCategory[]
  console.log('Charity categories fetched:', categories.length, 'categories found')

  return categories
})
