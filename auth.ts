import NextAuth, { User as DefaultUser, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { getGuests } from "./utils/notion/lookup";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      inviteDetails: Guest;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
  // @ts-ignore
  interface User extends DefaultUser {
    inviteDetails: Guest;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        surname: {},
        inviteId: {},
        guestName: {},
      },
      authorize: async (credentials) => {
        try {
          // @ts-ignore
          let user: User | null = null;

          const { surname, inviteId, guestName } =
            await signInSchema.parseAsync(credentials);

          // get all invites that match an inviteCode
          // look for last name match in any of the inviteCode matches
          // return user object by looking for matched name

          const invites = await getGuests({
            inviteId,
            surname,
            guestName,
          });

          console.log("users", invites);

          if (!invites || !invites.length) {
            throw new Error("Invite not found.");
          }

          if (invites.length > 1) {
            throw new Error("Multiple invites found.");
          }

          // return json object with the user data
          const invite = invites[0];
          user = {
            name: invite.name,
            inviteDetails: invite,
          };

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.inviteDetails = user.inviteDetails;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.inviteDetails = token.inviteDetails;
      return session;
    },
  },
});
