import { SignIn } from "@clerk/nextjs";
import { div } from "framer-motion/client";

export default function Page() {
  return <div className="flex min-h-screen w-full items-center justify-center">

    <SignIn fallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/sign-up" />

  </div>
}