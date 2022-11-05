import mongoose from 'mongoose'

export const createDBConnection = async () => {
  const DATABASE_URL = process.env.DATABASE_URL
  try {
    const db = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (db) {
      db.connection.on('error', () => {
        console.error('Database connection error')
      })

      db.connection.once('connected', () => {
        console.log('Database connected')
      })
    }
  } catch (error) {
    console.log(error)
  }
}
