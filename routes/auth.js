const router  =  require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")

// REGISTER FUNCTION
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save()
        // res.status(200).send({
        //     message: 'okey'
        // })
        res.status(201).json(savedUser)
        // console.log(savedUser);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err)
    }
});

// LOGIN FUNCTION
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({ username:req.body.username});

        const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;