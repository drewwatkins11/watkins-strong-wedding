import NextAuth, { User as DefaultUser, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { getGuests } from "./utils/notion/lookup";
import type { Provider } from "next-auth/providers";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The ID used to locate the page in Notion. */
      inviteId: string;
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
    inviteId: string;
  }
}

const providers: Provider[] = [
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

        const { surname, inviteId, guestName } = await signInSchema.parseAsync(
          credentials
        );

        // get all invites that match an inviteCode
        // look for last name match in any of the inviteCode matches
        // return user object by looking for matched name

        const invites = await getGuests({
          inviteId,
          surname,
          guestName,
        });

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
          inviteId: invite.resourceId,
        };

        return user;
      } catch (error) {
        throw new Error(JSON.stringify({ errors: error, status: false }));
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/rsvp/lookup",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.inviteId = user.inviteId;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.inviteId = token.inviteId;
      return session;
    },
  },
});
