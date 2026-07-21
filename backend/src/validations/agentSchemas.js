import { z } from "zod";

export const updateAgentStatusSchema = z.object({
  isActive: z.boolean({
    message: "El estado activo del agente debe ser verdadero o falso.",
  }),
});
