import mongoose from "mongoose";

const emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => emailRegex.test(value),
        message: "Invalid email format"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
