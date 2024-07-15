"use client";

import { useStateMachine } from "little-state-machine";
import { useEffect } from "react";
import { updateInvite } from "../state-provider";
import { getInvite } from "../actions";

function updateInviteId(state, payload: string) {
  return {
    ...state,
    inviteId: payload,
  };
}

export default function InviteIdListener(props) {
  const { session } = props;

  const { state, actions } = useStateMachine({ updateInviteId, updateInvite });

  useEffect(() => {
    if (session) {
      actions.updateInviteId(session.user.inviteId);
    }
  }, [session]);

  useEffect(() => {
    (async () => {
      if (state.inviteId) {
        await getInvite(state.inviteId).then((res) => {
          actions.updateInvite(res);
        });
      }
    })();
  }, [state.inviteId]);

  return <></>;
}
