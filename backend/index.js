import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});

app.use('/api/user', userRoutes);
app.listen(process.env.PORT, () => console.log('Connected to', process.env.PORT));