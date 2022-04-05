const jwt = require('jsonwebtoken')
const tokenSecret = "nossosecretJWT"

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, tokenSecret)

    res.status(200).json({
        message: "Você está autenticado",
        token: token    
    })
}



const getToken = (req) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    return token
        
}

module.exports = {
    createUserToken,
    getToken
}