import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/userAuth.js';
import postRoutes from './routes/postRoute.js';
import commentRoutes from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
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
// app.use('/', (req, res) => {
//     res.send("server is running")
// })
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.listen(process.env.PORT, () => console.log('Connected to', process.env.PORT));