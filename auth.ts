import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        lastName: {},
        houseNumber: {},
        inviteCode: {},
      },
      // @ts-expect-error
      authorize: async (credentials) => {
        try {
          let user: User | null = null;

          const { lastName, inviteCode } = await signInSchema.parseAsync(
            credentials
          );

          // get all invites that match an inviteCode
          // look for last name match in any of the inviteCode matches
          // return user object by looking for matched name

          user = {
            name: "drew",
            email: "drew@test.com",
          };

          if (!user) {
            throw new Error("User not found.");
          }

          // return json object with the user data
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
});
