import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 16,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
});

export default model("User", userSchema);
