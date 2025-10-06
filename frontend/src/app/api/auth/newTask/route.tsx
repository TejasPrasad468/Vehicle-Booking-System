import {addNewTask} from "@/controllers/taskController";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
	try {
		console.log("here");
		const response = await addNewTask(request);
		return response;
	}
	catch(err) {
		console.error("Error in login route:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
	}
}
