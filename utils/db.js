import mongoose from "mongoose";

const db =async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(`Connection Error:${error.message}`);
  }
};

export default db;
