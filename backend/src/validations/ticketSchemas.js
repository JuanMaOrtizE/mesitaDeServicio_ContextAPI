import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(["open", "in-progress", "resolved"]),
  priority: z.enum(["low", "medium", "high"]),
  customerId: z.string().min(1),
  categoryId: z.string().min(1),
  agentId: z.string().nullable().optional(),
});

export const updateTicketSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(["open", "in-progress", "resolved"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  customerId: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  agentId: z.string().nullable().optional(),
});
