import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import saveUserToDatabase from "../../saveUserToDatabase/route.js";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
  ],  
  callbacks: {
    async signIn(user, account, profile) {
      // Check if the user already exists in the database based on their email
      const existingUser = await getUserByEmail(user.email);
  
      if (!existingUser) {
        // The user doesn't exist in the database, so we can create a new entry.
        const { email } = user;
        console.log(`New user's email: ${email}`);
  
        // Save user data to your database using Prisma or your preferred database library
        try {
          const savedUser = await saveUserToDatabase({ email });
          console.log("New user saved:", savedUser);
        } catch (error) {
          console.error("Error saving new user:", error);
        }
      } else {
        console.log(`User with email ${user.email} already exists.`);
      }
  
      return true; // Continue with the sign-in process
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }