import prisma from "../lib/prisma.js";
import { verifyAuthToken } from "../utils/jwt.js";
import { toPublicUser } from "../utils/publicUser.js";

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

    req.user = toPublicUser(user);

    return next();
  } catch {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
