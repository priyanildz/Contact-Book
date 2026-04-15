import mongoose from "mongoose";

const emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$/;
const phoneRegex = /^\d{10}$/;

const contactSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (value) => phoneRegex.test(value),
        message: "Phone must be exactly 10 digits"
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (value) => emailRegex.test(value),
        message: "Invalid email format"
      }
    }
  },
  { timestamps: true }
);

contactSchema.index({ owner: 1, name: 1 }, { unique: true });
contactSchema.index({ owner: 1, phone: 1 }, { unique: true });
contactSchema.index({ owner: 1, email: 1 }, { unique: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
