const express = require('express');
const mysql2 = require('mysql2');

const db_con = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const db_con = mysql2.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'root',
//     database: 'node_db'
// });

db_con.connect((err) => {
    if (err) {
        return console.error(err.message);
    } 
});

module.exports = db_con;