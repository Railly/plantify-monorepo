import jwt from 'jsonwebtoken'
import User from '../models/User'

export const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'User not found'
      })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({
      ok: false,
      message: 'Error authenticating user',
      err
    })
  }
}
