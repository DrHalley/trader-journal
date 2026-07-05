import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser, signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  async function logout() {
    "use server";

    await signOut({ redirectTo: "/login" });
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-3">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            This route is protected and only available to authenticated users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <dl className="grid gap-4 rounded-md border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            <div className="grid gap-1">
              <dt className="font-medium text-zinc-500 dark:text-zinc-400">Name</dt>
              <dd>{currentUser.name ?? "Unknown user"}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-zinc-500 dark:text-zinc-400">Email</dt>
              <dd>{currentUser.email ?? "No public email"}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-zinc-500 dark:text-zinc-400">User ID</dt>
              <dd className="break-all">{currentUser.id}</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/api/me"
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              View /api/me
            </a>
            <form action={logout}>
              <Button type="submit">Sign out</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
