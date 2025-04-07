const {register: Register } = require('../service/auth.service')

const register = async (req, res) => {

    const result = await Register(req.body)
    res.status(result.status).json(result.data)
}



module.exports = {register} // Export the register function