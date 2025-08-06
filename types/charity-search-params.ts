import { z } from 'zod'

const categories: string[] = []

async function fetchCharityCategories(): Promise<string[]> {
  if (categories.length > 0) {
    return categories
  }
  try {
    const response = await $fetch<{ categoryDesc: string }[]>('/api/charity/categories')
    categories.push(...response.map(category => category.categoryDesc))
    console.log('Fetched charity categories:', categories.length, 'categories found')
    return categories
  }
  catch (error) {
    console.error('Error fetching charity categories:', error)
    return []
  }
}

export async function createSearchParametersSchema() {
  const categories = await fetchCharityCategories()
  return z.object({
    searchTerm: z.string().min(1, 'Search term is required').describe('Charity Name or Keyword. Example: "humane society" or "cancer"'),
    city: z.string().optional().describe('City name. Example: "Miami"'),
    state: z.string().optional().describe('State name - Two-letter state abbreviation'),
    zipCode: z.string().optional().describe('Zip code - 5-digit code'),
    form990_amount_min: z.number().optional().describe('Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue greater than or equal to an amount'),
    form990_amount_max: z.number().optional().describe('Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue less than or equal to an amount'),
    latitude: z.number().optional().describe('Latitude value - longitude must be supplied along with a latitude value'),
    longitude: z.number().optional().describe('Longitude value - latitude must be supplied along with a longitude value'),
    distance: z.number().optional().describe('Longitude and latitude must be supplied when passing a distance value. Distance will be calculated in miles (10 mile maximum)'),
    category: categories.length > 0
      ? z.enum(categories as [string, ...string[]]).optional().describe('The category a charity belongs to, multiple values can be passed and separated by a coma')
      : z.string().optional().describe('The category a charity belongs to, multiple values can be passed and separated by a coma'),
    eligible: z.string().optional().describe('eligible=1 will return only organizations that are tax-deductible and in good standing with the IRS'),
    rows: z.number().optional().default(20).describe('Records Per Page. Default Value = 20'),
    start: z.number().optional().default(0).describe('Start Index. Default Value = 0. Used for pagination. Always start at 0'),
  })
}

export type CharitySearchParams = z.infer<Awaited<ReturnType<typeof createSearchParametersSchema>>>
