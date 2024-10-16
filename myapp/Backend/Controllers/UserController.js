const users = require('../Model/User.js');
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



// User Login Handler....
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email: email });
        if (!user) {
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const accessToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '2d' });
        const refreshToken = jwt.sign({ email: email }, process.env.secretToken, { expiresIn: '6d' });

        res.cookie("AccessToken", accessToken, { httpOnly: true, sameSite: "None", secure: true, partitioned: true });
        res.cookie("RefreshToken", refreshToken, { httpOnly: true, sameSite: "None", secure: true, partitioned: true });

        return res.json({ Login: true, accessToken, refreshToken, role: user.role });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};




const handleVerify = async (req, res, next) => {
    // Getting access and refresh tokens from cookies
    const getAccessToken = req.cookies.AccessToken;
    const getRefreshToken = req.cookies.RefreshToken;

    try {
        // If no refresh token is found, log the user out
        if (!getRefreshToken) {
            const deleteTokens = await handleLogout(req, res);
            if (deleteTokens) return;
        }

        // If neither token is found, prompt user to log in again
        if (!getAccessToken && !getRefreshToken) {
            return res.status(400).json({ message: "No tokens found, please login again", valid: false });
        }

        // If access token is missing but refresh token exists, refresh the access token
        if (!getAccessToken) {
            const newAccessToken = await handleRefreshToken(req, res);
            if (!newAccessToken) {
                return res.status(400).json({ message: "Failed to refresh access token", valid: false });
            }

            // Update the cookie with the new access token
            req.cookies.AccessToken = newAccessToken;

            // Verify the new access token and extract the email
            jwt.verify(newAccessToken, process.env.secretToken, (err, decoded) => {
                if (err) {
                    return res.status(400).json({ valid: false, message: "Token has expired" });
                }

                req.email = decoded.email; // Store the decoded email in the request
                return next(); // Proceed to the next middleware
            });
        } else {
            // If access token exists, verify it
            jwt.verify(getAccessToken, process.env.secretToken, async (err, decoded) => {
                if (err) {
                    return res.status(400).json({ valid: false, message: "Token has expired" });
                }

                const { email } = decoded;
                req.email = email; // Store decoded email in the request

                try {
                    // Fetch the user by email
                    const currentUser = await users.findOne({ email: email });

                    if (!currentUser) {
                        return res.status(404).json({ message: "User not found", valid: false });
                    }

                    // Return only the user's role in the response
                    return res.status(200).json({
                        valid: true,
                        data: currentUser

                    });
                } catch (dbError) {
                    return res.status(500).json({ message: 'Error fetching user data', error: dbError.message });
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying user', error: error.message });
    }
};





// check role


// check if admin or not...
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Admin")
        next()
    else {
        return res.status(403).json({ message: 'Forbidden: You do not have admin access', valid: false, role: "User" });
    }
}



// Refreshes token if expired. This funtion will be called incase the RefreshToken is expired.
const handleRefreshToken = async (req, res, next) => {
    const getRefreshToken = req.cookies.RefreshToken
    try {

        if (!getRefreshToken) return res.status(401).json({ valid: false, message: "Refresh Token not found" })

        jwt.verify(getRefreshToken, process.env.secretToken, (err, decoded) => {
            if (err) return res.status(400).json({ valid: false, message: "Error Occured while fetching refresh Token" })
            const newAccessToken = jwt.sign({ email: decoded.email }, process.env.secretToken, { expiresIn: '2d' },)
            res.cookie('AccessToken', newAccessToken, { httpOnly: true, sameSite: "None", secure: true, partitioned: true })
            return newAccessToken
        })
    }

    catch (error) {
        return res.status(400).json({ valid: false, message: "error", error })
    }
}


const handleLogout = (req, res) => {
    // loggin out by clearing all the caches and datas inside cookies...
    try {
        res.cookie('RefreshToken', '', {
            httpOnly: true,
            sameSite: "None",
            expires: new Date(0),
            secure: true,
            partitioned: true
        })
        res.cookie('AccessToken', '', {
            httpOnly: true,
            sameSite: "None",
            expires: new Date(0),
            secure: true,
            partitioned: true
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
        // if no refreshToken then the user is not valid or the time of logging in is expired, so need to login again.
        if (!getRefreshToken) {
            const deleteTokens = await handleLogout(req, res)
            if (deleteTokens) return
        }
        else if (!getAccessToken && !getRefreshToken) return res.status(400).json({ message: "No tokens found, please login again", valid: false })

        // if no access Token then handleFrefreshToken functn will be called and will assign a new accesstokwn
        else if (!getAccessToken) {
            const getAccessToken = await handleRefreshToken(req, res)
            if (!getAccessToken) return false
            req.cookies.AccessToken = getAccessToken

            jwt.verify(getAccessToken, process.env.secretToken, (err, decoded) => {
                if (err) return res.status(400).json({ valid: false, message: "Tokens has been expired.." })
                req.email = decoded.email
                req.role = decoded.role
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
    // getting user details to chage except password
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
    // finding email with the use of jwt, which will decode cookies and will give back the email that was assigned during formation of cookies (Payload)...
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
            return res.status(200).json({ valid: true, message: 'email found', email: getEmail })
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
        if (newpassword === oldpassword) return res.status(400).json({ valid: false, message: "your new password cannot be your old password" })
        // getting email from cookies i.e refreshtoken
        jwt.verify(getRefreshToken, process.env.secretToken, (err, decode) => {
            if (err) return res.status(400).json({ valid: false, message: 'Error occured' })
            req.email = decode.email
        })
        // got email
        const getEmail = req.email

        // comparing and fetching email
        const fetchEmailFromDb = await users.findOne({ email: getEmail })

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


const allUsers = async (req, res) => {
    try {
        const getAllUsers = await users.find().sort({ name: 1 })
        if (getAllUsers) return res.status(200).json({ message: getAllUsers })
    } catch (error) {
        console.log(error)
    }
}


// promote as Admin

const PromoteToAdmin = async (req, res) => {
    const { id } = req.body
    try {
        const result = await users.findOneAndUpdate(
            { _id: id },
            { $set: { role: "Admin" } },
            { new: true }
        );
        return res.status(200).json({ valid: true, message: "Promoted to Admin", data: result })
    } catch (error) {
        console.log("Error occured", error)
        res.status(404).json({ valid: false })
    }
}


//demote to User

const demoteToUser = async (req, res) => {
    const { id } = req.body
    try {
        const result = await users.findOneAndUpdate(
            { _id: id },
            { $set: { role: "User" } },
            { new: true }
        )
        return res.status(200).json({ valid: true, message: "Demoted to User", data: result })
    } catch (error) {
        return res.status(404).json({ valid: false, message: res })
    }
}

module.exports = {
    // checkLoggedIn,
    handleUserSignup,
    handleUserLogin,
    handleVerify,
    handleLogout,
    handleRefreshToken,
    handleUserDetalis,
    handleVerifyUsers,
    editUserProfile,
    findEmail,
    changePassword,
    isAdmin,
    allUsers,
    PromoteToAdmin,
    demoteToUser
};

