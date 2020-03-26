//imports and dependants
const express = require("express");
const handle = require("express-handlebars");
const routes = require("./controllers/burgers_controller");

//standard setup
const PORT = process.env.PORT || 8080;
const app = express();

//static the public directory
app.use(express.static("public"));

//parseing section
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup the handlebars
app.engine("handlebars", handle({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup route
app.use(routes);

//start the server
app.listen(PORT, function(){
    console.log("Listening on: http://localhost:", PORT);
});