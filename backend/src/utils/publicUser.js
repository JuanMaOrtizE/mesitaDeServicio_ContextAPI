export function toPublicUser(user) {
  const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    agentId: user.agentId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return publicUser;
}
