import { signIn } from "@/auth.ts";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit">Lookup Invite</button>
    </form>
  );
}
