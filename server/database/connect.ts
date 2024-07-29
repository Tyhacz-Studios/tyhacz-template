// getting-started.js
import mongoose from 'mongoose'
import config from '../config'

export const connectToMongo = async () => {
    const { MONGO_URI } = config()

    try {
        console.log('Info: Connecting to MongoDB...')
        await mongoose.connect(MONGO_URI)
        console.log('Success: Connected to MongoDB.')
    } catch (err) {
        console.error(`Error: Failed to connect to ${MONGO_URI}`, err)
        throw err
    }
}
