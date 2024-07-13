"use client";

import GuestCount from "@/components/rsvp/GuestCount";
import { useMemo, useState } from "react";
import { type Session } from "next-auth";
import FoodChoice from "./FoodChoice";
import ExtrasChoice from "./ExtrasChoice";
import ContactInfo from "./ContactInfo";
import NotePage from "./Note";

const steps = ["Guests", "Food", "Extras", "Contact Details", "Add a Note"];
export const extraTags: GuestTags[] = ["breakfast", "rehearsal dinner"];

export default function RsvpForm(props) {
  const { session }: { onComplete: any; session: Session } = props;
  const onComplete = () => {};

  const [step, setStep] = useState(0);

  const invitedToExtras: boolean = useMemo(
    () =>
      extraTags.some((tag) => session.user.inviteDetails.tags?.includes(tag)),
    [session.user.inviteDetails.tags]
  );

  const visibleSteps = useMemo(() => {
    if (!invitedToExtras)
      return steps.filter((steps, index) => index !== steps.indexOf("Extras"));
    return steps;
  }, [invitedToExtras]);

  const maxSteps = visibleSteps.length - 1;

  const onAdvance = () =>
    step === maxSteps ? onComplete() : setStep(step + 1);

  return (
    <div>
      <ul className="steps">
        {visibleSteps.map((stepName, index) => (
          <li key={index} className={`step ${index <= step && "step-primary"}`}>
            {stepName}
          </li>
        ))}
      </ul>
      {step === visibleSteps.indexOf("Guests") && (
        <GuestCount
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
      {step === visibleSteps.indexOf("Food") && (
        <FoodChoice
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
      {step === visibleSteps.indexOf("Extras") && (
        <ExtrasChoice
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
      {step === visibleSteps.indexOf("Contact Details") && (
        <ContactInfo
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
      {step === visibleSteps.indexOf("Add a Note") && (
        <NotePage
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
    </div>
  );
}
