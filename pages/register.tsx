import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-200 to-blue-200">
      <Card className="w-full max-w-md p-8 shadow-lg mx-2 sm:mx-0">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Join Your School
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Create your account with the codes provided by your school
        </p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="sr-only">
              Full Name
            </Label>
            <Input id="fullName" placeholder="Full name" required />
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="Email" required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="schoolCode" className="sr-only">
                School Code
              </Label>
              <Input id="schoolCode" placeholder="School code" required />
            </div>
            <div className="flex-1">
              <Label htmlFor="roleCode" className="sr-only">
                Role Invite Code
              </Label>
              <Input id="roleCode" placeholder="Role code" required />
            </div>
          </div>
          <div>
            <Label htmlFor="childCode" className="sr-only">
              Child Code (Optional)
            </Label>
            <Input id="childCode" placeholder="Child code (Parents only)" />
            <span className="text-xs text-gray-400">
              Only required if you are registering as a parent
            </span>
          </div>
          
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>
          
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 w-full mt-2"
            type="submit"
          >
            Create Account
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">
            Already have an account?{" "}
          </span>
          <a
            href="/login"
            className="text-blue-500 hover:text-purple-600 text-sm font-bold"
          >
            Sign in here
          </a>
        </div>
        <div className="text-center mt-2">
          <a href="/" className="text-gray-500 hover:underline text-sm">
            &larr; Back to Home
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Register;
