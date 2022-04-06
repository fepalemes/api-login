const user = require('../models/User')

// Func de validação de payload para registro
exports.userRegisterParamsValidator = async function (res, params) {
    try {
        if (!params.name) {
            return res.status(422).json({ message: 'O nome é obrigatório' })
        }
        if (!params.cpf) {
            return res.status(422).json({ message: 'O cpf é obrigatório' })
        }
        if (!params.email) {
            return res.status(422).json({ message: 'O email é obrigatório' })
        }
        if (!params.password) {
            return res.status(422).json({ message: 'A senha é obrigatória' })
        }
        if (!params.confirmpassword) {
            return res.status(422).json({ message: 'A confirmação de senha é obrigatória' })
        }
        if (params.password !== params.confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' })
        }
    } catch (error) {
        console.log(error);
    }
}

// Func para busca no BD se o usuário está registrado
exports.userRegisterValidator = async function (email) {
    try {
        const userExists = await user.findAll({ raw: true, where: { email: email } })

        console.log(email)
        if (userExists.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('payloadValidator' + error);
    }
}

// Func de validação de payload para login
exports.userLoginParamsValidator = async function (res, params) {
    try {
        if (!params.email) {
            return res.status(422).json({ message: 'O email é obrigatório' })
        }

        if (!params.password) {
            return res.status(422).json({ message: 'A senha é obrigatória' })
        }

    } catch (error) {

    }
}

// Func para validar usuário e senha passada no login
exports.userLoginValidator = async function (params, passwordCripto) {
    try {
        const userExists = await user.findAll({
            raw: true, where: {
                email: params.email,
                password: passwordCripto
            }
        })

        if (userExists.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('payloadValidator' + error);
    }
}

exports.userEditValidator = async function (res, name, cpf, email, password, confirmpassword) {
    try {
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório' })
        }
        if (!cpf) {
            return res.status(422).json({ message: 'O cpf é obrigatório' })
        }
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório' })
        }

        const userExists = await user.findOne({ email: email })
        if (user.email)

            if (!password) {
                return res.status(422).json({ message: 'A senha é obrigatória' })
            }
        if (!confirmpassword) {
            return res.status(422).json({ message: 'A confirmação de senha é obrigatória' })
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' })
        }
    } catch (error) {
        console.log(error);
    }
}