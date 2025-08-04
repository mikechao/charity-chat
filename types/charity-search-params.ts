import { z } from 'zod'

const searchParametersSchema = z.object({
  searchTerm: z.string().min(1, 'Search term is required').describe('Charity Name or Keyword. Example: "humane society" or "cancer"'),
  city: z.string().optional().describe('City name. Example: "Miami"'),
  state: z.string().optional().describe('State name - Two-letter state abbreviation'),
  zipCode: z.string().optional().describe('Zip code - 5-digit code'),
  form990_amount_min: z.number().optional().describe('Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue greater than or equal to an amount'),
  form990_amount_max: z.number().optional().describe('Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue less than or equal to an amount'),
  latitude: z.number().optional().describe('Latitude value - longitude must be supplied along with a latitude value'),
  longitude: z.number().optional().describe('Longitude value - latitude must be supplied along with a longitude value'),
  distance: z.number().optional().describe('Longitude and latitude must be supplied when passing a distance value. Distance will be calculated in miles (10 mile maximum)'),
  category: z.string().optional().describe('Category Value Selected from Categories API, multiple values can be passed and separated by a coma'),
  eligible: z.string().optional().describe('eligible=1 will return only organizations that are tax-deductible and in good standing with the IRS'),
  rows: z.number().optional().default(20).describe('Records Per Page. Default Value = 20'),
})

/**
 * Charity Search Parameters
 * @typedef {object} CharitySearchParams
 * @property {string} searchTerm - Charity Name or Keyword. Example: "humane society" or "cancer"
 * @property {string} [city] - City name. Example: "Miami"
 * @property {string} [state] - State name - Two-letter state abbreviation
 * @property {string} [zipCode] - Zip code - 5-digit code
 * @property {number} [form990_amount_min] - Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue greater than or equal to an amount
 * @property {number} [form990_amount_max] - Form 990 amount - number only, no spaces, commas, or decimals. Returns records with revenue less than or equal to an amount
 * @property {number} [latitude] - Latitude value - longitude must be supplied along with a latitude value
 * @property {number} [longitude] - Longitude value - latitude must be supplied along with a longitude value
 * @property {number} [distance] - Longitude and latitude must be supplied when passing a distance value. Distance will be calculated in miles (10 mile maximum)
 * @property {string} [category] - Category Value Selected from Categories API, multiple values can be passed and separated by a coma
 * @property {string} [eligible] - eligible=1 will return only organizations that are tax-deductible and in good standing with the IRS
 * @property {number} [rows] - Records Per Page. Default Value = 20
 */
export type CharitySearchParams = z.infer<typeof searchParametersSchema>
export const charitySearchParamsSchema = searchParametersSchema
