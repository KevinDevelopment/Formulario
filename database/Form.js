const Sequelize = require("sequelize");
const connection = require("./database");

const Form = connection.define('formulario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_principal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_recado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sugestao: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Form.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso!")
}).catch((erro) => {
    console.log(`Desculpe, houve um erro ${erro}`)
});

module.exports = Form;