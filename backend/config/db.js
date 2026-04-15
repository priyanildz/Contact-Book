import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes("<username>") || mongoUri.includes("<password>")) {
    console.error(
      "Missing or placeholder MONGO_URI. Update backend/.env with a real MongoDB URI (mongodb:// or mongodb+srv://)."
    );
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
