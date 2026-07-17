import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(customers);
});

export default router;
