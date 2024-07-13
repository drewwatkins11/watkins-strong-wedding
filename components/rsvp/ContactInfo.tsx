"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";

export default function ContactInfo(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: { pageId: string; inviteDetails: Guest; onComplete: () => any } = props;

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
    <div className="flex flex-col justify-center items-center">
      <h4>Keep in Touch</h4>
      <p>
        We may need to get in touch with you during wedding planning or after
        the wedding. Do you mind sharing your contact details? (optional)
      </p>
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
      {inviteDetails.phone && (
        <>
          <p>
            We may have schedule updates and information to share the day of our
            wedding. May we add you to our phone list? Expect ~5-10 texts total.
          </p>
          <div className="flex flex-row gap-4">
            <button
              className={`btn ${!!permission ? "btn-active" : ""}`}
              onClick={() => setPermission(true)}
            >
              Yes
            </button>
            <button
              className={`btn ${!permission ? "btn-active" : ""}`}
              onClick={() => setPermission(false)}
            >
              No
            </button>
          </div>
        </>
      )}
      <button className="btn" disabled={isPending} onClick={submitContactInfo}>
        {isPending ? "saving" : "continue"}
      </button>
    </div>
  );
}
