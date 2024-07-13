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
export const mustAttendBoth: GuestTags[] = ["close family", "wedding party"];

const Complete = () => <div>Thank you for RSVPing!</div>;

export default function RsvpForm(props) {
  const { session }: { session: Session } = props;

  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

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

  const onAdvance = (notAttending?: boolean) => {
    if (notAttending) {
      setComplete(true);
    } else {
      step === maxSteps ? setComplete(true) : setStep(step + 1);
    }
  };

  return (
    <div className="w-full lg:w-4/5">
      {!!complete ? (
        <Complete />
      ) : (
        <>
          <ul className="steps mb-12">
            {visibleSteps.map((stepName, index) => (
              <li
                key={index}
                className={`step text-sm after:text-sm ${
                  index <= step && "step-primary"
                } ${index === step && "after:shadow-lg"}`}
              >
                {stepName}
              </li>
            ))}
          </ul>
          <hr className="border mb-6 mt-0 border-black w-full mx-auto" />
          {step === visibleSteps.indexOf("Guests") && (
            <GuestCount
              pageId={session.user.inviteDetails.resourceId}
              inviteDetails={session.user.inviteDetails}
              onComplete={(notAttending: boolean) => onAdvance(notAttending)}
            />
          )}
          {step === visibleSteps.indexOf("Food") && (
            <FoodChoice
              pageId={session.user.inviteDetails.resourceId}
              inviteDetails={session.user.inviteDetails}
              onComplete={onAdvance}
              onBack={() => setStep(step - 1)}
            />
          )}
          {step === visibleSteps.indexOf("Extras") && (
            <ExtrasChoice
              pageId={session.user.inviteDetails.resourceId}
              inviteDetails={session.user.inviteDetails}
              onComplete={onAdvance}
              onBack={() => setStep(step - 1)}
            />
          )}
          {step === visibleSteps.indexOf("Contact Details") && (
            <ContactInfo
              pageId={session.user.inviteDetails.resourceId}
              inviteDetails={session.user.inviteDetails}
              onComplete={onAdvance}
              onBack={() => setStep(step - 1)}
            />
          )}
          {step === visibleSteps.indexOf("Add a Note") && (
            <NotePage
              pageId={session.user.inviteDetails.resourceId}
              inviteDetails={session.user.inviteDetails}
              onComplete={onAdvance}
              onBack={() => setStep(step - 1)}
            />
          )}
        </>
      )}
    </div>
  );
}
