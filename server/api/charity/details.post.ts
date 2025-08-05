import type { CharityApiResponse } from '~/types/charity-api-response'
import type { CharityDetailsSearchParams } from '~/types/charity-details-params'
import type { CharityDetails } from '~/types/charity-details-results'
import { charityDetailsSearchParamsSchema } from '~/types/charity-details-params'

const API_URL = 'http://data.orghunter.com/v1/charitybasic'
const runtimeConfig = useRuntimeConfig()

const apiKey = runtimeConfig.charityApiKey

export default defineEventHandler(async (event) => {
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'API key is not configured',
    })
  }
  const body = await readBody<CharityDetailsSearchParams>(event)

  const validationResult = charityDetailsSearchParamsSchema.safeParse(body)
  if (!validationResult.success) {
    console.error('Invalid charity details search parameters:', validationResult.error)
    throw createError({
      statusCode: 400,
      message: 'Invalid charity details search parameters',
      data: validationResult.error,
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

  if (!response || !response.data || String(response.code) !== '200') {
    console.error('Failed to fetch data from the charity API:', response)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from the charity API',
    })
  }

  const charityDetails = response.data as CharityDetails
  return charityDetails
})
