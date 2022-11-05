import User from '../../../models/User'

export const getUsers = async (req, res) => {
  // TODO add pagination
  try {
    const users = await User.find()
    res.status(200).json({
      ok: true,
      message: 'Users found',
      users
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error finding users',
      err
    })
  }
}
