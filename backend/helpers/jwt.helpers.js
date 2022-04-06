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



const checkToken = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(401).json({ message: 'Acesso negado! Você precisa estar logado para realizar alterações no usuário!'})
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({ message: 'Acesso negado! Você precisa estar logado para realizar alterações no usuário!'})
    }

    try{
        const verified = jwt.verify(token, tokenSecret)
        req.user = verified
        next()

    }catch(error){
        return res.status(401).json({ message: 'Acesso negado! Token inválido!'})
    }

}



module.exports = {
    createUserToken,
    getToken,
    checkToken
}