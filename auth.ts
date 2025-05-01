import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./services";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async authorized({ auth }) {
      return !!auth; // middleware calls the auth function to check if the user is authenticated.
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await createUser({ name: user.name, email: user.email });
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
