import express from "express";
const router = express.Router()
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, createProductReview, getTopProducts } from '../controllers/productController.js'
import { admin, protect } from "../middleware/authMiddleware.js"


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


export default router