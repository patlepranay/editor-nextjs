"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { Spotlight } from "@/components/ui/spotlight";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center  antialiased bg-grid-white/[0.02] relative overflow-hidden  space-y-4">
      <Spotlight
        className="-top-0 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" flex flex-col space-y-4 m-4 justify-center p-4 max-w-7xl  mx-auto relative z-10   pt-20 md:pt-0">
        <div className="flex flex-col space-y-7 m-4">
          <h1 className="text-3xl sm:text-xl md:text-4xl font-bold ">
            Realtime Notes
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold ">
            <span className="underline mt-50">Articulate</span>
          </h1>
          <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Realtime synced article sharing platform. 
            <br />Create and share articles
            with ease.
          </h3>
        </div>
        {isAuthenticated && !isLoading && (
          <Button asChild className="w-fit mx-auto">
            <Link href="/documents">
              Check articles
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button className="w-fit mx-auto">
              SignUp
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Heading;
