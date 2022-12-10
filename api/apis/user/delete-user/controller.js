import User from '../../../models/User'

export const deleteUser = async (req, res) => {
  const { user } = req
  const { id } = req.params

  try {
    const admins = [process.env.ADMIN_1, process.env.ADMIN_2]
    const isAdmin = admins.includes(user.email)

    if (!isAdmin) {
      res.status(401).json({
        ok: false,
        message: 'Unauthorized'
      })
    }

    const deletedUser = await User.deleteOne({ _id: id })

    if (!deletedUser) {
      console.log(8)
      res.status(404).json({
        ok: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'User deleted successfully',
      user: deletedUser
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error deleting user',
      err
    })
  }
}
