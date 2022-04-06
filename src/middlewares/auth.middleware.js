const jwt = require('jsonwebtoken')
const tokenSecret = "nossosecretJWT"

exports.createUserToken = async function(user){
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, tokenSecret)

    return token;
}

exports.checkToken = async function(req, res, next){
    try {
        const authHeader = req.headers.authorization;

        if(authHeader){
            const verified = jwt.verify(token, tokenSecret)
            req.user = verified
            next()
        } else {
            return res.status(401).send({ 
                success: false,
                message: 'Acesso negado! Você precisa estar logado para realizar alterações no usuário!'
            })
        }
    } catch (error) {
        consoleLog('CHECK-TOKEN', 'CATCH', 'Falha ao checar o token', error);

        return res.status(401).send({ 
            success: false,
            message: 'Acesso negado! Token inválido!'
        })
    }
}
