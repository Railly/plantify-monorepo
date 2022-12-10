import History from '../../../models/History'

export const getHistory = async (req, res) => {
  const { user } = req
  const { id } = req.params

  try {
    const idToUse = id ?? user._id
    const history = await History.find({ user: idToUse })

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
