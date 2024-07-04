import { object, string } from "zod";

export const signInSchema = object({
  lastName: string({ required_error: "Surname is required" }).min(
    3,
    "Surname is required"
  ),
  houseNumber: string({ required_error: "House number is required" }).min(
    3,
    "House number is required"
  ),
});
