import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser, signIn } from "@/lib/auth";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/dashboard");
  }

  async function loginWithGitHub() {
    "use server";

    await signIn("github", { redirectTo: "/dashboard" });
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your GitHub account to access the protected dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginWithGitHub}>
            <Button type="submit" size="lg" className="w-full">
              <LogIn className="size-4" />
              Continue with GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
