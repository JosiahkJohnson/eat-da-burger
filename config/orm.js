//importing connection
const connection = require("../config/connection");

//This function will create query ? marks to pass values into mysql
function questionMarks(num){
    const marks = [];

    for(let i = 0; i < num; i++){
        marks.push("?");
    }
    const result = marks.toString();
    
    return result;
}

//discecting keys out of objects for SQL syntex
function sqlLanguage(object){
    const query = [];

    //write 'key' = value for each key in the passed object
    for(let i = 0; i < object.length; i++){
        let value = object[i];

        //account for spaces in some string values
        if(typeof i === "string" && value.indexOf(" ") >= 0){
            //add our string marks
            value = "'" + value + "'";
        }

        //push in our resulting sql command
        query.push(i + "=" + value);
    }
}

//our object that will hold all of our mySql commands
const orm = {
    //this internal function will print out any info contained within the table passed into it
    selectAll: function(table, callback){
        //create the sql command with the table that we are going to search
        const query = "SELECT * FROM " + table + ";";

        //query the connection to the sql database
        connection.query(query, function(error, result){
            if(error) throw error;

            //use the passed in callback function to return the result
            console.log(result);
            callback(result);
        });
    },
    //function to create a new instance on a given table
    create: function(table, cols, values, callback){
        //selecting the table
        const query = "INSERT INTO " + table;

        //add the passed column paramaters
        query += " (" + cols.toString() + ") ";
        //add the values to the parameters
        query += "VALUES (" + questionMarks(values.length) + ") ";

        console.log(query);

        //query the server with the new data
        connection.query(query, function(error, result){
            if(error) throw error;

            //use our passed in callback
            console.log(result);
            callback(result);
        });
    },
    //update function mostly used for moving burgers to the eaten side when "devored"
    update: function(table, colObject, condition, callback){
        //setup the query by concatinating string together
        const query = "UPDATE " + table + " SET " + sqlLanguage(colObject) + " WHERE " + condition;

        console.log(query);
        connection.query(query, function(error, result){
            if(error) throw error;

            callback(result);
        });
    },
    //this delete function wont initailly be used, I might use it later if I have time
    delete: function(table, condition, callback){
        const string = "DELETE FROM " + table + " WHERE " + condition;

        console.log(string);
        connection.query(string, function(error, result){
            if(error) throw error;

            callback(result);
        });
    }
}

//export our orm object
module.exports = orm;