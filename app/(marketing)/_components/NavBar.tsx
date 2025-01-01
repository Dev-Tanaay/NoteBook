"use client";

import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export default function NavBar() {
    const { isAuthenticated,isLoading } = useConvexAuth();
    const scrolled=useScrollTop();

  return (
    <div className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 ",
        scrolled && "border-b shadow-sm"
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading&&(
          <Spinner size={"lg"} />
        )}
        {
          !isAuthenticated && !isLoading && (
            <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>Login</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get NoteBook</Button>
            </SignInButton>
            </>
          )
        }
        {isAuthenticated&&!isLoading&&(
          <>
          <Button  size={"sm"} asChild className="transform hover:scale-110 transition duration-500 shadow-md hover:shadow-green-400">
            <Link href={"/documents"}>
              Enter NoteBook
            </Link>
          </Button>
          <UserButton
            afterSwitchSessionUrl="/" 
          />
           </>
        )}
        <ModeToggle />

      </div>
    </div>
  )
}
