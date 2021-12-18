import mongoose from 'mongoose'

const connectDB = async () => {
    const uri = process.env.MONGO_URI || process.env.MONGO_URI_PROD
    try {
        const conn = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser : true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
