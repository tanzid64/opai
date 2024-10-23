import { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="container h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
