const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv");
dotenv.config();
const KEY = process.env.KEY
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')


var jwt = require('jsonwebtoken');

//creating user
router.post('/createuser',

    [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid Email').isEmail(), body('password', 'password length should be minimum 5').isLength({ min: 5 })],

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "sorry this email already exists" });
            }

            //securing password by adding salt

            const salt = await bcrypt.genSalt(10);
            const securepass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securepass,
                avatar: req.body.avatar
            })
            // .catch((err) => {
            //     console.log(err)
            //     res.json({ error: 'please enter a unique email', message: err.message })
            // })

            //generating token
            console.log("all saved")
            const data = {
                user: {
                    id: user.id
                }
            }
            console.log("2 saved")
            const token = jwt.sign(data, KEY);
            console.log("3 saved")
            success = true;
            // res.json({ user })
            res.json({ success, user, token })
            console.log("4 saved")
        }
        catch (error) {
            console.log(error);
            res.status(500).send("some error occured")
        }
    })

//authicating login

router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'password cannot be blank').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, KEY);
        success = true;
        res.json({ success, user, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("some error occured")
    }
})

//get user details after login

router.post('/getuser', fetchuser, async (req, res) => {

    try {

        const userid = req.user.id
        console.log(userid)
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured");
    }


})

router.put('/updateuser/:id', fetchuser, async (req, res) => {
    const { name, email, avatar } = req.body
    const newuser = {}
    try {
        let success = false
        let user = await User.findOne({ email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email " });
        }
        if (name) { newuser.name = name }
        if (email) {
            newuser.email = email


        }
        if (avatar) { newuser.avatar = avatar }

        user = await User.findByIdAndUpdate(req.params.id, { $set: newuser }, { new: true })
        success = true
        res.json({ user, success })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }
})

//update password
router.put('/resetpassword/:id', fetchuser, async (req, res) => {
    const { oldpassword, newpassword, conformpassword, password } = req.body
    let success = false;
    try {
        if (newpassword !== conformpassword) {
            return res.status(400).json({ success, error: "password does not match" });
        }
        const pass = await bcrypt.compare(oldpassword, password);
        if (!pass) {
            success = false;
            return res.status(400).json({ success, error: "incorrect password" });
        }


        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(newpassword, salt);


        let user = await User.findByIdAndUpdate(req.params.id, { $set: { password: securepass } }, { new: true })
        success = true;
        res.json({ success })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }
})
module.exports = router;


