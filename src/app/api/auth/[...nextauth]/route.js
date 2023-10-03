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
      // This callback is triggered when a user signs in with their Google account.
      // You can access user information here and save it to your database.
      
      // Example: Save user information to the database using Prisma
      const { email, name } = user;
      console.log(`Login details: ${user}`)
      const userData = {
        username: name || "DefaultUsername",
        email: email || "",
        // Other user data you want to save
      };
      //console.log(userData)

      // Save user data to your database using Prisma or your preferred database library
      try {
        const savedUser = await saveUserToDatabase(userData);
        console.log("User data saved:", savedUser);
      } catch (error) {
        console.error("Error saving user data:", error);
      }

      return true; // Continue with the sign-in process
  },
},
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }