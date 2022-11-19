import { Schema, model } from 'mongoose'

const ApiKeySchema = new Schema({
  key: {
    type: String,
    required: [true, 'Please provide an API key.'],
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Please provide a username.']
  },
  isRevoked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ApiKeySchema.methods.toJSON = function () {
  const { __v, ...apiKey } = this.toObject()
  return apiKey
}

export default model('ApiKey', ApiKeySchema)
