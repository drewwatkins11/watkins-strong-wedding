import { cookies } from "next/headers";
import { auth, signIn } from "@/auth.ts";
import { redirect } from "next/navigation";

// @ts-ignore
const csrfToken = cookies().get("authjs.csrf-token")?.value ?? "";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/rsvp");
  }

  return (
    <form
      className="flex flex-col gap-4 mx-auto p-4 w-11/12 lg:w-2/3 lg:max-w-lg"
      action={async (formData) => {
        "use server";
        formData.set(
          "surname",
          formData
            .get("surname")
            // @ts-ignore
            ?.toLowerCase()
            .replace(/[^\w\s\']|_/g, "")
            .replace(/\s+/g, " ")
        );

        formData.set(
          "guestName",
          formData
            .get("guestName")
            // @ts-ignore
            ?.toLowerCase()
            .replace(/[^\w\s\']|_/g, "")
            .replace(/\s+/g, " ")
        );
        await signIn("credentials", formData);
      }}
    >
      <div>
        <h4>Lookup your invite</h4>
        <p className="mb-3">Only one member of your party needs to RSVP.</p>
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input
            name="guestName"
            type="text"
            className="grow"
            placeholder="John"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Surname
          <input
            name="surname"
            type="text"
            className="grow"
            placeholder="Smith"
          />
        </label>
      </div>
      <div>
        <p className="text-base">
          Unless you were given a specific Invite ID, this is the house number
          at which you received your invite.{" "}
        </p>
        <p className="text-base mt-2">
          (ie. your invite code is <i>802</i> if your address is{" "}
          <i>802 Main Street</i>.)
        </p>
        <label className="input input-bordered flex items-center gap-2">
          Invite ID
          <input
            name="inviteId"
            type="text"
            className="grow"
            placeholder="802"
          />
        </label>
      </div>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="redirectTo" value="/rsvp" />
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
