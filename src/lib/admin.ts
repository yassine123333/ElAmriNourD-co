export function isAdminAuthorized(candidate?: string | null) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || adminPassword.length < 4) {
    return false;
  }

  return candidate === adminPassword;
}
