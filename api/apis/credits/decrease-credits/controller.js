import User from '../../../models/User'

export const decreaseCredits = async (req, res) => {
  const { user } = req
  const { amount } = req.body

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $inc: { remainingCredits: -amount } },
      { new: true }
    ).exec()

    res.status(200).json({
      ok: true,
      message: 'Credits decreased successfully',
      user: updatedUser
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error decreasing credits',
      err
    })
  }
}
