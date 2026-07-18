import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validations/ticketSchemas.js";

import prisma from "../lib/prisma.js";
import { ZodError } from "zod";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "agent"),
  async (req, res) => {
    const tickets = await prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        customerId: true,
        categoryId: true,
        agentId: true,
        customer: true,
        category: true,
        agent: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tickets);
  },
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "agent"),
  async (req, res) => {
    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        customer: true,
        category: true,
        agent: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.json(ticket);
  },
);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "agent"),
  async (req, res) => {
    try {
      const parsedData = createTicketSchema.parse(req.body);
      const agentId = parsedData.agentId === "" ? null : parsedData.agentId;

      const ticket = await prisma.ticket.create({
        data: {
          title: parsedData.title,
          description: parsedData.description,
          status: parsedData.status,
          priority: parsedData.priority,
          customerId: parsedData.customerId,
          categoryId: parsedData.categoryId,
          agentId,
        },
        include: {
          customer: true,
          category: true,
          agent: true,
        },
      });

      return res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid ticket data",
          errors: error.issues,
        });
      }
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  },
);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "agent"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const parsedData = updateTicketSchema.parse(req.body);

      const existingTicket = await prisma.ticket.findUnique({
        where: { id },
      });

      if (!existingTicket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: parsedData,
        include: {
          customer: true,
          category: true,
          agent: true,
        },
      });

      return res.status(200).json(updatedTicket);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid ticket data",
          errors: error.issues,
        });
      }
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  },
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const existingTicket = await prisma.ticket.findUnique({
        where: { id },
      });

      if (!existingTicket)
        return res.status(404).json({
          message: "Ticket not found",
        });

      await prisma.ticket.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Ticket deleted successfully",
      });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

export default router;
