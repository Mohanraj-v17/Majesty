import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js"
import jwt from "jsonwebtoken";


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    console.log(`Login attempt: ${cleanEmail}`);

    const user = await User.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, "i") } })

    if (user) {
        console.log(`User found: ${cleanEmail}`);
        const isMatch = await user.matchPassword(cleanPassword);
        console.log(`Password match for ${cleanEmail}: ${isMatch}`);

        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, "jknsakjsankajsnk", { expiresIn: "30d" });

            res.cookie("jwt", token, {
                httpOnly: true,
<<<<<<< HEAD
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
=======
                secure: false,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 10000
            })
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        } else {
            console.log(`Password mismatch for ${cleanEmail}`);
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } else {
        console.log(`User not found: ${cleanEmail}`);
        res.status(401);
        throw new Error("Invalid email or password");
    }
})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    console.log(`Registration attempt: ${cleanEmail}`);

    const userExist = await User.findOne({ email: cleanEmail });

    if (userExist) {
        console.log(`User already exists: ${cleanEmail}`);
        res.status(400);
        throw new Error("User Already exist");
    }

    const user = await User.create({
        name,
        email: cleanEmail,
        password: cleanPassword
    });

    if (user) {
        console.log(`User created successfully: ${cleanEmail}`);

        const token = jwt.sign({ userId: user._id }, "jknsakjsankajsnk", { expiresIn: "30d" });

        res.cookie("jwt", token, {
            httpOnly: true,
<<<<<<< HEAD
            secure: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
=======
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 10000
        })
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expire: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" })
})


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = (req.body.email || user.email).trim().toLowerCase();

        if (req.body.password && req.body.password.trim() !== '') {
            user.password = req.body.password.trim();
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}