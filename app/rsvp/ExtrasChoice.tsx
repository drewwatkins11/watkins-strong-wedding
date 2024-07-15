"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { extraTags } from "./RsvpForm";
import { BoolInput, ControlButtons } from "./controls";

export default function ExtrasChoice(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
    onBack,
  }: {
    pageId: string;
    inviteDetails: Guest;
    onComplete: (res) => any;
    onBack: () => void;
  } = props;

  const [breakfast, setBreakfast] = useState<boolean | undefined>(
    inviteDetails.attendingBreakfast === true ? true : undefined
  );
  const [rehearsal, setRehearsalDinner] = useState<boolean | undefined>(
    inviteDetails.attendingRehersalDinner === true ? true : undefined
  );

  const offerBoth: boolean = extraTags.some((tag) =>
    inviteDetails.tags?.includes(tag)
  );
  const offerBreakfast: boolean =
    inviteDetails.tags?.includes("breakfast") || false;
  const offerRehearsal: boolean =
    inviteDetails.tags?.includes("rehearsal dinner") || false;

  const [isPending, startTransition] = useTransition();

  const submitExtras = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        attendingBreakfast: breakfast,
        attendingRehersalDinner: rehearsal,
      }).then((res) => onComplete(res));
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h4>Additional Meals</h4>
        {!!offerBoth ? (
          <p>
            For a few of our most special guests, we have a couple of additional
            meals planned for the weekend. Please note if you'll be able to join
            us at the following (exact times TBD).
          </p>
        ) : !!offerBreakfast ? (
          <p>
            We'll have a small breakfast for some of our close friends and
            family members Sunday morning. Please note if you expect to join.
            (exact time TBD)
          </p>
        ) : !!offerRehearsal ? (
          <p>
            We're inviting some of our close friends and family members to a
            rehearsal dinner on Friday evening. Please note if you expect to
            join. (exact time TBD)
          </p>
        ) : (
          <p></p>
        )}
      </div>

      <div className="flex flex-col gap-6 !text-black">
        <BoolInput
          questionText={
            !!offerBoth ? "Rehearsal Dinner on Friday evening" : undefined
          }
          value={rehearsal}
          updateFn={setRehearsalDinner}
        />
        <BoolInput
          questionText={!!offerBoth ? "Breakfast on Sunday morning" : undefined}
          value={breakfast}
          updateFn={setBreakfast}
        />
      </div>
      <ControlButtons
        onBack={onBack}
        onContinue={submitExtras}
        isPending={isPending}
      />
    </div>
  );
}
