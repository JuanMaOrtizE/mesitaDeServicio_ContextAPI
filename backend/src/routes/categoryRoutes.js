import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(categories);
});

export default router;
