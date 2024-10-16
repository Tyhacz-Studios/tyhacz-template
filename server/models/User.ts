import mongoose from 'mongoose'

export type UserType = {
    _id?: string
    phone: string
    name: string
    lastLogin?: Date
    superAdmin: boolean
    stripeCustomerId: string
    stytchUserId: string
}

const schema = new mongoose.Schema({
    stytchUserId: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    stripeCustomerId: { type: String, required: false },
    lastLogin: { type: Date, required: false },
    superAdmin: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
})

export const User = mongoose.model<UserType>('User', schema)
