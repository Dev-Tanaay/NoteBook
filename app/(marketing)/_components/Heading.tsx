"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to <span className="text-green-400">NoteBook</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        NoteBook is the connected workspace where <br /> better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button className="transform hover:scale-110 transition duration-500 shadow-lg hover:shadow-green-400" asChild>
          <Link href="/documents">
            <span className="flex items-center">
              Enter Notebook
              <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button className="transform hover:scale-110 transition duration-500 shadow-lg hover:shadow-green-400">
            <span className="flex items-center">
              Get NoteBook
              <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </Button>
        </SignInButton>
      )}

    </div>
  );
}

export default Heading;
