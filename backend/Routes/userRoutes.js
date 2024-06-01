import express from "express";
const router = express.Router()
import { authUser, deleteUser, getUserById, getUserPassword, getUserProfile, getUserProfileByEmail, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import {admin, protect} from "../middleware/authMiddleware.js"


router.route('/').post(registerUser).get(protect,admin, getUsers)
router.route('/password').get(protect, getUserPassword)
router.route('/password/:email').get(getUserProfileByEmail)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect,admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router