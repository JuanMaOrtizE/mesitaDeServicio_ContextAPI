import prisma from "../lib/prisma.js";
import { verifyAuthToken } from "../utils/jwt.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.authToken;

    if (!token)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const decodedToken = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      agentId: user.agentId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
