"use client";
import { checkAuthStatus } from "@/app/actions/auth.action";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => await checkAuthStatus()
  });
  if (data?.success) router.push("/");
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Loader size={50} className="text-white animate-spin" />
      <p className="mt-4 ml-3 text-xl">Redirecting, please wait...</p>
    </div>
  )
}
export default Page