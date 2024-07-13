"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { NoteField } from "./Note";

export default function GuestCount(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: { pageId: string; inviteDetails: Guest; onComplete: () => any } = props;

  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, updateGuestCount] = useState(
    inviteDetails.guestCount.claimed || inviteDetails.guestCount.offered || 0
  );
  const [plusOnes, setPlusOnes] = useState<number>(
    inviteDetails.plusOnes.claimed || 0
  );
  const [plusOneName, setPlusOneName] = useState<string>(
    inviteDetails.plusOnes.name || ""
  );

  const [note, setNote] = useState<string | undefined>(inviteDetails.guestNote);

  const [isPending, startTransition] = useTransition();

  const updateAttending = (answer: boolean) => {
    inviteDetails.guestCount.offered === 1 && updateGuestCount(1);
    setAttending(answer);
  };

  const submitGuests = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        guestCount: { claimed: guestCount },
        plusOnes: { claimed: plusOnes, name: plusOneName },
        guestNote: note,
      }).then(onComplete);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Do you plan on attending?</p>
      <div className="flex flex-row gap-4">
        <button
          className={`btn ${!!attending ? "btn-active" : ""}`}
          onClick={() => updateAttending(true)}
        >
          Yes
        </button>
        <button
          className={`btn ${!attending ? "btn-active" : ""}`}
          onClick={() => updateAttending(false)}
        >
          No
        </button>
      </div>
      {!!attending && (
        <div className="flex flex-col gap-8 !text-black">
          {inviteDetails.guestCount.offered &&
            inviteDetails.guestCount.offered > 1 && (
              <>
                <p>
                  You have {inviteDetails.guestCount.offered?.toString()}{" "}
                  invites available for your party.
                </p>
                <p>How many people should we plan on attending?</p>
                <div className="flex flex-row gap-8 items-center mx-auto">
                  <button
                    className="btn btn-circle"
                    onClick={() => updateGuestCount(guestCount - 1)}
                    disabled={guestCount <= 0}
                  >
                    -
                  </button>
                  <div>{guestCount.toString()}</div>
                  <button
                    className="btn btn-circle"
                    onClick={() => updateGuestCount(guestCount + 1)}
                    disabled={guestCount >= inviteDetails.guestCount.offered}
                  >
                    +
                  </button>
                </div>
              </>
            )}
          {!!inviteDetails.plusOnes.offered &&
            inviteDetails.plusOnes.offered === 1 && (
              <>
                <p>Do you plan on bringing a "plus one"?</p>
                <div className="flex flex-row gap-4">
                  <button
                    className={`btn ${!!attending && "btn-active"}`}
                    onClick={() => setPlusOnes(1)}
                  >
                    Yes
                  </button>
                  <button
                    className={`btn ${!attending && "btn-active"}`}
                    onClick={() => setPlusOnes(0)}
                  >
                    No
                  </button>
                </div>
              </>
            )}
          {!!inviteDetails.plusOnes.offered &&
            inviteDetails.plusOnes.offered > 1 && (
              <>
                <p>
                  You have {inviteDetails.plusOnes.offered?.toString()} +1's
                  available.
                </p>
                <p>How many do you plan on bringing?</p>
                <div className="flex flex-row gap-8 items-center mx-auto">
                  <button
                    className="btn btn-circle"
                    onClick={() => setPlusOnes(plusOnes - 1)}
                    disabled={plusOnes <= 0}
                  >
                    -
                  </button>
                  <div>{plusOnes.toString()}</div>
                  <button
                    className="btn btn-circle"
                    onClick={() => setPlusOnes(plusOnes + 1)}
                    disabled={plusOnes >= inviteDetails.plusOnes.offered}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn"
                  disabled={isPending}
                  onClick={submitGuests}
                >
                  {isPending ? "saving" : "continue"}
                </button>
              </>
            )}
          {!!plusOnes && (
            <>
              <p>What is their name?</p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
              />
            </>
          )}
          {/* {!!plusOnes && (
            <>
              <p>
                {plusOnes > 1 ? "What are their names?" : "What is their name?"}
              </p>
              <div className="flex flex-col">
                {[...Array(plusOnes)].map((plusOne, index) => (
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    key={index}
                  />
                ))}
              </div>
            </>
          )} */}
        </div>
      )}
      {attending === false && (
        <div className="flex flex-col justify-center items-center gap-4">
          <p>
            We wish you could make it, but we'll miss you! If you'd like to
            leave a note for Ainsley & Drew, you can do that here.
          </p>
          <NoteField note={note} setNote={setNote} />
        </div>
      )}
      {attending !== null && (
        <button className="btn" disabled={isPending} onClick={submitGuests}>
          {isPending ? "saving" : !!attending ? "continue" : "submit"}
        </button>
      )}
    </div>
  );
}
