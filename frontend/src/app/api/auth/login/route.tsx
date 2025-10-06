import { NextRequest } from "next/server";
import { userpasswordCheck } from "@/controllers/userController";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const response = await userpasswordCheck(request);
        if (response.status === 200) {
            // Assuming userpasswordCheck returns a Response with user data in the body
            const data = await response.json();
            const { USER_ID, username } = data.user || {};
            // You may want to return the token in the response
            const responseToSend:any = NextResponse.json(
                { user: { USER_ID, username }, message: "Login successful" },
                { status: 200 }
            );

            return responseToSend;
        }
        else {
            return new NextResponse(JSON.stringify({ error: "Invalid credentials" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }
    }
    catch (error) {
        console.error("Error in login route:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}