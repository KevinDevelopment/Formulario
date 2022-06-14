const express = require("express");
const app = express();
const connection = require("./database/database");
const model = require("./database/Form");

//autenticação banco de dados 
connection.authenticate().then(() => {
    console.log("Conexão estabelecida com sucesso!")
}).catch((erro) => {
    console.log(`Desculpe, houve um erro ${erro}`)
});

//configurações
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



//formulario
app.get("/formulario", (request, response) => {
    response.render("formulario")
});

//rota que retorna os dados do banco 
app.get("/index", (request, response) => {

    model.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then((formulario) => {
        response.render("index", {
            formulario: formulario
        })
    })

});

//retornando do banco pelo ID
app.get("/detalhes/:id", (request, response) => {
    const { id } = request.params
    model.findOne({
        where: {
            id: id
        }
    }).then((formulario) => {
        if (formulario != undefined) {
            response.render("detalhes")
        }
        else {
            response.redirect("/formulario")
        }
    })
    
});

//rota para inserir no banco de dados
app.post("/insert", (request, response) => {
    const { nome, email, cep, logradouro, numero, complemento, bairro,
        cidade, estado, telefone_principal, telefone_recado, sugestao } = request.body

    model.create({

        nome: nome,
        email: email,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        telefone_principal: telefone_principal,
        telefone_recado: telefone_recado,
        sugestao: sugestao

    }).then(() => {
        console.log("Dados cadastrados com sucesso")
    }).catch((erro) => {
        console.log(`Desculpe, houve um erro ${erro}`)
    });

    response.redirect("/index")
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});