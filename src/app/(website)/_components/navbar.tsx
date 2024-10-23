import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const LandingPageNavBar: FC = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-x-3 text-3xl font-semibold">
        <MenuIcon className="w-9 h-9" />
        <Image src="/opai-logo.svg" alt="logo" width={32} height={32} />
        op-ai
      </div>
      {/* Nav Items */}
      <div className="hidden lg:flex items-center gap-x-10">
        <Link
          href="/"
          className="bg-[#7320DD] hover:bg-[#7320DD]/80 py-2 px-5 font-semibold text-lg rounded-full"
        >
          Home
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Contact</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button>
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </div>
  );
};
