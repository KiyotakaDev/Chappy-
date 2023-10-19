import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  profileImage: {
    type: String,
    default: "",
  },
  isProfileImageSet: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Image", imageSchema);
