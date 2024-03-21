import { getServerSession } from "next-auth/next"
import { authOptions } from "../path/to/your/[...nextauth].js"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

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