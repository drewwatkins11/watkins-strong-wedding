import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        lastName: {},
        houseNumber: {},
      },
      // @ts-expect-error
      authorize: async (credentials) => {
        try {
          let user: User | null = null;

          const { lastName, houseNumber } = await signInSchema.parseAsync(
            credentials
          );

          // logic to salt and hash password

          // logic to verify if user exists
          // user = await getUserFromDb(email, pwHash)

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
