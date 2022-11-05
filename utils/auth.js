import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  } catch (error) {
    console.error('Error encrypting password:', error)
  }
}

export const decryptPassword = async (password, encryptedPassword) => {
  try {
    return bcrypt.compare(password, encryptedPassword)
  } catch (error) {
    console.error('Error decrypting password:', error)
  }
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )
}
