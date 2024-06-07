// getting-started.js
import mongoose from 'mongoose'
import config from '../config'

export const connectToMongo = async () => {
    const { MONGO_URI } = config()

    await mongoose.connect(MONGO_URI)
}
