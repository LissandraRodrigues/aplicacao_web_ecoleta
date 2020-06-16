// Autora: Luiza Lissandra R. Rosa
// 15/06/2020 

// Cria o Banco de Dados utilizado na aplicação.

// Importar a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Criar um objeto do Bando de Dados.
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {

    // // Cria o Banco de Dados com a tabela places. 
    db.run(`

        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT  

        );

    `)

})
