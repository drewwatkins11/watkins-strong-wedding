"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { BoolInput, ControlButtons, FormButton } from "./controls";

export default function ContactInfo(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
    onBack,
  }: {
    pageId: string;
    inviteDetails: Guest;
    onComplete: () => any;
    onBack: () => void;
  } = props;

  const [email, setEmail] = useState<string | undefined>(
    inviteDetails.email || undefined
  );
  const [phone, setPhone] = useState<string | undefined>(
    inviteDetails.phone || undefined
  );
  const [permission, setPermission] = useState<boolean>(
    inviteDetails.SMSUpdates || false
  );

  const [isPending, startTransition] = useTransition();

  const submitContactInfo = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        email,
        phone,
        SMSUpdates: permission,
      }).then(onComplete);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col justify-center items-center gap-3">
        <div>
          <h4>Keep in Touch</h4>
          <p>
            We may need to get in touch with you during wedding planning or
            after the wedding. Do you mind sharing your contact details?
            <i>(optional)</i>
          </p>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="phone"
            className="grow"
            placeholder="Email"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      {inviteDetails.phone && (
        <BoolInput
          value={permission}
          updateFn={setPermission}
          questionText="May we add you to our text message list?"
        >
          <p>
            We may have schedule updates and information to share the day of our
            wedding. Expect ~5-10 texts total.
          </p>
        </BoolInput>
      )}
      <ControlButtons
        onBack={onBack}
        onContinue={submitContactInfo}
        isPending={isPending}
      />
    </div>
  );
}
