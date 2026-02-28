import express from "express"
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
<<<<<<< HEAD
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} from "../controllers/userController.js"

import { protect, admin } from "../middleware/authMiddleware.js"


router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);
=======
    getUser,
    getUserById,
    deleteUSer,
    updateUser
}   from "../controllers/userController.js"

import {protect, admin} from "../middleware/authMiddleware.js"


router.route("/").post(registerUser).get(protect, admin, getUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUSer).get(protect, admin, getUserById).put(protect, admin, updateUser);
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed
export default router