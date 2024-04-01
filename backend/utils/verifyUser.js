import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Unauthorized'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized'
            })
        }
        req.user = user;
        next();
    })


}