import { FC } from "react";
import { LandingPageNavBar } from "./_components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col py-10 px-10 container">
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default Layout;
