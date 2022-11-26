import History from '../../../models/History'

export const deleteOneHistoryRecord = async (req, res) => {
  const { user } = req
  const { id } = req.params

  try {
    const history = await History.findOneAndDelete({ user: user._id, _id: id })

    res.status(200).json({
      ok: true,
      message: 'History record deleted successfully',
      history
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error deleting history record',
      err
    })
  }
}
