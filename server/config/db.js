const mongoose = require('mongoose');

let mongoServer = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/online_home_tution';
  try {
    console.log(`[DB] Attempting MongoDB connection to: ${uri.replace(/\/\/[^@]*@/, '//***:***@')}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[DB] MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.warn(`[DB] Primary MongoDB connection failed (${err.message}). Starting MongoMemoryServer fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      const memUri = mongoServer.getUri();
      await mongoose.connect(memUri);
      console.log(`[DB] In-Memory MongoDB Connected at: ${memUri}`);
    } catch (memErr) {
      console.error('[DB] Critical: Failed to initialize in-memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (e) {
    console.error('Error closing DB:', e);
  }
};

module.exports = { connectDB, closeDB };
