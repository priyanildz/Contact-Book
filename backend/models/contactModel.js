import mongoose from "mongoose";

const emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$/;
const phoneRegex = /^\d{10}$/;

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => phoneRegex.test(value),
        message: "Phone must be exactly 10 digits"
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => emailRegex.test(value),
        message: "Invalid email format"
      }
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
