import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db_connection.js"
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/jobRoute.js'
import applicationRoute from './routes/applicationRoute.js'
import path from 'path'

const app = express()
dotenv.config({})

const PORT = process.env.PORT || 3000
connectDB()
const _dirname = path.resolve();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOrigin = {
    origin: "https://workwise-jobportal.onrender.com",
    credentials: true
}
app.use(cors(corsOrigin))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})
