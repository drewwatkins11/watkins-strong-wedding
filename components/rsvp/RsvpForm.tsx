"use client";

import GuestCount from "@/components/rsvp/GuestCount";
import { useState } from "react";

export default function RsvpForm(props) {
  const maxSteps = 2;
  const [step, setStep] = useState(0);

  const onAdvance = () => (step < maxSteps ? setStep(step + 1) : onComplete());

  const { onComplete, session } = props;
  return (
    <div>
      Step: {step}
      {step === 0 && (
        <GuestCount
          pageId={session.user.inviteDetails.resourceId}
          inviteDetails={session.user.inviteDetails}
          onComplete={onAdvance}
        />
      )}
    </div>
  );
}
