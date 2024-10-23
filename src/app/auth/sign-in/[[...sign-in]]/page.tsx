import { SignIn } from "@clerk/nextjs";
import { FC } from "react";

const SignInPage: FC = () => {
  return (
    <div className="">
      <SignIn />
    </div>
  );
};

export default SignInPage;
