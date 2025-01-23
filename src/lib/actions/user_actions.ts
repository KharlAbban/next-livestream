"use server"

import { UserModelType } from "@/utils/types";
import User from "../models/user_model";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser (): Promise<UserModelType> {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser) throw new Error("Unauthorised!!");

        const dbUser = await User.findOne({ clerkUserId: clerkUser.id});

        if (!dbUser) throw new Error("User not found!!");

        return dbUser;
        
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function getUserById (userId: string): Promise<UserModelType | null> {
    try {
        if (!userId || userId === "") throw new Error("No user id available!!");

        const dbUser = await User.findById(userId);

        if (!dbUser) return null;

        return dbUser;
        
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

export async function getUserByUsername (username: string): Promise<UserModelType | null> {
    try {
        if (!username || username === "") throw new Error("No username provided!!");

        const dbUser = await User.findOne({ username: username});

        if (!dbUser) return null;

        return dbUser;
        
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

