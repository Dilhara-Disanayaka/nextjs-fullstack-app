"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Eye, EyeOff, Users, Receipt, TrendingUp } from "lucide-react"
import axios from "axios"   


export default function login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  async function handleSubmit (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email=formData.get('email')
    const password=formData.get('password')
    console.log(isLogin)
    if(isLogin){
      try{

        const res=await axios.post('/api/userauth/login',{email,password})
        console.log('adada')
        if(res.data.accessToken){
          localStorage.setItem('accessToken',res.data.accessToken)
          alert('Login successful')
        }else{
            alert('Login failed')
        }
      }catch(error){
        console.error("Login failed:", error)
      }
    }else{
        try{
           const res=await axios.post('/api/userauth/Register',{email,password})
           alert(res.data.message)
      }catch(error){
        console.error("Login failed:", error)
      }
    }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Receipt className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SplitEasy</h1>
          <p className="text-gray-600 mt-2">Split expenses with friends easily</p>
        </div>
        <form onSubmit={handleSubmit}>
        <Card  >
          <CardHeader>
            <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
              </TabsContent>

              <TabsContent value="signup">
                <CardTitle>Create account</CardTitle>
                <CardDescription>Sign up to start splitting expenses</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" type="text" required>Full Name</Label>
                <Input id="name" placeholder="Enter your full name"  required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" type="email" value='email' name='email' >Email</Label>
              <Input id="email" type="email" name='email' placeholder="Enter your email"  required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" type="password" value='password' required>Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} name='password' placeholder="Enter your password"  required />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" type="password" required>Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" />
              </div>
            )}

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            {isLogin && (
              <div className="text-center">
                <Button variant="link" className="text-sm text-indigo-600">
                  Forgot your password?
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        </form>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-gray-600">Create Groups</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Receipt className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-gray-600">Track Expenses</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-gray-600">View Analytics</span>
          </div>
        </div>
      </div>
    </div>
  )
}
