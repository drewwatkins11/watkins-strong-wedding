import { auth } from "@/auth";
import RsvpForm from "@/app/rsvp/RsvpForm";
import Link from "next/link";
import InviteIdListener from "./InviteIdListener";

export default async function rsvpPage() {
  const session = await auth();

  return (
    <div className="w-full">
      {!session ? (
        <div>
          <Link href="/rsvp/lookup">
            <button className="btn btn-primary">Lookup Invite</button>
          </Link>
        </div>
      ) : (
        <div className="w-full lg:w-4/5 mx-auto flex flex-col gap-12 bg-snow p-12 shadow-xl rounded-md items-center">
          <div className="max-w-full">
            <h3>Hi, {session.user?.name}</h3>
            <p className="text-xl lg:text-2xl max-w-3xl lg:max-w-2xl text-center">
              You are cordially invited to join Ainsley & Drew in celebrating
              their marriage on October 12th, 2024.
            </p>
          </div>
          <InviteIdListener session={session} />
          <RsvpForm />
        </div>
      )}
    </div>
  );
}
