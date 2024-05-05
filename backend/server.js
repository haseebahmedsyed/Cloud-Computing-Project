import express from "express"
import path from 'path'
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"
import uploadRoutes from "./Routes/uploadRoutes.js"
import { notFound, errorHandler } from "./middleware/error.js"
import morgan from "morgan"

dotenv.config()

connectDB();

const app = express()

app.use(express.json())


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send("API is running...")
})

// app.get('/api/products', (req, res) => {
//     res.json(products)
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id === req.params.id)
//     res.json(product)
// })

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))