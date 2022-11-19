import ApiKey from '../../../models/ApiKey'

export const getApiKey = async (req, res) => {
  try {
    const apiKeys = await ApiKey.findOne({ user: req.user._id }).exec()
    res.status(200).json(apiKeys)
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error while generating API key',
      err
    })
  }
}
