const service = require('../service/auth.service')

const register = async (req, res) => {

    const result = await service.register(req.body)

    res.status(result.status).json({...result})
}

const activation = async (req, res) => {

    const result = await service.Activate(req.body)

    res.status(result.status).json({...result})
}

const login = async (req, res) => {

    const result = await service.login(req.body)

    res.status(result.status).json({...result})
}


module.exports = {register, activation, login} // Export the register function