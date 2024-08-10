import ChatLayout from "@/components/chat/ChatLayout";
import PreferenceTab from "@/components/PreferenceTab";
import { redis } from "@/lib/db";
import { cookies } from "next/headers";

export default async function Home() {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    // await redis.set("foo", "bar");
    const data = await redis.get("foo");
    console.log(data);

    return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">

      <PreferenceTab />

      <div className="z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex">
        <ChatLayout defaultLayout = {defaultLayout} />
      </div>
    </main>
  );
}
