const { DataTypes } = require('sequelize');

const db = require('../database/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    birthDate: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    }
}) 

module.exports = User;