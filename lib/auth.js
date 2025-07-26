import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user; //the double !! simply converts any value to boolean
    },
    // runs before actual signup
    signIn: async ({ user, account, profile }) => {
      try {
        const guest = await getGuest(user.email);
        if (!guest)
          await createGuest({ email: user.email, fullName: user.name });

        return true; // allow sign in
      } catch (err) {
        console.log("Error in signIn callback:", err);
        return false; // deny sign in
      }
    },
    session: async ({ session, token }) => {
      // Add user data to the session
      try {
        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id;
        }
      } catch (error) {
        console.error("Error fetching guest in session callback:", error);
        // Don't crash the session, just log the error
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
