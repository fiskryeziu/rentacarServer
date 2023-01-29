import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDb from './config/connectDB.js'
import path from 'path'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import carRoute from './routes/carRoute.js'
import userRoute from './routes/userRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import reservationRoute from './routes/reservationRoute.js'
import stripeRoute from './routes/stripeRoute.js'
import Stripe from 'stripe'

config()
connectDb()

export const stripe = Stripe(process.env.STRIPE_SECRET_TEST)
const app = express()
const port = process.env.PORT || 5000

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

app.use(json())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('api is running')
})

//routes
app.use('/api/user', userRoute)
app.use('/api/cars', carRoute)
app.use('/api/reservation', reservationRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/stripe', stripeRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
