import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import prisma from "../lib/prisma.js";

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

export default router;
