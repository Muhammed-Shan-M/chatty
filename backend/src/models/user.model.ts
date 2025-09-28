import mongoose from "mongoose";
import type { IUser } from "../types/usertype.types.ts";

const userSchema = new mongoose.Schema<IUser>(
    {
        fullName:{
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        userName: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minLength: 6
        },
        profile: {
            type: String,
            require: true,
            default: ""
        }
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)
export default User