export function getPostLoginRedirect(role, explicitRedirect) {
  if (explicitRedirect) return explicitRedirect;

  if (role === "admin") return "/dashboard/admin";
  if (role === "writer") return "/dashboard/writer";

  return "/";
}
