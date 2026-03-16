import mongoose, {Schema} from "mongoose"

const noteSchema = new Schema(
    {
        title: {
            type: String,
            default: "No Title",
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true})

noteSchema.index(
    {
        title: "text",
        content: "text",
    },
    {
        weights: {
            title: 5,
            content: 1
        }
    }
)

noteSchema.index({ owner: 1 })

export const Note = mongoose.model("Note", noteSchema)