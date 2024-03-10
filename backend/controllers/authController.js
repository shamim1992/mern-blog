import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
    const { username, email, password, profilePicture } = req.body;
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
            profilePicture,
        });
        const userdata = await newUser.save();
        res.status(200).json(userdata)
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password || email === '' || password === '') {
            next(errorHandler(400, 'Invalid username or password'));
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                next(errorHandler(400, 'Invalid username'));
            }
            const isMatch = bcryptjs.compareSync(password, user.password);
            if (!isMatch) {
                next(errorHandler(400, 'Invalid  password'));
            }

            const token = jwt.sign(
                { id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

            const { password: pass, ...others } = user._doc

            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(others)

            // res.status(200).json(user)
        } catch (error) {
            next(error)
        }

    } catch (err) {
        next(err)
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};