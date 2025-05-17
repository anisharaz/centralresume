export interface Session {
  isValidToken(userId: string): boolean;
}
