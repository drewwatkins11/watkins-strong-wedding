import { object, string } from "zod";

export const signInSchema = object({
  surname: string({ required_error: "Surname is required" }).min(
    3,
    "Surname is required"
  ),
  inviteId: string({ required_error: "Invite code is required" }).min(
    3,
    "House number is required"
  ),
  guestName: string().optional(),
});
