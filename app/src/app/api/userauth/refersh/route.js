import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
export async function GET(){
    const refreshToken=cookies().get("refreshToken");
    if (!refreshToken){
        return Response.json({ message: "No refresh token found" }, { status: 401 });
    }
   try{

     const payload = JWT.verify(refreshToken.value, process.env.JWT_SECRET);
     const newAcessToken=JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
     return Response.json({ accessToken: newAcessToken }, { status: 200 });
   }catch(error){
       return Response.json({ message: "Invalid refresh token" }, { status: 401 });
   }
}

