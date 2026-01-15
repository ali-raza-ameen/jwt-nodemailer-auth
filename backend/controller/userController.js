const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Verifyemail } = require("../verifyEmail/emailVerify")

 const userRegister = async (req, res) => {
    try {
        const name = req.body?.name;
        const email = req.body?.email;
        const password = req.body?.password;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error : true,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error : true,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        
        })

        const token = jwt.sign(
            { id: newUser._id },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1d" }
        )

        await Verifyemail(token, email)
         newUser.token = token
         newUser.save()
        res.status(201).json({
            success: true,
            error: false,
            message: "User registered successfully. Please verify your email.",
            data: newUser,
            token : token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error : true,
            message: error.message
        })
    }
}

module.exports = userRegister
