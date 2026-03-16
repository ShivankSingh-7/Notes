import mongoose, {Schema} from "mongoose"
import { User } from "./user.model.js"

const noteScheme = new Schema(
    {
        
    },
    {timestamps: true})

export const Notes = mongoose.model("Notes", noteScheme)