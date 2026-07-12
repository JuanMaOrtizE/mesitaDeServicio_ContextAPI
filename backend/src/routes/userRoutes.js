import { Router } from "express";
import prisma from "../lib/prisma.js";
const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      agentId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(users);
});

export default router;
