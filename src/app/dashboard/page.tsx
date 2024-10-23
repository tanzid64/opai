/*
 * check authentication from our database
 * if user is authenticated then redirect to dashboard
 * if user is not authenticated then redirect to sign in page
 */
import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { FC } from "react";

const DashbaordPage: FC = async () => {
  const auth = await onAuthenticatedUser();
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }
};

export default DashbaordPage;
