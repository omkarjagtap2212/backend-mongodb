require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const User = require('./models/user.models')
const cors = require("cors")
const bcrypt =require("bcryptjs")
// require("./models/user.models")



const mongoUrl = process.env.mongoUrl


mongoose.connect(mongoUrl, {
    useNewUrlParser: true

}).then(() => {
    console.log("connected to database")

})
    .catch((error) => {
        console.log(`the database connection failed `, error)


    })


const app = express()

const PORT = process.env.PORT
app.use(cors())

app.listen(PORT, () => console.log("your server has been  started..", PORT))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("hi this is HomePage")
})



app.post("/post", async (req, res) => {
    console.log(req.body)
    const { data } = req.body

    try {
        if (data === "omkar") {
            res.send({ status: "ok" })

        }
        else {
            res.send({ status: "user not found" })
        }

    } catch (error) {
        res.send({ status: "failed" })

    }

})


app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body
    const saltRounds=10
    const encryptedPassword = await bcrypt.hash(password,saltRounds)

    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            res.send({ status: "user already exits" })
            return
        }
        await User.create({
            fname,
            lname,
            email,
            password:encryptedPassword,


        })
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: failed })


    }
})