"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { NoteField } from "./Note";
import { BoolInput, ControlButtons, CountInput } from "./controls";
import { mustAttendBoth } from "./RsvpForm";

export default function GuestCount(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: {
    pageId: string;
    inviteDetails: Guest;
    onComplete: (notionResponse, notAttending?: boolean) => void;
  } = props;

  const [attending, setAttending] = useState<boolean | null>(
    !!inviteDetails.guestCount.claimed || null
  );
  const [receptionOnly, setReceptionOnly] = useState<boolean | undefined>(
    inviteDetails.receptionOnly || false
  );
  const [guestCount, updateGuestCount] = useState(
    inviteDetails.guestCount.claimed || inviteDetails.guestCount.offered || 0
  );
  const [plusOnes, setPlusOnes] = useState<number>(
    inviteDetails.plusOnes.claimed || 0
  );
  const [plusOneName, setPlusOneName] = useState<string>(
    inviteDetails.plusOnes.name || ""
  );

  const [childCount, setChildCount] = useState<number>(
    inviteDetails.children.offered || 0
  );

  const [note, setNote] = useState<string | undefined>(inviteDetails.guestNote);

  const [isPending, startTransition] = useTransition();

  const updateAttending = (answer: boolean) => {
    if (answer === true) {
      inviteDetails.guestCount.offered === 1 && updateGuestCount(1);
    } else {
      updateGuestCount(0);
      setPlusOnes(0);
      setChildCount(0);
    }

    setAttending(answer);
  };

  const submitGuests = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        guestCount: { claimed: guestCount },
        plusOnes: { claimed: plusOnes, name: plusOneName },
        children: { claimed: childCount },
        receptionOnly,
        guestNote: note,
      }).then((res) => {
        onComplete(res, attending === false);
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <BoolInput
        questionText="Do you plan on attending?"
        value={attending}
        updateFn={updateAttending}
      />
      {!!attending && (
        <div className="flex flex-col !text-black mx-auto lg:max-w-3/5 gap-8">
          {!mustAttendBoth.some((tag) => inviteDetails.tags?.includes(tag)) && (
            <BoolInput
              questionText="Will you be attending both the ceremony and the reception?"
              value={!receptionOnly}
              updateFn={(val) => setReceptionOnly(val === false)}
              noLabel="No, just the reception"
            >
              <p>
                Even if you can't make it to the ceremony, we still invite you
                to join us in celebrating at the reception.
              </p>
            </BoolInput>
          )}
          {inviteDetails.guestCount.offered &&
            inviteDetails.guestCount.offered > 1 && (
              <CountInput
                questionText={`How many ${
                  !!inviteDetails.children.offered ? "adults" : "people"
                } will be attending?`}
                value={guestCount}
                incBehavior={{
                  callback: () => updateGuestCount(guestCount + 1),
                  disabled: guestCount >= inviteDetails.guestCount.offered,
                }}
                dIncBehavior={{
                  callback: () => updateGuestCount(guestCount - 1),
                  disabled: guestCount <= 1,
                }}
              >
                <p className="">
                  You have{" "}
                  <strong>
                    {inviteDetails.guestCount.offered?.toString()}
                  </strong>{" "}
                  invites available for your party.
                </p>
              </CountInput>
            )}
          {!!inviteDetails.children.offered && (
            <CountInput
              questionText="How many children will be attending?"
              value={childCount}
              incBehavior={{
                callback: () => setChildCount(childCount + 1),
                // @ts-ignore
                disabled: childCount >= inviteDetails.children.offered,
              }}
              dIncBehavior={{
                callback: () => setChildCount(childCount - 1),
                disabled: childCount <= 0,
              }}
            >
              <p>
                We have{" "}
                <strong>{inviteDetails.children.offered?.toString()}</strong>{" "}
                children listed. Contact Ainsley or Drew if you need more
                children added to your invite.
              </p>
            </CountInput>
          )}
          {!!inviteDetails.plusOnes.offered &&
            inviteDetails.plusOnes.offered === 1 && (
              <BoolInput
                questionText="Do you plan on bringing a plus one?"
                value={plusOnes === 1 ? true : false}
                updateFn={(bool) => setPlusOnes(!!bool ? 1 : 0)}
              />
            )}
          {!!inviteDetails.plusOnes.offered &&
            inviteDetails.plusOnes.offered > 1 && (
              <>
                <p>
                  You have {inviteDetails.plusOnes.offered?.toString()} +1's
                  available.
                </p>
                <CountInput
                  questionText="How many do you plan on bringing?"
                  value={plusOnes}
                  incBehavior={{
                    callback: () => setPlusOnes(plusOnes - 1),
                    disabled: plusOnes <= 0,
                  }}
                  dIncBehavior={{
                    callback: () => setPlusOnes(plusOnes + 1),
                    disabled: plusOnes >= inviteDetails.plusOnes.offered,
                  }}
                />
              </>
            )}
          {!!plusOnes && (
            <div className="flex flex-col items-center gap-2">
              <p>What is their name?</p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
              />
            </div>
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
        <ControlButtons
          isPending={isPending}
          onContinue={submitGuests}
          labels={{ continueLabel: !!attending ? "continue" : "submit" }}
        />
      )}
    </div>
  );
}
