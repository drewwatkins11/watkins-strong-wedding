"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { extraTags } from "./RsvpForm";

export default function ExtrasChoice(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: { pageId: string; inviteDetails: Guest; onComplete: () => any } = props;

  const [breakfast, setBreakfast] = useState<boolean>(
    inviteDetails.attendingBreakfast || false
  );
  const [rehearsal, setRehearsalDinner] = useState<boolean>(
    inviteDetails.attendingRehersalDinner || false
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
      }).then(onComplete);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h4>Additional Meals</h4>
      {!!offerBoth ? (
        <p>
          For a few of our most special guests, we have a couple of additional
          meals planned for the weekend. Please note if you'll be able to join
          us at the following (exact times TBD).
        </p>
      ) : !!offerBreakfast ? (
        <p>
          We'll have a small breakfast for some of our close friends and family
          members Sunday morning. Please note if you expect to join. (exact time
          TBD)
        </p>
      ) : !!offerRehearsal ? (
        <p>
          We're inviting some of our close friends and family members to a
          rehearsal dinner on Friday evening. Please note if you expect to join.
          (exact time TBD)
        </p>
      ) : (
        <p></p>
      )}

      <div className="flex flex-col gap-8 !text-black">
        {!!offerBoth && <p>Rehearsal Dinner on Friday evening</p>}
        <div className="flex flex-row gap-4">
          <button
            className={`btn ${!!rehearsal ? "btn-active" : ""}`}
            onClick={() => setRehearsalDinner(true)}
          >
            Yes
          </button>
          <button
            className={`btn ${!rehearsal ? "btn-active" : ""}`}
            onClick={() => setRehearsalDinner(false)}
          >
            No
          </button>
        </div>
        {!!offerBoth && <p>Breakfast on Sunday morning</p>}
        <div className="flex flex-row gap-4">
          <button
            className={`btn ${!!breakfast ? "btn-active" : ""}`}
            onClick={() => setBreakfast(true)}
          >
            Yes
          </button>
          <button
            className={`btn ${!breakfast ? "btn-active" : ""}`}
            onClick={() => setBreakfast(false)}
          >
            No
          </button>
        </div>
        <button className="btn" disabled={isPending} onClick={submitExtras}>
          {isPending ? "saving" : "continue"}
        </button>
      </div>
    </div>
  );
}
