import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl">Trader Journal</CardTitle>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Next.js App Router, Prisma, PostgreSQL and Auth.js boilerplate.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Status:{" "}
              <span className="font-medium text-zinc-950 dark:text-zinc-100">
                {currentUser ? "Authenticated" : "Guest"}
              </span>
            </p>
            <p>
              {currentUser?.email ??
                "Sign in with GitHub to access the protected dashboard."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:w-auto">
            <Link
              href={currentUser ? "/dashboard" : "/login"}
              className={cn(buttonVariants(), "w-full sm:w-auto")}
            >
              {currentUser ? "Go to dashboard" : "Go to login"}
            </Link>
            <Link
              href="/api/me"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-auto",
              )}
            >
              Check /api/me
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
