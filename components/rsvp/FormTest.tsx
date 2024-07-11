"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";

export default function FormTest(props) {
  const { pageId, inviteDetails }: { pageId: string; inviteDetails: Guest } =
    props;

  const [guestCount, updateGuestCount] = useState(
    inviteDetails.guestCount.offered || 0
  );

  const [isPending, startTransition] = useTransition();

  const submitGuests = () => {
    startTransition(async () => {
      await updateInvite(pageId, { guestCount: { claimed: guestCount } });
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8 !text-black">
        <p>
          You have {inviteDetails.guestCount.offered?.toString()} invites
          available.
        </p>
        <div className="flex flex-row gap-8 items-center mx-auto">
          <button
            className="w-12 h-12 justify-center text-center inline-flex items-center border border-black rounded-full"
            onClick={() => updateGuestCount(guestCount - 1)}
            disabled={guestCount <= 0}
          >
            -
          </button>
          <div>{guestCount.toString()}</div>
          <button
            className="w-12 h-12 justify-center content-center text-center inline-flex items-center border border-black rounded-full"
            onClick={() => updateGuestCount(guestCount + 1)}
            // @ts-expect-error
            disabled={guestCount >= inviteDetails.guestCount.offered}
          >
            +
          </button>
        </div>
        <button
          className="border rounded-sm"
          disabled={isPending}
          onClick={submitGuests}
        >
          {isPending ? "submitting" : "submit"}
        </button>
      </div>
    </>
  );
}

export { FormTest };
