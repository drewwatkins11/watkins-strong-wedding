"use client";

import { StateMachineProvider, createStore } from "little-state-machine";

export function updateInvite(state, payload) {
  return {
    ...state,
    inviteDetails: {
      ...state.inviteDetails,
      ...payload,
    },
  };
}

export function clearState(state, payload) {
  return {
    inviteId: undefined,
    inviteDetails: null,
  };
}

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  createStore({
    inviteId: undefined,
    inviteDetails: null,
  });
  return <StateMachineProvider>{children}</StateMachineProvider>;
}
