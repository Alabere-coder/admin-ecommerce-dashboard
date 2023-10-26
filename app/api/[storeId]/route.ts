import prismadb from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { name } = body

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!name) {
            return new NextResponse("Name is not available", {status: 400})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)
        
    } catch (error) {
        return new NextResponse("Internal server error", {status: 500})
    }
}