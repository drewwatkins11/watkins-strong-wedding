"use client";

import { useEffect, useMemo, useState } from "react";
import { type Session } from "next-auth";

import GuestCount from "./GuestCount";
import FoodChoice from "./FoodChoice";
import ExtrasChoice from "./ExtrasChoice";
import ContactInfo from "./ContactInfo";
import NotePage from "./Note";
import Complete from "./Complete";

import { createStore, useStateMachine } from "little-state-machine";
import { updateInvite } from "@/app/state-provider";

const steps = ["Guests", "Food", "Extras", "Contact Details", "Add a Note"];
export const extraTags: GuestTags[] = ["breakfast", "rehearsal dinner"];
export const mustAttendBoth: GuestTags[] = ["close family", "wedding party"];

export default function RsvpForm(props) {
  const { session }: { session: Session } = props;

  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const { actions, state } = useStateMachine({ updateInvite });

  const invitedToExtras: boolean = useMemo(
    () => extraTags.some((tag) => state?.inviteDetails?.tags?.includes(tag)),
    [state?.inviteDetails?.tags]
  );

  const visibleSteps = useMemo(() => {
    if (!invitedToExtras)
      return steps.filter((steps, index) => index !== steps.indexOf("Extras"));
    return steps;
  }, [invitedToExtras]);

  const maxSteps = visibleSteps.length - 1;

  useEffect(() => {
    createStore({
      inviteId: state.inviteId,
      inviteDetails: null,
    });
  }, [session]);

  const onAdvance = (notionResponse: any, notAttending?: boolean) => {
    if (notionResponse) actions.updateInvite(notionResponse);

    if (notAttending) {
      setComplete(true);
    } else if (step === maxSteps) {
      setComplete(true);
    } else setStep(step + 1);
  };

  if (state.inviteDetails && Object.keys(state.inviteDetails).length > 0) {
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
                pageId={state.inviteDetails.resourceId}
                inviteDetails={state.inviteDetails}
                onComplete={(res, notAttending) => onAdvance(res, notAttending)}
              />
            )}
            {step === visibleSteps.indexOf("Food") && (
              <FoodChoice
                pageId={state.inviteDetails.resourceId}
                inviteDetails={state.inviteDetails}
                onComplete={onAdvance}
                onBack={() => setStep(step - 1)}
              />
            )}
            {step === visibleSteps.indexOf("Extras") && (
              <ExtrasChoice
                pageId={state.inviteDetails.resourceId}
                inviteDetails={state.inviteDetails}
                onComplete={onAdvance}
                onBack={() => setStep(step - 1)}
              />
            )}
            {step === visibleSteps.indexOf("Contact Details") && (
              <ContactInfo
                pageId={state.inviteDetails.resourceId}
                inviteDetails={state.inviteDetails}
                onComplete={onAdvance}
                onBack={() => setStep(step - 1)}
              />
            )}
            {step === visibleSteps.indexOf("Add a Note") && (
              <NotePage
                pageId={state.inviteDetails.resourceId}
                inviteDetails={state.inviteDetails}
                onComplete={onAdvance}
                onBack={() => setStep(step - 1)}
              />
            )}
          </>
        )}
      </div>
    );
  } else return <></>;
}
