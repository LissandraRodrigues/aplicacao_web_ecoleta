// Autora: Luiza Lissandra R. Rosa
// 15/06/2020 

// Servidor do projeto.

// TERMINAL $ npm start -> Inicia o servidor. 
// http://localhost:3000/

const express = require("express")

// Cria o servidor.
const server = express()

// Pegar o Banco de Dados.
const db = require("./database/db.js")

// Configurar pasta pública.
server.use(express.static("public"))

// Habilitar o uso do request.body
server.use(express.urlencoded({extended: true}))

// Utilizando Template Engine.
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {

    express: server,

    noCache: true

})

// Página Inicial. 
server.get("/", (request, answer) => {

    return answer.render("index.html")

})

// Página de Criação de Pontos de Coleta.
server.get("/create-point", (request, answer) => {

    return answer.render("create-point.html")

})

// Página de Quem somos.
server.get("/who", (request, answer) => {

    return answer.render("who.html")

})

// Página de Contribuir.
server.get("/contribution", (request, answer) => {

    return answer.render("contribution.html")

})

// Armazenamento de Pontos de Coleta no Banco de Dados.
server.post("/save-point", (request, answer) => {

    // Inserir dados no BD.
    const query = `
    
        INSERT INTO places (

            image,
            name,
            address,
            address2,
            state,
            city,
            items

        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [

        request.body.image,
        request.body.name,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.items

    ]

    function afterInsertData(err) {

        if (err) {

            return answer.render("create-point.html", {notSaved: true})

        }

        return answer.render("create-point.html", {saved: true})

    }

    db.run(query, values, afterInsertData)

})

// Página de Visualização dos Pontos de Coleta.
server.get("/search-results", (request, answer) => {

    const search = request.query.search

    // Pega os dados do Banco de Dados.
    db.all(`SELECT * FROM places WHERE state LIKE '%${search}%'`, function(err, rows){

        if (err) {

            return console.log(err)

        }

        const total = rows.length
  
        // Exibir dados do Banco de Dados no HTML.
        return answer.render("search-results.html", {places: rows, total})

    })

})

// Liga o Servidor.
server.listen(3000) // Porta 3000.



