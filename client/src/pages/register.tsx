import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg mx-2 sm:mx-0">
        <h2 className="text-3xl font-bold mb-2 text-center">Join Your School</h2>
        <p className="text-gray-500 mb-6 text-center">
          Create your account with the codes provided by your school
        </p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Enter your full name" required />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="schoolCode">School Code</Label>
              <Input id="schoolCode" placeholder="Enter school code" required />
            </div>
            <div className="flex-1">
              <Label htmlFor="roleCode">Role Invite Code</Label>
              <Input id="roleCode" placeholder="Enter role code" required />
            </div>
          </div>
          <div>
            <Label htmlFor="childCode">Child Code (Optional)</Label>
            <Input id="childCode" placeholder="Enter child code (Parents only)" />
            <span className="text-xs text-gray-400">
              Only required if you are registering as a parent
            </span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create password" required />
            </div>
            <div className="flex-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm password" required />
            </div>
          </div>
          <Button className="w-full mt-2" type="submit">Create Account</Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Already have an account? </span>
          <a href="/login" className="text-blue-600 hover:underline text-sm">Sign in here</a>
        </div>
        <div className="text-center mt-2">
          <a href="/" className="text-gray-500 hover:underline text-sm">&larr; Back to Home</a>
        </div>
      </Card>
    </div>
  );
};

export default Register;
