const mysql = require('mysql');

const dbConfig = require("../config/dbConfig")


const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
})

connection.connect(error => {
    if (error) throw error
    console.log("Successfully created connection to database " + dbConfig.DB);
})

module.exports = connection