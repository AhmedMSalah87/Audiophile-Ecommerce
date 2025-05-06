import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createUser, getUser } from "./services";
import bcrypt from "bcryptjs";

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userId: string | number; // Add custom field here
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const user = await getUser(email);
        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async authorized({ auth }) {
      return !!auth; // middleware calls the auth function to check if the user is authenticated.
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email!);

        if (!existingUser) {
          await createUser({ name: user.name!, email: user.email! });
        }
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async session({ session }) {
      const existingUser = await getUser(session.user.email);
      session.user.userId = existingUser.id;
      return session; //attach additional user-related data to the session from database like userId, role, preferences
    },
  },
  pages: {
    signIn: "/login", // customized page of login to be redirected
  },
});
