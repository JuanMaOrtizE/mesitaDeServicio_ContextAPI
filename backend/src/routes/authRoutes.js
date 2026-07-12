import { Router } from "express";
import { loginSchema, registerSchema } from "../validations/authSchemas.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signAuthToken } from "../utils/jwt.js";
import prisma from "../lib/prisma.js";
import { ZodError } from "zod";
import { authMiddleware } from "../middleware/authMiddleware.js";

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

router.post("/login", async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValidPassword = await verifyPassword(
      parsedData.password,
      user.passwordHash,
    );

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signAuthToken(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
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

    return res.status(200).json(publicUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid login data",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  return res.json(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export default router;
