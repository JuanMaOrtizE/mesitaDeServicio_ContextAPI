import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const passwordHash = await bcrypt.hash(password, 10);

  return passwordHash;
}

export async function verifyPassword(password, passwordHash) {
  const isValidPassword = await bcrypt.compare(password, passwordHash);

  return isValidPassword;
}
