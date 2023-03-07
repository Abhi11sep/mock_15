const express = require('express')
const userRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/userModel')
const { JobModel } = require('../models/jobModel')

userRoutes.get("/", (req, res) => {
    res.send("helo")
})

userRoutes.post("/signup", (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 2, async (err, hash) => {
            if (err) {
                console.log("unabel to hash", err)
            }
            let user = await UserModel({ name, email, password: hash })
            await user.save()
            res.send("user signup success")
        });

    } catch (error) {
        res.send("unable to signup")
    }
})

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user[0] }, 'masai');
                    console.log(`logged in , welcome : ${user[0].name}, \n token : ${token}`)
                    res.send({ "msg": "logged in ", "token ": `${token}` })
                } else {
                    res.send("wrong credentials")
                }
            });
        } else {
            res.send("login first")
        }
    } catch (error) {
        res.send("err while login")
    }
})

userRoutes.get("/jobs", async (req, res) => {
    let job = await JobModel.find()
    console.log(job)
    res.send(job)
})

userRoutes.post("/add", async (req, res) => {
    const { Company_name, Position, Contract, Location } = req.body
    let job = await JobModel({ Company_name, Position, Contract, Location })
    await job.save()
    res.send("job added success")
})

userRoutes.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const payload = req.body

    try {
        await JobModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send("job updated")
    } catch (error) {
        res.send("unable to update job", error)
    }
})

userRoutes.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        await JobModel.findByIdAndDelete({ "_id": id })
        res.send("job deleted")
    } catch (error) {
        res.send("unable to delete job", error)
    }
})

module.exports = { userRoutes }