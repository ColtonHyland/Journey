import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import saveUserToDatabase from "../../saveUserToDatabase/route.js";
import getUserByEmail from "../../getUserByEmail/route.js";
import { setCookie } from 'cookies';

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
      console.log("signIn Callback")
      const email = user.user.email;
      console.log(`User's email: ${email}`);
      
      const existingUser = await getUserByEmail(email);
  
      if (!existingUser) {
        // The user doesn't exist in the database, so we can create a new entry.
        
        console.log(`New user's email: ${email}`);
  
        // Save user data to your database using Prisma or your preferred database library
        try {
          const savedUser = await saveUserToDatabase({ email });
          console.log("New user saved:", savedUser);
        } catch (error) {
          console.error("Error saving new user:", error);
        }
      } else {
        console.log(`User with email ${email} already exists.`);
      }
  
      // Assuming you have the user's email in a variable called 'userEmail'
      setCookie(null, 'email', email, {
        maxAge: 30 * 24 * 60 * 60, // 30 days (adjust as needed)
        path: '/', // Cookie is available on all routes
        secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
        sameSite: 'lax', // Adjust this as needed for your use case
      });

      return true; // Continue with the sign-in process
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }