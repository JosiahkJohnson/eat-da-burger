//imports
const express = require("express");
const burger = require("../model/burger");

//declare the router
const router = express.Router();

//setup the newly declared router's routes
//the first one is the default route that will display all of the burgers to the screen
router.get("/", function(req, res){
    burger.all(function(data){
        const pageData = {
            burgers: data
        };
        console.log(pageData);
        res.render("index", pageData);
    });
});

//the next one is a post, that will create another burger to put onto the screen
router.post("/api/burgers", function(req, res){
    burger.create([
        //first we need an array housing our key names
        "name", "eaten"
    ],
    [
        //our collected data from the page
        req.body.name, req.body.eaten
    ], function(result){
        res.json({ id: result.insertId });
    });
});

//.put, used to update a condition of a burger on the page
//used to move burgers to the eaten, or divoured, side of the page
router.put("/api/burgers/:id", function(req, res){
    //get the id from the route above
    const condition = "id = " + req.params.id;

    console.log("condition: " + condition);

    burger.update({
        eaten: req.body.eaten
    },
    condition,
    function (result){
        if(result.changedRows == 0){
            //send an error if the rows were not changed
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

//the delete route to remove burgers
router.delete("/api/burgers/:id", function(req, res){
    const condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
            //same as before, the burger must be found
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

//export the router now that it's finished
module.exports = router;