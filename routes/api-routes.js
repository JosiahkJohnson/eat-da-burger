//get Dependencies
const Burger = require("../model/burger");

//now to setup our routes
module.exports = function(app){
    app.get("/api/burgers", function(req, res){
        Burger.findAll({
            where: {
                eaten: false
            }
        }).then(function(results){
            res.json(results);
        });
    });

    app.get("/api/burgers-eaten", function(req, res){
        Burger.findAll({
            where: {
                eaten: true
            }
        }).then(function(results){
            res.json(results);
        });
    });
}