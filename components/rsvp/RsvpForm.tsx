"use client";

import GuestCount from "@/components/rsvp/GuestCount";
import { useMemo, useState } from "react";
import { type Session } from "next-auth";
import FoodChoice from "./FoodChoice";

const steps = ["Guests", "Food", "Extras", "Contact Details", "Add a Note"];
const extraTags: GuestTags[] = ["breakfast", "rehearsal dinner"];

export default function RsvpForm(props) {
  const { onComplete, session }: { onComplete: any; session: Session } = props;

  const [step, setStep] = useState(0);

  const invitedToExtras: boolean = extraTags.some((tag) =>
    session.user.inviteDetails.tags?.includes(tag)
  );

  const visibleSteps = useMemo(() => {
    if (!invitedToExtras) return steps.filter((steps, index) => index !== 2);
    return steps;
  }, [invitedToExtras]);

  const maxSteps = useMemo(() => visibleSteps.length, [visibleSteps]);

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
      {step === 0 && (
        <GuestCount
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
      {step === 1 && (
        <FoodChoice
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
    </div>
  );
}
