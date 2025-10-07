const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/olympics'

// // Original connection logic - commented out
// mongoose
//     .connect(MONGODB_URI)
//     .then(() => {
//         console.log('connect successfull')
//     })
//     .catch((error) => {
//         console.log('connect failed')
//         console.error(error && error.message ? error.message : error)
//     })

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable Mongoose's buffering
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    cachedDb = db;
    console.log('connect successful');
    return db;
  } catch (error) {
    console.log('connect failed');
    console.error(error && error.message ? error.message : error);
    throw error; // Re-throw the error to indicate connection failure
  }
}

module.exports = connectToDatabase;