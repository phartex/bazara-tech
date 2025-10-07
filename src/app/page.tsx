import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e3ebf3af]" style={{ backgroundImage: "url(/images/login-bg.png)" }}>
 
   
      <div className="z-10 mx-auto max-w-md w-full items-center rounded-2xl px-8 py-12 shadow-lg bg-white" >
        <div className="flex justify-center items-center w-full mb-5">
          <Image
            src="/images/logo.svg"
            alt="Company Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="w-full text-[#353F50]">
          <h1 className="mb-6 mt-2.5 text-2xl font-semibold text-center">Login to your account</h1>
        
          <LoginForm />
        </div>
      </div>
    </main>
  );
}