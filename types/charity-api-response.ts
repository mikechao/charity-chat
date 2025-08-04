// the wrapped response from the charity API
export interface CharityApiResponse {
  code: string
  msg: string
  data?: unknown // Replace 'unknown' with the actual type if known
}
