//const User = require('../models/User')
const user = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userHelpers = require('../helpers/user.helpers')
const { consoleLog, passwordCriptoHelper } = require('../helpers/functions')
const { createUserToken } = require('../middlewares/auth.middleware')
const tokenSecret = "nossosecretJWT"

module.exports = class UserController {
    // ============ REGISTER ============
    static async register(req, res) {
        try {

            // Instancia a requisição
            let params = req.body;

            // Verifica o payload - campos obrigatórios
            await userHelpers.userRegisterParamsValidator(res, params)

            // Verifica se e-mail passado já se encontra registrado
            const payloadValidator = await userHelpers.userRegisterValidator(params.email)

            // Se está registrado envia retorno
            if (payloadValidator === true) {
                return res.status(422).json({
                    success: false,
                    message: 'O email ja possui cadastro!'
                })
            }

            // Cria senha criptografada em base da senha comum
            let newPassword = await passwordCriptoHelper(params.password);

            // Cadastra usuário
            const newUser = await user.create({
                name: params.name,
                cpf: params.cpf,
                email: params.email,
                password: newPassword,
                birthDate: params.birthDate,
                phone: params.phone,
                image: params.image
            });

            // Cria token JWT para o novo usuário
            let token = await createUserToken(newUser)

            // Retorno 
            res.status(201)({
                success: true,
                message: 'Usuário criado com sucesso',
                result: token
            })

        } catch (error) {

            consoleLog('USER-REGISTER', 'CATCH', 'Falha ao criar o usuario', error);

            res.status(500).json({
                success: false,
                message: 'Falha ao criar o usuário',
                result: error
            })
        }
    }


    // ============ LOGIN ============
    static async login(req, res) {

        // Instancia requisição
        let params = req.body;

        // Faz validação do payload
        await userHelpers.userLoginParamsValidator(res, params)

        // Verifica se usuário está cadastrado na base
        const verificaUsuario = await userHelpers.userRegisterValidator(params.email)

        if (verificaUsuario === false) {
            return res.status(422).json({
                success: false,
                message: 'Não há usuário cadastrado com este e-mail'
            })
        }

        // Criptografa a senha passada
        let passwordCripto = await passwordCriptoHelper(params.password);

        // Valida se a senha criptografada é a mesma que está no banco para o usuário
        let verificaSenhaBD = await userHelpers.userLoginValidator(params, passwordCripto)

        if (verificaSenhaBD) {
            // Verifica se senha descriptografada é a mesma do retorno do bcrypt
            // ????
            const checkPassword = await bcrypt.compare(passwordCripto, params.password)

            if (!checkPassword) {
                return res.status(422).send({
                    success: false,
                    message: 'Senha inválida!'
                })

            } else {
                await createUserToken(user)
            }
        } else {
            return res.status(401).send({
                success: false,
                message: 'Não autorizado'
            })
        }
    }

    // ============ CHECK USER ============
    static async checkUser(req, res) {
        try {

            // Instancia cabeçalho auth
            let auth = req.headers.authorization;

            // Decode do token enviado
            const decoded = jwt.verify(auth, tokenSecret)

            // Com o token decodificado, realiza pesquisa no DB
            let currentUser = await user.findByPk(decoded.id);

            // Se for maior que 0 retorna os dados do usuário
            if (currentUser.lenght > 0) {
                currentUser.password = undefined
                res.status(200).send({
                    success: true,
                    message: 'Usuário encontrado',
                    result: currentUser
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Nenhum usuário encontrado',
                    result: []
                })
            }
        } catch (error) {
            consoleLog('CHECK-USER', 'CATCH', 'Falha ao validar o usuario', error);

            res.status(500).send({
                success: false,
                message: 'Falha ao validar o usuário',
                result: error
            })
        }
    }

    // ============ SEARCH USER BY ID ============
    static async getUserById(req, res) {
        try {
            // Instancia parametro 
            const id = req.params.id

            // Realiza busca no DB
            let wantedUser = await user.findByPk(id)

            // Se retorno for maior que 0 retorna resultado
            if (wantedUser.lenght > 0) {
                wantedUser.password = undefined

                return res.status(200).send({
                    success: true,
                    message: 'Usuário encontrado',
                    result: wantedUser
                })

            } else {
                return res.status(404).json({
                    success: true,
                    message: 'Usuário não encontrado!',
                    result: []
                })
            }
        } catch (error) {
            consoleLog('GET-USER-BT-ID', 'CATCH', 'Falha ao capturar o usuario', error);

            res.status(500).send({
                success: false,
                message: 'Falha ao capturar o usuário',
                result: error
            })
        }
    }

    // ============ EDIT USER BY ID ============
    static async editUser(req, res) {
        const id = req.params.id

        let { name, cpf, email, password, confirmpassword, birthDate, phone } = req.body
        let image = ''

        //await userHelpers.payloadValidator(res, email)
        await userHelpers.userEditValidator(res, name, cpf, email, password, confirmpassword)

        const user = await user.findByPk(id)

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
        }
        return
    }
}