import cookies from 'next/headers';
import usercontroller from '@/app/lib/controllers/authcontroller';
export async function POST(req){
   try{
    const user=await req.json();
    console.log("Registration request received for user:", user.email);
    const response= await usercontroller.registeruser(user);
    console.log("Registration response:", response.message);
    return Response.json({ message: response.message });

    }catch(error){
        console.error("Registration failed:", error);
        return Response.json({ message: "Registration failed" }, { status: 500 });
    }
}