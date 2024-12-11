require("dotenv").config()
const express = require("express")
const cors = require("cors")

const LmsServer = express()

const router = require('./router/routes')
require('./database/dbConnection')

LmsServer.use(cors())
LmsServer.use(express.json())
LmsServer.use(router)
LmsServer.use('/uploads', express.static('./uploads'))

const PORT = 3000 || process.env.PORT

LmsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

LmsServer.get('/', (req, res) => {
    res.status(200).send(`<h1>Server is running on port ${PORT}</h1>`)
})