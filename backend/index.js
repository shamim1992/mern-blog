import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});


app.listen(process.env.PORT, () => console.log('Connected to', process.env.PORT));