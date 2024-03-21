import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.js"

export async function getServerSideProps(authOptions) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return { props: { session } }
}