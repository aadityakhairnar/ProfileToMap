const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI); // No need for deprecated options
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
