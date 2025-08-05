/**
 * The parameters for a charity details search.
 *
 * What the charity api calls 'basic"
 *
 * https://charityapi.com/charity-api-basic-documentation
 */
import { z } from 'zod'

export const charityDetailsSearchParamsSchema = z.object({
  ein: z.string().describe('Employer Identification Number (EIN)'),
})

export type CharityDetailsSearchParams = z.infer<typeof charityDetailsSearchParamsSchema>
