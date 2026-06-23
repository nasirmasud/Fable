import { getUserSession } from "@/lib/core/session";
import { getPostLoginRedirect } from "@/lib/utils/post-login-redirect";
import { redirect } from "next/navigation";

export default async function LoginRedirectPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  redirect(getPostLoginRedirect(user.role));
}
