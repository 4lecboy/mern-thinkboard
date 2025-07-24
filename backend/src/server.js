import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


// Middleware
if(process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    }));
}
app.use(express.json()); // this middleware parses incoming JSON requests: req.body
app.use(rateLimiter);

// Routes
app.use("/api/notes", noteRoutes);

if(process.env.NODE_ENV === 'production') {
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

