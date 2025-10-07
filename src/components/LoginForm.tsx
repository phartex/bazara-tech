"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(2, { message: "Password must be at least 2 characters." }),
});

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const { setAuthUser } = useAuthStore();
  const router = useRouter();

  const authenticateUser = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await apiClient.post("/api/v1/platform-admin/auth/login", data);
      return res.data;
    },
    onSuccess: (response) => {
      console.log("Full login response:", response);
      
      // Extract data from your API response structure
      const { data } = response;
      const authData = {
        id: data.user.email,
        email: data.user.email,
        accessToken: data.accessToken,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        phoneNumber: data.user.phoneNumber,
        userType: data.user.userType,
        role: data.user.role,
        refreshToken: data.refreshToken,
        expires: data.expires
      };
      
      console.log("Processed auth data:", authData);
      
      // Store the processed authData, not the raw response.data
      setAuthUser(authData);
      toast.success("Login Successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const onSubmit = (data: { email: string; password: string }) => authenticateUser.mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-[#353F50] w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Email Address/Username</FormLabel>
              <FormControl>
                <Input placeholder="Email Address/Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter password" {...field} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2">
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center">
            
          </div>
          <Button variant="link" type="button" className="text-[#103FA3]">Forgot Password?</Button>
        </div>
        <Button type="submit"  className="w-full bg-[#1659E6] py-6 text-xl" disabled={authenticateUser.isPending}>
          {authenticateUser.isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
}