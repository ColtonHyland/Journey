import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import saveUserToDatabase from "../../saveUserToDatabase/route.js";
import getUserByEmail from "../../getUserByEmail/route.js";
// import { setCookie, parseCookies } from 'cookies';

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
      console.log("signIn Callback");
      const email = user.user.email;
      console.log(`User's email: ${email}`);

      try {
        // Fetch the user using your API route
        const response = await fetch(process.env.NEXTAUTH_URL + '/api/getUserByEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Send the email in the request body
        });

        if (response.ok) {
          const existingUser = await response.json();
          if (!existingUser) {
            // The user doesn't exist in the database, so we can create a new entry.
            console.log(`New user's email: ${email}`);

            // Save user data to your database using another API route
            const saveResponse = await fetch(process.env.NEXTAUTH_URL + '/api/saveUserToDatabase', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });

            if (saveResponse.ok) {
              console.log('New user saved successfully.');
            } else {
              console.error('Error saving new user:', saveResponse.status);
            }
          } else {
            console.log(`User with email ${email} already exists.`);
          }
        } else {
          console.error('Error fetching user by email:', response.status);
        }
      } catch (error) {
        console.error('Error fetching or saving user:', error);
      }

      return true; // Continue with the sign-in process
      // Check if the user already exists in the database based on their email
      // console.log("signIn Callback")
      // const email = user.user.email;
      // console.log(`User's email: ${email}`);
      
      // const existingUser = await getUserByEmail(email);
  
      // if (!existingUser) {
      //   // The user doesn't exist in the database, so we can create a new entry.
        
      //   console.log(`New user's email: ${email}`);
  
      //   // Save user data to your database using Prisma or your preferred database library
      //   try {
      //     const savedUser = await saveUserToDatabase({ email });
      //     console.log("New user saved:", savedUser);
      //   } catch (error) {
      //     console.error("Error saving new user:", error);
      //   }
      // } else {
      //   console.log(`User with email ${email} already exists.`);
      // }

      // return true; // Continue with the sign-in process
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      // Include the user's email in the session
      session.user.email = user.email;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }