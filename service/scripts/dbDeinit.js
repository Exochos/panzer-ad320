import mongoose from 'mongoose'
import { User } from '../models/User.js'

const sleepAndQuit = new Promise((resolve) => {
  setTimeout(() => {
    mongoose.connection.close()
    resolve()
  }, 25000)
})

const deinitDB = async () => {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bgjij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    console.log('Connected to the database!')
  } catch (err) {
    console.log('Cannot connect to the database!', err)
    process.exit()
  }

  await User.deleteMany({})

  await sleepAndQuit

  console.log('finished deleting users')
}

deinitDB()
