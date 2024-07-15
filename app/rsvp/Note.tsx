"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { ControlButtons } from "./controls";

export const NoteField = (props) => {
  const { note, setNote } = props;

  return (
    <textarea
      placeholder="Your Note"
      className="textarea textarea-bordered w-full max-w-xl"
      value={note}
      rows={7}
      onChange={(e) => setNote(e.target.value)}
    ></textarea>
  );
};

export default function NotePage(props) {
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

  const [note, setNote] = useState<string | undefined>(inviteDetails.guestNote);

  const [isPending, startTransition] = useTransition();

  const submitNote = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        guestNote: note,
      }).then((res) => onComplete(res));
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div>
        <h4>Share a note with the couple</h4>
        <p>
          We invite you to leave a short note for us prior to the wedding. We'd
          love your words of encouragement, wisdom, or well-wishes!
        </p>
      </div>
      <NoteField note={note} setNote={setNote} />
      <ControlButtons
        onBack={onBack}
        onContinue={submitNote}
        labels={{ continueLabel: "finish" }}
        isPending={isPending}
      />
    </div>
  );
}
