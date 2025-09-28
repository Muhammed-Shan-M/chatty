import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string)
        console.log('mongodb connected successfully : ',conn.connection.host);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`)
    }
}

