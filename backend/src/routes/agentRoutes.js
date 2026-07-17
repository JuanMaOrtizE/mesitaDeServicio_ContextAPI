import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import prisma from "../lib/prisma.js";

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

export default router;
