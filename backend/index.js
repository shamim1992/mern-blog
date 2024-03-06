import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/userAuth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false, statusCode, message
    });
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.listen(process.env.PORT, () => console.log('Connected to', process.env.PORT));