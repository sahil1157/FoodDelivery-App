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
            return res.status(400).json({ message: 'Email is already registered' });
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
        if (!findEmail) return res.status(400).json({ message: "Email is not Registered", valid: false })

        const findPassword = await bcrypt.compare(password, findEmail.password)
        if (!findPassword) return res.status(400).json({ message: "Invalid Password", valid: false })

        const accessToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '2d' }) //secret token...

        const refreshToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '3d' })

        res.cookie('AccessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true });
        res.cookie('RefreshToken', refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true });

        return res.json({ Login: true, accessToken, refreshToken })

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error, valid: false });
    }
};


const handleVerify = async (req, res, next) => {
    const getAccessToken = req.cookies.AccessToken
    const getRefreshToken = req.cookies.RefreshToken

    try {
        if (!getRefreshToken) {
            const deleteTokens = await handleLogout(req, res)
            if (deleteTokens) return
        }
        else if (!getAccessToken && !getRefreshToken) return res.status(400).json({ message: "No tokens found, please login again", valid: false })

        else if (!getAccessToken) {
            const getAccessToken = await handleRefreshToken(req, res)
            if (!getAccessToken) return false
            req.cookies.AccessToken = getAccessToken

            jwt.verify(getAccessToken, process.env.secretToken, (err, decoded) => {
                if (err) return res.status(400).json({ valid: false, message: "Tokens has been expired.." })
                req.email = decoded.email
                return next()
            })
        }
        else return res.status(200).json({ message: "Registered Successfully", valid: true })
    } catch (error) {

    }
}


// Refreshes token if expired
const handleRefreshToken = async (req, res, next) => {
    const getRefreshToken = req.cookies.RefreshToken
    try {

        if (!getRefreshToken) return res.status(401).json({ valid: false, message: "Refresh Token not found" })

        jwt.verify(getRefreshToken, process.env.secretToken, (err, decoded) => {
            if (err) return res.status(400).json({ valid: false, message: "Error Occured while fetching refresh Token" })
            const newAccessToken = jwt.sign({ email: decoded.email }, process.env.secretToken, { expiresIn: '2d' })
            res.cookie('AccessToken', newAccessToken, { httpOnly: true, sameSite: 'None', secure: true })
            return newAccessToken
        })
    }

    catch (error) {
        return res.status(400).json({ valid: false, message: "error", error })
    }
}


const handleLogout = (req, res) => {
    try {
        res.cookie('RefreshToken', '', {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(0)
        })
        res.cookie('AccessToken', '', {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(0)
        })
        return res.status(200).json({ valid: false, message: 'Logged out successfully' })
    } catch (error) {
        res.status(400).json({ valid: false, message: 'Logged out session failed' })
    }
}

// check for my users if they are valid acts as a middleware
const handleVerifyUsers = async (req, res, next) => {
    const getAccessToken = req.cookies.AccessToken
    const getRefreshToken = req.cookies.RefreshToken

    try {
        if (!getRefreshToken) {
            const deleteTokens = await handleLogout(req, res)
            if (deleteTokens) return
        }
        else if (!getAccessToken && !getRefreshToken) return res.status(400).json({ message: "No tokens found, please login again", valid: false })

        else if (!getAccessToken) {
            const getAccessToken = await handleRefreshToken(req, res)
            if (!getAccessToken) return false
            req.cookies.AccessToken = getAccessToken

            jwt.verify(getAccessToken, process.env.secretToken, (err, decoded) => {
                if (err) return res.status(400).json({ valid: false, message: "Tokens has been expired.." })
                req.email = decoded.email
                return next()
            })
        }
        else {
            // AccessToken exists, call next middleware
            jwt.verify(getAccessToken, process.env.secretToken, (err, decoded) => {
                if (err) return res.status(400).json({ valid: false, message: "Tokens have expired" });
                req.email = decoded.email; //setting the email inside req, so that we can get it into handleUserDetails
                return next();
            });
        }
    } catch (error) {

    }
}


