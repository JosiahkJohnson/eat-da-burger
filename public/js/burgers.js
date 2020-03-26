//root function
$(function(){
    $(".change-state").on("click", function(event){
        //pull out the id and state of the button clicked
        const id = $(this).data("id");
        let state = $(this).data("state");

        //flip the state
        if(state){
            state = false;
        }
        else{
            state = true;
        }

        //create a new object to pass into the orm to determine the state
        const newState = {
            eaten: state
        };

        //the put request via ajax
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newState
        }).then(function(){
            console.log("Changed the eaten status to: ", state);
            
            //reload the page
            location.reload();
        });
    });

    //event listener for the form button at the bottom
    $(".create-form").on("submit", function(event){
        event.preventDefault();
        
        //decide the state
        let state = false;
        const checked = $("input:checked").val();
        if(checked === "yes"){
            state = true;
        }

        //create our new burger using information the user has provided on the screen
        //the name, and if the burger starts eaten
        const newBurger = {
            name: $("#burger").val(),
            eaten: state
        };

        console.log("new burger: ", newBurger);
        //call our post command
        $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("New burger created")

            //and reload the page
            location.reload();
        });
    });

    //finally, creating a delete function to the delete buttons
    $(".delete-burger").on("click", function(event){
        //set the id so we delete the right burger
        //not a best seller
        const id = $(this).data("id");
        console.log("Deleting burger: ", id);
        
        //use our delete path
        $.ajax("/api/burgers/" + id,{
            type: "DELETE"
        }).then(function(){
            console.log("Removed burger: " + id);

            //reload the page
            location.reload();
        });
    });
});