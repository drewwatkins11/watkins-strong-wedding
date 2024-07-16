"use client";

import { updateInvite } from "@/app/actions";
import { useState, useTransition } from "react";
import { BoolInput, ControlButtons } from "./controls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function ContactInfo(props) {
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

  const [email, setEmail] = useState<string | undefined>(
    inviteDetails.email || undefined
  );
  const [phone, setPhone] = useState<string | undefined>(
    inviteDetails.phone || undefined
  );
  const [permission, setPermission] = useState<boolean | undefined>(
    inviteDetails.SMSUpdates === true ? true : undefined
  );

  const [isPending, startTransition] = useTransition();

  const submitContactInfo = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        email,
        phone,
        SMSUpdates: permission,
      }).then((res) => onComplete(res));
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
          <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
          <input
            type="email"
            className="grow"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FontAwesomeIcon className="mr-2" icon={faPhone} />
          <input
            type="phone"
            className="grow"
            placeholder="(123) 234-5678"
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
