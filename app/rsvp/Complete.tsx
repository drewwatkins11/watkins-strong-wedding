"use client";
import { useStateMachine } from "little-state-machine";
import { signOut } from "next-auth/react";
import { clearState } from "../state-provider";
import Link from "next/link";

const Complete = () => {
  const { actions } = useStateMachine({ clearState });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h4>Thank you for RSVPing!</h4>
        <p className="text-xl">
          See you in October. We can't wait to share our day with you!
        </p>
      </div>
      <Link href="/">
        <button className="btn btn-secondary">Return to wedding site</button>
      </Link>

      <div>
        <button
          className="btn btn-sm"
          onClick={() => {
            actions.clearState();
            signOut();
          }}
        >
          Sign Out
        </button>
        <p className="text-sm italic">
          You can sign out if you need to fill <br />
          out an invite for someone else on this computer.
        </p>
      </div>
    </div>
  );
};

export default Complete;
