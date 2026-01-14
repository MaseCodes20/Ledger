import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's custom username. */
      username?: string;
      /** The user's unique ID from the token. */
      uid?: string;
    } & DefaultSession["user"]
  }
}
