const users = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


// User Signup Handler
const handleUserSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // for signup validation in frontend..
    let requiredFields = []
    if (!firstName) {
        requiredFields.push('firstName')
    }
    if (!lastName) {
        requiredFields.push('lastName')
    }
    if (!email) {
        requiredFields.push('email')
    }
    if (!password) {
        requiredFields.push('password')
    }

    if (requiredFields.length > 0) {
        res.status(400).send({ error: 'Please fill out all the fields', requiredFields })
    }

    try {

        const findEmail = await users.findOne({ email: email });
        if (findEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        } else {
            const hashedPas = await bcrypt.hash(password, 10);
            const newUser = await users.create({
                firstName,
                lastName,
                email,
                password: hashedPas
            });
            await newUser.save()
            res.status(200).json({ message: 'USer created successfullly' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};



// User Login Handler
const handleUserLogin = async (req, res) => {
    // getting all datas from frontend...
    const { email, password } = req.body;

    try {

        const findEmail = await users.findOne({ email: email })
        if (!findEmail) return res.status(400).json({ message: "Invalid Email or Password" })

        const findPassword = await bcrypt.compare(password, findEmail.password)
        if (!findPassword) return res.ststus(400).json({ message: "Invalid Email or Password" })

        const accessToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '15m' }) //secret token...

        const refreshToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '15d' })

        res.cookie('AccessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'Strict', secure: false });
        res.cookie('RefreshToken', refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict', secure: false });

        return res.json({ Login: true })

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

const handleVerify = async (req, res) => {
    const getToken = await req.cookies.RefreshToken
    try {
        if (!getToken) {
            res.status(400).json({ message: "No Token found" })
        }
        else {
            jwt.verify(getToken, process.env.secretToken, (err, decoded) => {
                if (err) {
                    return res.status(404).json({ message: "Invalid Token.." })
                }
                else {
                    req.email = decoded.email
                    const findValidEmail = users.findOne(decoded.email)
                    if(findValidEmail) return res.status(200).json({ valid: true, message: "Email has been found on db..", email: decoded.email, getToken })
                        return res.status(400).json({message:"Not a vaid user, please Login"})
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleVerify
};

