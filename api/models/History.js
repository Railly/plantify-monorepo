import { Schema, model } from 'mongoose'

const HistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user id.']
  },
  content: {
    type: String,
    required: [true, 'Please provide a content.']
  }
}, {
  timestamps: {
    createdAt: true
  }
})

export default model('History', HistorySchema)
