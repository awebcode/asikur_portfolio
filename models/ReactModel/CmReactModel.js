import mongoose from "mongoose";

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    // type: mongoose.Schema.ObjectId,
    // ref: "comment",
    type: String,
  },
  reactBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

const postReactCommentModel =
  mongoose.models.ReactComment || mongoose.model("ReactComment", reactSchema);
export default postReactCommentModel;
