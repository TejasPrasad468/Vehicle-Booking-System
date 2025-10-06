import { NextRequest } from "next/server";
import { addUser } from "@/controllers/userController";

export async function POST(request: NextRequest) {
    try {
        const response = await addUser(request);
        return response;
    } catch (error) {
        console.error("Error in signup route:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}