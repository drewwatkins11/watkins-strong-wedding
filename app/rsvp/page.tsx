import { SignIn } from "@/components/auth/signIn-button";
import { auth } from "@/auth";
import { BodySection, SectionHeading } from "@/components/common";
import RsvpForm from "@/components/rsvp/RsvpForm";
import { SignOut } from "@/components/auth/signout-button";

export default async function rsvpPage() {
  const session = await auth();

  return (
    <BodySection
      id="where"
      className="!bg-parchment text-black !h-full font-montserrat"
    >
      <SectionHeading heading="rsvp" color="black" />
      {!session ? (
        <SignIn />
      ) : (
        <div className="w-full lg:w-4/5 mx-auto flex flex-col gap-12 bg-snow p-12 shadow-xl rounded-md items-center">
          <div className="max-w-full">
            <h3>Hi, {session.user?.name}</h3>
            <p className="text-xl lg:text-2xl max-w-3xl lg:max-w-2xl text-center">
              You are cordially invited to join Ainsley & Drew in celebrating
              their marriage on October 12th, 2024.
            </p>
          </div>
          <RsvpForm session={session} />
        </div>
      )}

      <SignOut />
    </BodySection>
  );
}
