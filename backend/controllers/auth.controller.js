import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username , email , password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format'});
        }
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists'});
        }
        const existingEmail = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists'});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword, 
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profilePicture: newUser.profilePicture,
                coverPicture: newUser.coverPicture,
            });
        }else{
            res.status(400).json({
                error: 'User not created',
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}


export const login = (req, res) => {
    res.json({
        data : 'Login Endpoint',
    });
}

export const logout =  (req, res) => {
    res.json({
        data : 'Logout Endpoint',
    });
}