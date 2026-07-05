import { Prisma, type User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

const currentUserSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  emailVerified: true,
} satisfies Prisma.UserSelect;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
});

export const getCurrentUser = cache(
  async (): Promise<Pick<User, "id" | "name" | "email" | "image" | "emailVerified"> | null> => {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    return prisma.user.findUnique({
      where: { id: session.user.id },
      select: currentUserSelect,
    });
  },
);
