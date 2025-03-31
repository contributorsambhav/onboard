import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI2;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside environment variables",
  );
}

let cachedClient = null;

/**
 * Connect to MongoDB using the native MongoDB driver
 * @returns {Promise<MongoClient>} MongoDB client instance
 */
export const connect = async () => {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);

  await client.connect();
  cachedClient = client;
  return cachedClient;
};

// Initialize cached connection for mongoose
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

/**
 * Connect to MongoDB using mongoose ODM
 * @returns {Promise<mongoose.Connection>} Mongoose connection
 */
export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      dbName: process.env.DB_NAME,
      bufferCommands: false,
      connectTimeoutMS: 30000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
