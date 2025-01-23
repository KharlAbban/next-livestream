import { UserModelType } from "@/utils/types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserModelType>(
    {
        clerkUserId: {type: String, required: true},
        username: {type: String, required: true},
        email: {type: String, required: true},
        imageUrl: {type: String, required: true},
        following: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        ],
        followedBy: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        ]
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;