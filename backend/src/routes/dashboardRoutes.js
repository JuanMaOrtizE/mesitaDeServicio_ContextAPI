import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.get(
  "/summary",
  authMiddleware,
  authorizeRoles("admin", "agent"),
  async (req, res) => {
    try {
      const totalTickets = await prisma.ticket.count();

      const openTickets = await prisma.ticket.count({
        where: { status: "open" },
      });

      const inProgressTickets = await prisma.ticket.count({
        where: { status: "in-progress" },
      });

      const resolvedTickets = await prisma.ticket.count({
        where: { status: "resolved" },
      });

      const highPriorityTickets = await prisma.ticket.count({
        where: { priority: "high" },
      });

      const unassignedTickets = await prisma.ticket.count({
        where: { agentId: null },
      });

      const totalCustomers = await prisma.customer.count();
      const totalAgents = await prisma.agent.count();
      const totalComments = await prisma.comment.count();

      return res.status(200).json({
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        highPriorityTickets,
        unassignedTickets,
        totalCustomers,
        totalAgents,
        totalComments,
      });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

export default router;
