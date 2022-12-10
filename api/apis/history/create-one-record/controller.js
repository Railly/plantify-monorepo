import History from '../../../models/History'

export const createOneHistoryRecord = async (req, res) => {
  const { user } = req
  const { content } = req.body

  try {
    const history = await History.create({
      user: user._id,
      content
    })

    res.status(200).json({
      ok: true,
      message: 'History record created successfully',
      history
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error creating history record',
      err
    })
  }
}
