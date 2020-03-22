//setup the mysql connection
const mysql = require("mysql");

//connection specs
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
});

//make the connection
connection.connect(function(error){
    if(error) throw error;

    console.log("Connected as ID: ", connection.threadId);
})

//export the module
module.exports = connection;