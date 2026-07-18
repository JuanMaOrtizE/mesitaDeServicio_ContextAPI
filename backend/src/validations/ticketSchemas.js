import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  status: z.enum(["open", "in-progress", "resolved"]),
  priority: z.enum(["low", "medium", "high"]),
  customerId: z.string().min(1, "Debes seleccionar un cliente"),
  categoryId: z.string().min(1, "Debes seleccionar una categoría"),
  agentId: z.string().nullable().optional(),
});

export const updateTicketSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .optional(),
  description: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .optional(),
  status: z.enum(["open", "in-progress", "resolved"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  customerId: z.string().min(1, "Debes seleccionar un cliente").optional(),
  categoryId: z.string().min(1, "Debes seleccionar una categoría").optional(),
  agentId: z.string().nullable().optional(),
});
