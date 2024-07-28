// getting-started.js
import mongoose from 'mongoose'
import config from '../config'

export const connectToMongo = async () => {
    const { MONGO_URI } = config()

    try {
        await mongoose.connect(MONGO_URI)
    } catch (err) {
        console.error(`Failed to connect to ${MONGO_URI}`, err)
        throw err
    }
}
