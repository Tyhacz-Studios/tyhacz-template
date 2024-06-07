import mongoose from 'mongoose'

export type PostType = {
    _id?: string

    name: string
    profileUrl: string
    location: string
    text: string
    dateOfPost: Date
}

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    profileUrl: { type: String, required: true },
    location: { type: String, required: true },
    text: { type: String, required: true },
    dateOfPost: { type: Date, required: true },
    image: { type: String, required: false },
}, {
    timestamps: true,
    versionKey: false
})

export const Post = mongoose.model<PostType>('Post', schema)
