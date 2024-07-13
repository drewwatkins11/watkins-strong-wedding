import { SignIn } from "@/components/auth/signIn-button";
import { BodySection, SectionHeading } from "../home-page";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import GuestCount from "@/components/rsvp/GuestCount";
import RsvpForm from "@/components/rsvp/RsvpForm";

export default async function rsvpPage() {
  const session = await auth();

  return (
    <BodySection id="where" className="!bg-parchment text-black !h-full">
      <SectionHeading heading="rsvp" color="black" />
      {!session ? (
        <SignIn />
      ) : (
        <div className="flex flex-col justify-center gap-12">
          <div>
            <h4>Hi, {session.user?.name}</h4>
            <p>
              You are cordially invited to join Ainsley & Drew in celebrating
              their marriage on October 12th, 2024.
            </p>
          </div>
          <RsvpForm session={session} />
        </div>
      )}
    </BodySection>
  );
}
