//setup the mysql connection
const mysql = require("mysql");
var connection;

//connection specs
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
    connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
    });
}


//make the connection
connection.connect(function(error){
    if(error) throw error;

    console.log("Connected as ID: ", connection.threadId);
})

//export the module
module.exports = connection;