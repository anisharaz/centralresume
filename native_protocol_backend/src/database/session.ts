export interface Session {
  isValidToken(userId: string): Promise<boolean>;
}
