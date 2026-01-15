const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connect_db')
const router = require('./routes')
const app = express()
const morgan = require("morgan")
const cors = require('cors')


dotenv.config()
connectDB()

const port = process.env.PORT || 2000
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials : true
}))
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))
app.use("/api/v1", router)

app.listen(port , () => {
    console.log(`server is running on http://localhost:${port}`)
})