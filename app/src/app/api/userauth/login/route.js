import { cookies } from "next/headers";
import usercontroller from "@/app/lib/controllers/authcontroller";

export async function POST(req) {
    
    try{
    console.log("Login request received");

    const user=await req.json();
    
    const response=await usercontroller.loginuser(user);
    console.log("Login response:", response.refreshToken);
    if(response.refreshToken){
        const cookieStore = await cookies();
        cookieStore.set("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            sameSite: "lax",
                });
            console.log(user);
            return Response.json(response);
    }
    
    
    else{
        console.log("Login failed:", response.message);
        return Response.json({ message: "Login failed" }, { status: 401 });     
    }
    } catch (error) {
        console.error("Error logging in user:", error);
        return Response.json({ message: "Error logging in user" }, { status: 500 });
    }
}