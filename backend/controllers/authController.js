import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'Invalid username or email'));
        }

        const hasedpassword = bcryptjs.hashSync(password, 10)

        const newUser = new User({
            username,
            email,
            password: hasedpassword,
        });
        const userdata = await newUser.save();
        res.status(200).json(userdata)
    } catch (err) {
        next(err)
    }
}