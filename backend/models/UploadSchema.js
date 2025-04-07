import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
  leafType: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Image = mongoose.model("Image", imageSchema)

export default Image
