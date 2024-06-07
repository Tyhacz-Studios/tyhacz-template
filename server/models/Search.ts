import mongoose from 'mongoose'

export type SearchType = {
    _id?: string
    createdAt?: Date

    keywords: string[]
    city: string
    user: string // owner of search
}

const schema = new mongoose.Schema({
    keywords: [{ type: String, required: true }],
    city: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false
})

export const Search = mongoose.model<SearchType>('Search', schema)
