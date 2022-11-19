import { Schema, model } from 'mongoose'

const ApiKeySchema = new Schema({
  key: {
    type: String,
    required: [true, 'Please provide an API key.'],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user.']
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
