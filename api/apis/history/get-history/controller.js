import History from '../../../models/History'

export const getHistory = async (req, res) => {
  const { user } = req

  try {
    const history = await History.find({ user: user._id })

    res.status(200).json({
      ok: true,
      message: 'History fetched successfully',
      history
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error fetching history',
      err
    })
  }
}
