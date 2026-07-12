import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signAuthToken(user) {
  const payload = {
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
