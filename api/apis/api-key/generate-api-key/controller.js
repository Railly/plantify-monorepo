import ApiKey from '../../../models/ApiKey'

export const generateApiKey = async (req, res) => {
  const { user } = req
  const apiKey = new ApiKey({ user: user._id })
  // TODO: Use playwright to generate a new API key

  try {
    await apiKey.save()
    res.status(200).json({
      ok: true,
      message: 'API key generated successfully',
      apiKey
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error while generating API key',
      err
    })
  }
}
