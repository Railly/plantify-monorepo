import User from '../../../models/User'
import { decryptPassword, generateToken } from '../../../utils/auth'

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username }).exec()

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const isPasswordValid = await decryptPassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const token = generateToken(user)

    res.status(200).json({
      ok: true,
      message: 'User logged in successfully',
      token
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error logging in user',
      err
    })
  }
}
