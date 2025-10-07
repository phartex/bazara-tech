"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, ButtonLoading } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(2, { message: "Password must be at least 2 characters." }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });
  const { setAuthUser } = useAuthStore();
  const router = useRouter();

  const authenticateUser = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const json = await res.json();
      return json;
    },

    onSuccess: (response) => {
      console.log("Full login response:", response);

      const userData = response.data?.user;
      const accessToken = response.data?.accessToken;

      if (userData && accessToken) {
  setAuthUser(userData, accessToken)
      }

      toast.success("Login Successful");
      router.push("/dashboard");
    },

    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error("Unable to login. Please check your credentials and try again.");
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const onSubmit = (data: { username: string; password: string }) => authenticateUser.mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-[#353F50] w-full">
        <FormField
          control={form.control}
          name="username"
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
          <Button variant="link" type="button" className="text-[#103FA3]">Forgot Password?</Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#1659E6] py-6 text-xl hover:bg-[#1659E6] hover:text-white"
          disabled={authenticateUser.isPending}
        >
          {authenticateUser.isPending && <ButtonLoading className="h-4 w-4 animate-spin mr-2" />}
          {authenticateUser.isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
}
