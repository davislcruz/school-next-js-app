import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="w-full max-w-md p-8 shadow-lg mx-2 sm:mx-0">
        <h2 className="text-3xl font-bold mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 mb-6 text-center">
          Log in to your school account
        </p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 w-full mt-2" type="submit">Sign In</Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline text-sm">Register here</a>
        </div>
        <div className="text-center mt-2">
          <a href="/" className="text-gray-500 hover:underline text-sm">&larr; Back to Home</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
