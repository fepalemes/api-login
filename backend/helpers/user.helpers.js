const user = require('../models/User')


async function userRegisterValidator(res, name, cpf, email, password, confirmpassword){
    try{
        if(!name){
            return res.status(422).json({ message: 'O nome é obrigatório'})
        }
        if(!cpf){
            return res.status(422).json({ message: 'O cpf é obrigatório'})
        }
        if(!email){
            return res.status(422).json({ message: 'O email é obrigatório'})
        }
        if(!password){
            return res.status(422).json({ message: 'A senha é obrigatória'})
        }
        if(!confirmpassword){
            return res.status(422).json({ message: 'A confirmação de senha é obrigatória'})
        }
        if(password !== confirmpassword){
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!'})
        }


    } catch(error){
        console.log(error);
    }
}

async function payloadValidator(email){
    try{
        const userExists = await user.findAll({ raw: true, where: {email: email}})

        console.log(email)
        if(userExists.length > 0){
            // return res.status(422).json({ message: 'O email informado já está cadastrado'})
            return true;
        }else {
            return false;
        }
    }catch(error){
        console.log('payloadValidator' + error);
    }
}

async function userLoginValidator(res, email, password){
    try{
        if(!email){
            return res.status(422).json({ message: 'O email é obrigatório'})
        }
        if(!password){
            return res.status(422).json({ message: 'A senha é obrigatória'})
        }

    }catch(error){

    }
}



async function userEditValidator(res, name, cpf, email, password, confirmpassword){
    try{
        if(!name){
            return res.status(422).json({ message: 'O nome é obrigatório'})
        }
        if(!cpf){
            return res.status(422).json({ message: 'O cpf é obrigatório'})
        }
        if(!email){
            return res.status(422).json({ message: 'O email é obrigatório'})
        }

        const userExists = await user.findOne({email: email})
        if (user.email )

        if(!password){
            return res.status(422).json({ message: 'A senha é obrigatória'})
        }
        if(!confirmpassword){
            return res.status(422).json({ message: 'A confirmação de senha é obrigatória'})
        }
        if(password !== confirmpassword){
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!'})
        }


    } catch(error){
        console.log(error);
    }
}


module.exports = {
    userRegisterValidator,
    payloadValidator,
    userLoginValidator,
    userEditValidator 
}