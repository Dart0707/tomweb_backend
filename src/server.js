import express from 'express';
import "dotenv/config";

import loginRoutes from './routes/loginRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { disconnectDB } from './config/db.js';

const app = express();

//Parse incoming JSON
app.use(express.json());

//Api Routes
app.use("/login", loginRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);

//Test
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


//Initialize the server
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//Error Handling
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled error: ${err.message}`);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error(`Uncaught error: ${err.message}`);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});