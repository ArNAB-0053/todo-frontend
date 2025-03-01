"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; 
import { toast } from "sonner";
import { apiService } from "@/lib/api-service";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  // Function to get userId from token in localStorage
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // console.log("No token found in localStorage");
        return null;
      }
      const decoded = jwtDecode(token);
      // console.log("Decoded token:", decoded);
      return decoded.id; // Assuming 'id' is the field in your token
    } catch (error) {
      // console.error("Error decoding token:", error);
      return null;
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const id = getUserIdFromToken();
      setUserId(id);

      if (id) {
        try {
          setIsLoading(true);
          // console.log("Fetching user data for ID:", id);
          const userData = await apiService.getUser(id);
          // console.log("User data from API:", userData);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            bio: userData.bio || "",
          });
        } catch (error) {
          // console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data.");
          setFormData({ name: "", email: "", bio: "" }); // Reset on failure
        } finally {
          setIsLoading(false);
        }
      } else {
        // console.log("No userId found in token");
        setFormData({ name: "", email: "", bio: "" });
      }
    };

    fetchUserData();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!userId) {
        throw new Error("User ID not available. Please log in.");
      }
      await apiService.updateUser(userId, formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      // console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account profile information and bio.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-lg">
                  {formData.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true} // Email typically not editable
                />
                <p className="text-xs text-muted-foreground">
                  Your email address is used for sign-in and cannot be changed here.
                </p>
              </div>
            </div>
          </div>

          {/* Not adding now */}
          {/* <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself"
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div> */}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !userId} className="mt-6">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}