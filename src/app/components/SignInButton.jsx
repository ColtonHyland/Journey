"use client";

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const SignInButton = () => {
<<<<<<< HEAD
  const { data: session } = useSession();
=======
  const { data: session} = useSession();
>>>>>>> 1e10a0cb6505f64a9423c7954ff72e03718175bc

  if(session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
      <p className="text-sky-600">{session.user.name}</p>
      <button onClick={() => signOut()} className="text-red-600">
        Sign Out
      </button>
      </div>
    )
  }
  
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  )
}

export default SignInButton