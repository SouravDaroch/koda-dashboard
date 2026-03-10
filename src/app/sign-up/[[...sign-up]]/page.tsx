import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex min-h-screen w-full items-center justify-center">
    <SignUp fallbackRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/sign-in" />
  </div>
}