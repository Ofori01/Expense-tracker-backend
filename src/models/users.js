import mongoose, { mongo, Schema } from "mongoose";


const userSchema = new Schema({
    email:{
        required: [true, "email is required"],
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password: {
        required: [true, "Password is required"],
        type:String
    }
})

userSchema.index({email: 1})

const userModel = mongoose.model("User",userSchema)

export default userModel