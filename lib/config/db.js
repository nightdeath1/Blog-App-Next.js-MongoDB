import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://nghtdeath:Q0UZNh6HT92K6Ibd@cluster0.rbujt.mongodb.net/blog-app')
    console.log("DB Connected")
}