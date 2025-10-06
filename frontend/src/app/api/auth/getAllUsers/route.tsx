import { NextRequest, NextResponse } from "next/server";

import { getAllUsers } from "@/controllers/userController";

export async function GET(request: NextRequest) {
    try {
        const response = await getAllUsers(request);

        if (response.status === 200) {
            const data = await response.json(); // ✅ await
            // console.log(data);

            return NextResponse.json(data, { status: 200 });
        }

        return NextResponse.json({ error: "Failed to fetch users" }, { status: response.status });
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}