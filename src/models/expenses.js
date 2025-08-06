import mongoose, { Schema } from "mongoose";
import { expense_types } from "../utils/constants.js";



const expenseSchema= new Schema({
    expense_name: {
        required: true,
        trim: true,
        lowercase: true,
        minLength: [2, "Please enter a valid name"],
        maxLength: [50, "Expense name too large"]
    },
    expense_type: {
        type: String,
        required: true,
        trim: true,
        enum: expense_types
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date
}, {timestamps: true})

//compound index
expenseSchema.index({user: 1, createdAt: 1})

//single index
expenseSchema.index({user: 1})

const expenseModel = mongoose.model("Expense", expenseSchema)

export default expenseModel