import asyncHandler from 'express-async-handler'
import User from '../modals/userModals.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from "../utils/sendEmail.js"
import crypto from 'crypto';

//@desc Auth user/Set token
// route POST /api/users/auth
// @acess Public
//login user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid Email or Password.');
    }

})

//@desc Register a new user
// route POST /api/users
// @acess Public
const resisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user.');
    }
})

//@desc Logout user
// route POST /api/users/logout
// @acess Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User Logged out.' })
})

//@desc Get user profile
// route GET /api/users/profile
// @acess Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

//@desc Update user profile
// route PUT /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
})
//@desc forgot password
// route POST /api/users/password/forgot
// @acess Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/users/password/reset/${resetToken}`;
    const message = `Your reset password URL is :- \n\n${resetPasswordUrl}\n\nIf you have not requested this then please ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password Recovery.`,
            message,
        });
        res.status(200).json({
            Success: true,
            message: `Email sent to ${user.email} sucessfully.`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500);
        throw new Error(error.message);
    }
})
//@desc reset password
// route POST /api/users/password/reset
// @acess Public
const resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        res.status(404);
        throw new Error('Token has expired for this session. Kindly reset again.');
    }
    if (req.body.password !== req.body.confirmPassword) {
        res.status(500);
        throw new Error('Password and ConfirmPassword should be same.');
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        Success: true,
        message: "Password updated."
    })
})
export { authUser, resisterUser, logoutUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword };