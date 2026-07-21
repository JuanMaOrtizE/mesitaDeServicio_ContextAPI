import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { ZodError } from "zod";

import prisma from "../lib/prisma.js";
import { updateAgentStatusSchema } from "../validations/agentSchemas.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const agents = await prisma.agent.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(agents);
});

router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const parsedData = updateAgentStatusSchema.parse(req.body);

      const existingAgent = await prisma.agent.findUnique({
        where: { id },
      });

      if (!existingAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }

      const updatedAgent = await prisma.agent.update({
        where: { id },
        data: parsedData,
      });

      return res.json(updatedAgent);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid status data",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
export default router;
