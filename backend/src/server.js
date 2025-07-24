import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
}))
app.use(express.json()); // this middleware parses incoming JSON requests: req.body
app.use(rateLimiter);

// Routes
app.use("/api/notes", noteRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

