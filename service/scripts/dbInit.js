/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose'
import { v4 } from 'uuid'
import { User } from '../models/User.js'

import users from './users.json'

const sleepAndQuit = new Promise((resolve) => {
  setTimeout(() => {
    mongoose.connection.close()
    resolve()
  }, 50000)
})

const initDB = async () => {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bgjij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    console.log('Connected to the database!')
  } catch (err) {
    console.log('error ', err)
  }

  for (const user of users) {
    await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      decks: user.decks,
      email: user.email,
      password: v4(),
      active: true,
      role: user.role ?? 'user'
    })
  }

  await sleepAndQuit

  console.log('finished saving users')
}

initDB()
