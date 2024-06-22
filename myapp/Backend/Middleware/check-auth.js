// const jwt = require('jsonwebtoken')
// const handleRefreshToken = require('../Controllers/UserController.js')

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization
//         if (!token) return res.status(401).json({ valid: false, message: "Undefined token" })

//         if (token) {
//             const validToken = req.headers.authorization.split(" ")[1]
//             console.log(validToken)
//             jwt.verify(token, process.env.secretToken, (err, decoded) => {
//                 if (err.name === 'TokenExpiredError') {
//                     if (handleRefreshToken()) {
//                         next()
//                     }
//                 }
//                 console.log(decoded)
//                 req.user = decoded
//                 next()
//             })
//         }
//         else {
//             return res.status(401).json({ valid: false, message: "token not found." })
//         }
//     } catch (error) {
//         return res.status(400).json({ valid: false, message: error.message })
//     }
// }