// get the user details to show in profile section
const handleUserDetalis = async (req, res) => {
    try {
        const findEmail = await users.findOne({ email: req.email })
        if (!findEmail) return res.status(400).json({ valid: false, message: "User Details not found" })
        res.status(200).json({ message: "User found", valid: true, user: { firstName: findEmail.firstName, lastName: findEmail.lastName } })
    } catch (error) {
        res.status(400).json({ message: "error occured", valid: false, error })
    }
}

// edit user profile
const editUserProfile = async (req, res) => {
    const { firstname, lastname, password } = req.body
    const refreshToken = req.cookies.RefreshToken
    try {
        await jwt.verify(refreshToken, process.env.secretToken, (err, decode) => {
            if (err) res.status(400).json({ message: 'Token not found', err })
            req.email = decode.email
        })
        const getEmail = req.email
        const findEmail = await users.findOne({ email: getEmail })
        if (!findEmail) return res.status(400).json({ valid: false, message: "Counldn't find users" })
        const findPassword = await bcrypt.compare(password, findEmail.password)
        if (!findPassword) return res.status(400).json({ message: "Invalid Password, Please try again", valid: false })
        await users.findOneAndUpdate({ email: getEmail }, {
            $set: {
                firstName: firstname,
                lastName: lastname
            }
        })
        return res.status(200).json({ valid: true, message: "Profile updated successfully" })
    } catch (error) {
        res.status(400).json({ valid: false, message: "couldnot get values. error from server" })
    }
}

// find email and give to findEmail function
const findEmail = async (req, res) => {
    const refreshToken = req.cookies.RefreshToken
    if (!refreshToken) {
        const logout = await handleLogout()
        if (logout) return
    }
    try {
        await jwt.verify(refreshToken, process.env.secretToken, (err, decoded) => {
            if (err) return res.status(400).json({ valid: false, message: "Email not found" })
            req.email = decoded.email
            const getEmail = req.email
            return res.status(200).json({ valid: true, message: getEmail })
        })
    } catch (error) {
        res.status(400).json({ valid: false, message: "No cookies found" })
    }
}

// edit user password
const changePassword = async (req, res) => {
    const { email, oldpassword, newpassword } = req.body
    const getRefreshToken = req.cookies.RefreshToken
    try {
        if(newpassword === oldpassword) return res.status(400).json({valid:false,message:"your new password cannot be your old password"})
        // getting email from cookies i.e refreshtoken
        jwt.verify(getRefreshToken, process.env.secretToken, (err, decode) => {
            if (err) return res.status(400).json({ valid: false, message: 'Error occured' })
            req.email = decode.email
        })
        // got email
        const getEmail = req.email

        // comparing and fetching email
        const fetchEmailFromDb = await users.findOne({ email: getEmail })
        console.log(fetchEmailFromDb.email)

        if (!fetchEmailFromDb) return res.status(400).json({ valid: false, message: "Email not found" })
        if (fetchEmailFromDb.email !== email)
            return res.status(400).json({ message: 'Invalid Email', valid: false })

        // hasing password ..
        const findPassword = await bcrypt.compare(oldpassword, fetchEmailFromDb.password)
        if (!findPassword) return res.status(400).json({ valid: false, message: "Your old password is not valid, Please try again" })

            // updating newpassword into hasded one's using bcrypt
        const updateNewPassword = await bcrypt.hash(newpassword, 10)

        // saved hashed password to that user's old password..
        fetchEmailFromDb.password = updateNewPassword
        await fetchEmailFromDb.save()
        return res.status(200).json({ valid: true, message: "Password Updated Successfully" })

    } catch (error) {
        return res.status(400).json({ message: "Couldn't change your password, please try again later" })
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleVerify,
    handleLogout,
    handleRefreshToken,
    handleUserDetalis,
    handleVerifyUsers,
    editUserProfile,
    findEmail,
    changePassword
};

