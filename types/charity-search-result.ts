/**
 * The response from the charity search API.
 * https://charityapi.com/charity-api-summary-search
 */
export interface CharitySearchResult {
  /**
   * Employer Identification Number (EIN)
   */
  ein: string;
  /**
   * Charity Name
   */
  charityName: string;
  /**
   * Category Description
   */
  category: string;
  /**
   * URL Link to the OrgHunter.com Detail Page
   */
  url: string;
  /**
   * Organization City
   */
  city: string;
  /**
   * Organization State
   */
  state: string;
  /**
   * Organization Zip Code
   */
  zipCode: number;
  /**
   * Organization Website Address
   */
  website: string;
  /**
   * Organization Mission Statement
   */
  missionStatement: string;
  /**
   * Longitude Value
   */
  longitude: string;
  /**
   * Latitude Value
   */
  latitude: string;
  /**
   * Organization Accepts Donations 1=Yes, 0=No
   */
  acceptingDonations: string;
  /**
   * Search Result Score
   */
  start: number;
  /**
   * Number of Records Requested
   */
  rows: number;
  /**
   * Total Records Available
   */
  recordCount: number;
  /**
   * Search Result Score
   */
  score: number;
}