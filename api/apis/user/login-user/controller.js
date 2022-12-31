import User from '../../../models/User'
import { decryptPassword, generateToken } from '../../../utils/auth'

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username }).exec()

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User or password incorrect'
      })
    }

    const isPasswordValid = await decryptPassword(password, user.password)

    console.log({ isPasswordValid })
    if (!isPasswordValid) {
      return res.status(401).json({
        ok: false,
        message: 'User or password incorrect'
      })
    }

    const admins = [process.env.ADMIN_1, process.env.ADMIN_2]
    const isAdmin = admins.includes(user.email)
    const token = generateToken(user)

    res.status(200).json({
      ok: true,
      message: 'User logged in successfully',
      token,
      user: {
        ...user.toJSON(),
        isAdmin
      }
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error logging in user',
      err
    })
  }
}
