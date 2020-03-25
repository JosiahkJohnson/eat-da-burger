//importing the ORM written in another file
const orm = require("../config/orm");

const burger =  {
    //the select all function
    all: function (callback){
        orm.selectAll("burgers", function(result){
            callback(result);
        });
    },
    //create another burger function
    create: function(cols, values, callback){
        orm.create("burgers", cols, values, function(result){
            callback(result);
        });
    },
    //update function, moving a burger to the devoured side of the screen
    //and updating their status in the database
    update: function(colValues, condition, callback){
        orm.update("burgers", colValues, condition, function(result){
            callback(result);
        });
    },
    //delete function to remove from the database completely (may not be used)
    delete: function(condition, callback){
        orm.delete("burgers", condition, function(result){
            callback(result);
        });
    }
};

//export our burger module
module.exports = burger;