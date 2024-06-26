import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { getServerUser } from "@/lib/getServerUser";

export async function GET(request) {
    // JSON Web Token {
    //     "name": "Colton Hyland",
    //     "email": "colthyland@gmail.com",
    //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocISpKP5CBNMfsJ-4UAuJbLaQG_EmrsdPLLYuKQWSxIZrQ=s96-c",
    //     "sub": "clo86dif70000vjb4tqfptbig",
    //     "id": "clo86dif70000vjb4tqfptbig",
    //     "iat": 1710209874,
    //     "exp": 1712801874,
    //     "jti": "156d5e9b-b382-49b3-bd1e-af0f959ffa62"
    //   }
    const user = await getServerUser(request);
    const userId= user.id;
    //console.log("Debug: userId:", userId)
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });
        
        return new NextResponse(JSON.stringify({ tasks }), {
            status: 200, // OK
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch tasks" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}