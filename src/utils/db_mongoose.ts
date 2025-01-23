import mongoose, { Connection } from "mongoose"

let cachedConnection: Connection | null = null;

export const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', true);

        if (!process.env.MONGODB_LOCAL_CONNECTION_STRING) return console.log("MongoDB URI connection string not found!");
        
        if (cachedConnection) {
            console.log("Using cached database connection!");
            return cachedConnection;
        }

        const cnx = await mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING);
        cachedConnection = cnx.connection;

        console.log("MongoDB connection established!");

        return cachedConnection;

    } catch (error) {
        console.log("Error connecting to database", error);
    }
}