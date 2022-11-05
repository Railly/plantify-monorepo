import User from '../../../models/User'
import { encryptPassword, generateToken } from '../../../utils/auth'

export const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body
  const user = new User({
    username,
    email,
    password: await encryptPassword(password),
    firstName,
    lastName
  })

  try {
    const savedUser = await user.save()
    const token = generateToken(savedUser._id)
    res.status(201).json({
      ok: true,
      message: 'User created',
      token
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error creating user',
      err
    })
  }
}
