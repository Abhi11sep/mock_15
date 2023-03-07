const express = require('express')
const app = express();
const cors = require('cors')
const { connection } = require('./configs/db')
const { userRoutes } = require('./routes/userRoutes');

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/", userRoutes)

app.listen(8080, async (req, res) => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("unable to connect to db")
    }
    console.log("running on port 8080")
})