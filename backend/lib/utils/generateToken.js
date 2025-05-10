import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (useId,res) => {
    const token = jwt.sign({ id: useId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
    
}