"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redis } from "@/lib/db";
import { Message } from "@/db/dummy";

type sendMessageActionType = {
    content: string;
    receiverId: string;
    messageType: "text" | "image";
}


export async function sendMessageAction({ content, messageType, receiverId }: sendMessageActionType) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) return { success: false, message: "User not Authenticated" };

        const senderId = user.id;

        const conversationId = `conversation:${[senderId, receiverId].sort().join(":")}`;

        const conversationExits = await redis.exists(conversationId);

        if (!conversationExits) {
            await redis.hset(conversationId, {
                participant1: senderId,
                participant2: receiverId,
            });

            await redis.sadd(`user:${senderId}:conversations`, conversationId);
            await redis.sadd(`user:${senderId}:conversations`, conversationId);
        }

        const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2, 9)}`;
        const timeStamp = Date.now();

        await redis.hset(messageId, {
            senderId,
            receiverId,
            content,
            messageType,
            timeStamp
        });

        await redis.zadd(`${conversationId}:messages`, { score: timeStamp, member: JSON.stringify(messageId) });

        const channelName = `${senderId}__${receiverId}`.split("__").sort().join("__");

        await pusherServer?.trigger(channelName, "newMessage", {
            message: { senderId, content, timeStamp, messageType },
        });

        return { success: true, conversationId, messageId };
    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false, message: "An error occurred while sending the message" };
    }
}

export async function getMessage(selectedUserId: string, currentUser: string) {
    const conversationId = `conversation:${[selectedUserId, currentUser].sort().join(":")}`;
    const messageIds = await redis.zrange(`${conversationId}:messages`, 0, -1);
    if (messageIds.length === 0) return [];

    const pipeline = redis.pipeline();
    messageIds.forEach(messageId => pipeline.hgetall(messageId as string));
    const messages = await pipeline.exec() as Message[];

    return messages;
}