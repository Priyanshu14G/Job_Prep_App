const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/blacklist.model")

// Remove the first declaration and keep only ONE register function
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Check if JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set cookie and send response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: error.message });
    }
}

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Check if JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
}

async function logoutUserController(req, res) {
    const token = req.cookies?.token;

    if (token) {
        await TokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "user logged out sucessfully"
    })
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message:"user fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}
module.exports = { registerUserController, logoutUserController, loginUserController,getMeController };