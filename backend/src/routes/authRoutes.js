import { Router } from "express";
import { registerSchema } from "../validations/authSchemas.js";
import { hashPassword } from "../utils/password.js";
import prisma from "../lib/prisma.js";
import { ZodError } from "zod";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const parsedData = registerSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await hashPassword(parsedData.password);

    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        passwordHash,
        role: parsedData.role,
      },
    });

    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      agentId: user.agentId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).json(publicUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid register data",
        errors: error.issues,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
