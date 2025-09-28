import type { NextFunction, Request, Response } from "express"
import { validatePassword } from "../utility/passwordValidater.utility.ts"
import { AppError } from "../errors/appError.errors.ts"
import bcrypt from "bcryptjs"
import User from "../models/user.model.ts"
import { genarateJwt } from "../utility/jwtUtil.utility.ts"
import cloudinary from "../lib/cloudinary.ts"
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts"


export const signup = async (req: Request, res: Response, next:NextFunction) => {
    const { fullName, userName, password, email } = req.body

    try {
        if (!fullName || !userName || !password || !email) throw new AppError("All required fields must be provided for signup.", 400)
        const passwordValidater = validatePassword(password)
        if (passwordValidater !== "") throw new AppError(passwordValidater, 400)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new AppError("Please enter a valid email address (example: user@example.com)", 400)

        const userExist = await User.findOne({ $or: [{ email }, { userName }] })
        if (userExist) throw new AppError(userExist.email === email ? "Email already exists" : "Username already exists", 400);


        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)


        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword
        })

        if (newUser) {

            genarateJwt(newUser._id, res)

            await newUser.save()

            const { password: hashedPassword, ...userData } = newUser.toObject();
            return res.status(201).json(userData)

        } else {
            throw new AppError('Invalid User Data', 400)
        }

    } catch (error) {
        next(error)
    }
}



export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { identifier, password } = req.body

    try {
       
        if (!identifier || !password) throw new AppError('Please provide a username or email along with your password.', 400)

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        const user = isEmail ?
            await User.findOne({ email: identifier }) :
            await User.findOne({ userName: identifier })

        if (!user) throw new AppError("User not found", 404)

        const isPasswordValid = await bcrypt.compare(password, user?.password)
        if (!isPasswordValid) throw new AppError("Invalid password", 401)

        genarateJwt(user._id, res)

        const { password: hashedPassword, ...userData } = user.toObject();
        res.status(200).json( userData )

    } catch (error) {
        next(error)
    }
}


export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: 'user Logged out successfully' })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.file) throw new AppError('Profile image is required. Please upload your profile picture.', 400)

        const userId = req.user?._id

        const cloudinaryImage = await uploadToCloudinary(req)

        const updateUser = await User.findByIdAndUpdate(userId,
            {
                profile: cloudinaryImage
            },
            { new: true }
        ).select('-password')

        if (!updateUser) {
            throw new AppError("User not found. Unable to update profile picture.", 404);
        }

        res.status(200).json(updateUser)

    } catch (error) {
        next(error)
    }
}


export const updateFullName = async (req:Request, res:Response, next: NextFunction) => {
    const {fullName} = req.body
    try {
        if(!fullName)throw new AppError('Your full name cannot be empty. Kindly provide it.',400)

        const userId = req.user?._id

        const updateUser = await User.findByIdAndUpdate(userId, 
            {
                fullName: fullName
            },
            {new: true}
        ).select('-password')

        if (!updateUser) {
            throw new AppError("User not found. Unable to update full name.", 404);
        }

        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}


export const checkAuth = async (req:Request, res:Response) => {
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}