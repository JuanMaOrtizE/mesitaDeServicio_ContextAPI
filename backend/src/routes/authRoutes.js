import { Router } from "express";
import crypto from "node:crypto";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/authSchemas.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signAuthToken } from "../utils/jwt.js";
import prisma from "../lib/prisma.js";
import { ZodError } from "zod";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authRateLimiter } from "../middleware/authRateLimiter.js";
import { toPublicUser } from "../utils/publicUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = Router();

router.post(
  "/register",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
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

      const publicUser = toPublicUser(user);

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
  },
);

router.post("/login", authRateLimiter, async (req, res) => {
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

    const publicUser = toPublicUser(user);

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

router.post("/forgot-password", async (req, res) => {
  try {
    const parsedData = forgotPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (!user)
      return res.status(200).json({
        message: "If the email exists, a password reset token was generated",
      });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpiresAt: resetExpiresAt,
      },
    });

    const response = {
      message: "If the email exists, a password reset token was generated",
    };

    if (process.env.NODE_ENV !== "production") {
      response.resetToken = resetToken;
    }

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid forgot password data",
        errors: error.issues,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const parsedData = resetPasswordSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: parsedData.token,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    if (
      !user.passwordResetExpiresAt ||
      user.passwordResetExpiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const passwordHash = await hashPassword(parsedData.password);

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid reset password data",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
