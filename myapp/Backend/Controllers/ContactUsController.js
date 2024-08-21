const contactModel = require("../Model/ContactModel.js")

const handleContact = async (req, res, next) => {
    try {
        const { firstname, lastname, email, message } = req.body

        if (firstname && lastname && email && message) {
            const saveInfo = new contactModel({
                firstname,
                lastname,
                email,
                message
            })

            await saveInfo.save()
            res.status(200).json({ success: true })
        }
        else return res.status(404).json({ success: false })
    } catch (error) {
        next(error)
    }
}

module.exports = handleContact