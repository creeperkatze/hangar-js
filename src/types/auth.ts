/** JWT session returned after authenticating with an API key. */
export interface ApiSession {
  /** The JWT used for subsequent authenticated requests. */
  token: string;
  /** Number of milliseconds until the token expires. */
  expiresIn: number;
}
