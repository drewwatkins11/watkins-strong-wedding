"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";

export const NoteField = (props) => {
  const { note, setNote } = props;

  return (
    <textarea
      placeholder="Your Note"
      className="textarea textarea-bordered textarea-lg w-full max-w-md"
      value={note}
      onChange={(e) => setNote(e.target.value)}
    ></textarea>
  );
};

export default function NotePage(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: { pageId: string; inviteDetails: Guest; onComplete: () => any } = props;

  const [note, setNote] = useState<string | undefined>(inviteDetails.guestNote);

  const [isPending, startTransition] = useTransition();

  const submitNote = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        guestNote: note,
      }).then(onComplete);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h4>Share a note with the couple</h4>
      <p>
        We invite you to leave a short note for us prior to the wedding. We'd
        love your words of encouragement, wisdom, or well-wishes!
      </p>
      <NoteField note={note} setNote={setNote} />
      <button className="btn" disabled={isPending} onClick={submitNote}>
        {isPending ? "saving" : "finish"}
      </button>
    </div>
  );
}
