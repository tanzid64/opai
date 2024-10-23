import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { FC } from "react";

const AuthCallbackPage: FC = async () => {
  const auth = await onAuthenticatedUser();
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);

  if (auth.status === 403 || auth.status === 400 || auth.status === 500)
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
