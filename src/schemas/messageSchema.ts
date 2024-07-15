import { z } from "zod";

export const messageSchema = z.object({
    content:z.string()
    .min(10,"Content must be at least 10")
    .max(300,"Content must not exceed 300"),
    createdAt:z.date()

})