import { SignIn } from "@/components/auth/signIn-button";
import { BodySection, SectionHeading } from "../home-page";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";

export default async function rsvpPage() {
  const session = await auth();
  return (
    <BodySection id="where" className="!bg-parchment text-black !h-full">
      <SectionHeading heading="rsvp" color="black" />
      {!session ? (
        <SignIn />
      ) : (
        <div className="flex flex-col justify-center gap-12 ">
          <div>
            <h4>Invite Details</h4>
            <pre className="text-wrap">{JSON.stringify(session)}</pre>
          </div>
          <div>
            <h4>Invite Content</h4>
            <div style={{ maxWidth: "1600px" }}>Hi, {session.user?.name}.</div>
          </div>
          <SignOut />
        </div>
      )}
    </BodySection>
  );
}
