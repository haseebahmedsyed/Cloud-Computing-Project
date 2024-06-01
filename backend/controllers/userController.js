import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
// import { transporter } from '../utils/mail.js';

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
 
    if (user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else {
        res.status(401)
        throw new Error("Invalid email or Password")
    }
})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD,
        },
    });
    const user = await User.create({ name, email, password });

    if (user) {
        // Send registration email
        const mailOptions = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Welcome to ProShop',
            text: `Hello ${name},\n\nWelcome to ProShop! We have registered your information securely on our website. Enjoy shopping from ProShop and have a wonderful experience.\n\nBest Regards,\nThe ProShop Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Error sending email: ${error}`);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });

        console.log("Mail ", process.env.MAIL)
        console.log("pass ", process.env.PASSWORD)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user){
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    }
    else{
        res.status(404)
        throw new Error("User not found")
        
    }
})

const getUserProfileByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({ email });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});




const getUserPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user){
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            password: user.password
        })

    }
    else{
        res.status(404)
        throw new Error("User not found")
        
    }
})


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.status(201).json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }

    else{
        res.status(404)
        throw new Error("User not found")
        
    }
})


// Admin 

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    
    res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if(user){
        await user.deleteOne()
        res.json("User removed")
    } else{
        res.status(404)
        throw new Error("User not found")
    }

})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    
    if(user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error("User not found")
    }

})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        
        const updatedUser = await user.save()

        res.status(201).json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }

    else{
        res.status(404)
        throw new Error("User not found")
        
    }
})


export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, getUserPassword, getUserProfileByEmail}
