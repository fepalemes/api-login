//const User = require('../models/User')
const user = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtHelpers = require('../helpers/jwt.helpers')
const userHelpers = require('../helpers/user.helpers')


module.exports = class UserController {
    // ============ REGISTER ============
    static async register(req, res){

        let { name, cpf, email, password, confirmpassword, birthDate, phone, image} = req.body

        //await userHelpers.payloadValidator(res, email)
        await userHelpers.userRegisterValidator(res, name, cpf, email, password, confirmpassword )

        const payloadValidator = await userHelpers.payloadValidator(email)
        if(payloadValidator === true){
            return res.status(422).json({ message: 'O email ja possui cadastro!'})
        }

         // create a password
         const salt = await bcrypt.genSalt(12)
         password = await bcrypt.hash(password, salt)


         // create a new user
         try {
             const newUser = await user.create({name, cpf, email, password, birthDate, phone, image})
             await jwtHelpers.createUserToken(newUser, req, res)
         } catch(error){
             console.info(error)
             res.status(500).json({ message: error })
         }
    }


    // ============ LOGIN ============
    static async login(req, res){
        
        let { email, password } = req.body 
        await userHelpers.userLoginValidator(res, email, password)
        const salt = await bcrypt.genSalt(12)
        password = await bcrypt.hash(password, salt)


        

        const payloadValidator = await userHelpers.payloadValidator(email)
        if(payloadValidator === false){
            return res.status(422).json({ message: 'Não há usuário cadastrado com este e-mail'})
        }


        const checkPassword = await bcrypt.compare(password, password)
        if(!checkPassword){
            res.status(422).json({ message: 'Senha inválida!'})
            return
        }

        await jwtHelpers.createUserToken(user, req, res)
    }

    // ============ CHECK USER ============
    static async checkUser(req, res) {
        try{
            let currentUser = undefined

            if(req.headers.authorization){
                const token = jwtHelpers.getToken(req)
                const decoded = jwt.verify(token, 'nossosecretJWT')

                currentUser = await user.findByPk(decoded.id)
                currentUser.password = undefined

            }else{
                currentUser = null
            }

        res.status(200).send(currentUser)
        }catch(error){
            console.log(error)
        }
    }
}