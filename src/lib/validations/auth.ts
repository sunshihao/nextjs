import * as z from "zod";

export const userAuthSchema = z.object({
  username: z.string(),
  password: z.string(),
});
