import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";


const app = express();
const port = process.env.PORT || 4000

await connectDB()

await connectCloudinary()



const allowedOrigins = ['http://localhost:5173', 'https://grocery-delivery-frontend-six.vercel.app']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)



// middlewre

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))




app.get('/', (req, res)=> res.send("Api is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


app.listen(port, ()=>{
    console.log("server is running")
})