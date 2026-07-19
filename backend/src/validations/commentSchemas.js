import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.string().trim().min(1, "El comentario no puede estar vacío"),
});
