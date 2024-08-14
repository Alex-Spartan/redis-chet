import { Button } from "@/components/ui/button";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) return redirect("/");
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#651c2b55] bg-[#651c2b] relative justify-center items-center">
        <img
          src="/redis-logo.svg"
          alt="Redis logo"
          className="absolute -left-1/4 opcaity-25 -bottom-52 lg:scale-125 xl:scale-100 scale-[2] pointer-events-none select-none -z-1"
        />

        <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={763}
            height={173}
            className="mt-20 w-[420px] z-0 pointer-events-none select-none"
          />
          <p className="text-2xl md:text-3xl text-balance z-10">
            The <span className="bg-red-500 px-2 font-bold text-white">Ultimate</span> chat app
          </p>
          <p className="text-2xl md:text-3xl text-balance z-10 mb-32">
            That I <span className="bg-green-500/90 font-bold to-white px-2">Built</span> for fun
          </p>
          <AuthButtons />
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
        <Image 
            src={"/hero-right.png"}
            alt="bg-img"
            fill
            className="object-cover dark:opacity-60 opacity-90 pointer-events-none select-none h-full"
        />
      </div>
    </div>
  );
};
export default page;
