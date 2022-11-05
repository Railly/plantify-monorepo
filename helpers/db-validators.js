import User from '../models/User'

export const uniqueEmail = async (email) => {
  const user = await User.findOne({ email }).exec()
  if (user) {
    throw new Error('Email is already taken')
  }
}

export const uniqueUsername = async (username) => {
  const user = await User.findOne({ username }).exec()
  console.log({ user })
  if (user) {
    throw new Error('Username is already taken')
  }
}
