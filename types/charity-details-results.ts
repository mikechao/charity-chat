/**
 * Represents the details of a charity.
 *
 * The response object from charity api's "basic"
 * https://charityapi.com/charity-api-basic-documentation
 */
export interface CharityDetails {
  /**
   * Employer Identification Number (EIN)
   */
  ein: number

  /**
   * Primary Name of Organization
   */
  name: string

  /**
   * In Care of Name
   */
  inCareOfName: string

  /**
   * Street Address
   */
  street: string

  /**
   * City
   */
  city: string

  /**
   * State - Full State Name
   */
  state: string

  /**
   * Zip Code
   */
  zipCode: string

  /**
   * Country
   */
  country?: string

  /**
   * Group Exemption Number
   */
  groupExemption: number

  /**
   * Subsection Description
   */
  subsection: string

  /**
   * Classification Description
   */
  classification: string

  /**
   * Affiliation Description
   */
  affiliation: string

  /**
   * Ruling Date - Month, YYYY
   */
  rullingDate?: string

  /**
   * Deductibility Description
   */
  deductibility: string

  /**
   * Deductibility Status Description
   */
  deductibilityStatus: string

  /**
   * Foundation Description
   */
  foundation: string

  /**
   * Activity Codes Description
   */
  activity1: string

  /**
   * Activity Codes Description
   */
  activity2: string

  /**
   * Activity Codes Description
   */
  activity3: string

  /**
   * Organization Description
   */
  organization: string

  /**
   * Exempt Organization Status Description
   */
  exemptStatus: string

  /**
   * Tax Period Description
   */
  taxPeriod?: string

  /**
   * Asset Code Description
   */
  assetCodeDesc: string

  /**
   * Income Code Description
   */
  incomeCodeDesc: string

  /**
   * Filing Requirement Code Description
   */
  filingRequirementCodeDesc: string

  /**
   * PF Filing Requirement Code Description
   */
  pfFilingRequirementCodeDesc: string

  /**
   * Accounting Period Description
   */
  accountingPeriod?: string

  /**
   * Asset Amount
   */
  assetAmount: string

  /**
   * Income Amount (includes negative sign if amount is negative)
   */
  incomeAmount: string

  /**
   * Form 990 Revenue Amount (includes negative sign if amount is negative)
   */
  form990: string

  /**
   * National Taxonomy of Exempt Entities (NTEE) Code
   */
  nteeCd: string

  /**
   * National Taxonomy of Exempt Entities (NTEE) Code
   */
  nteeClass: string

  /**
   * National Taxonomy of Exempt Entities (NTEE) Code
   */
  nteeType: string

  /**
   * Sort Name (Secondary Name Line)
   */
  sortName: string

  /**
   * Revocation Date
   */
  revocationDt?: string

  /**
   * Revocation Posting Date
   */
  revPostingDt?: string

  /**
   * If the status = 4 then the organization is on the IRS revocation file and not on the pub78 file.
   * If the status = 1 then the organization is on the Pub78 file.
   */
  irsRevocationStatus: number

  /**
   * Organization Accepts Donations 1=Yes, 0=No
   */
  acceptingDonations: string
}
