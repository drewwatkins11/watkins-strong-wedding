import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    inviteId?: string;
    inviteDetails: Guest | null;
  }
}
