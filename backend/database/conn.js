const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('api_login', 'root', '',{
    host: 'localhost', //'192.168.15.200',
    dialect: 'mysql'
})

// try {
//     sequelize.authenticate();
//     console.log('Conectamos com sucesso com o Sequelize');
// } catch(err) {
//     console.log('Não foi possível conectar: ', error)
// }

module.exports = sequelize; 