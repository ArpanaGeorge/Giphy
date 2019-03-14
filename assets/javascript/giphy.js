$(document).ready(function()
{
 // Initial array of topics
 var topics = ["Flower", "Buterflies", "Waterfall", "rain","sunrise","mushrooms","birds"];

 renderButtons();
 // Function for displaying topic data
 function renderButtons() {
    $("#buttons-view").empty();
   // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
         // Then dynamicaly generating buttons for each topic in the array
         var a = $("<button>");
       // Adding a class
         a.addClass("topic");
        
         // Added a data-attribute
         a.attr("data-name", topics[i]);
        //  a.attr("class", "topic");
         // Provided the initial button text
         console.log("a="+$(".topic").text()+a+"class="+$(a).attr("class")+"dataname="+$(a).attr("data-name"));
         a.text(topics[i]);
         // Added the button to the HTML
         $("#buttons-view").append(a);
     }
   console.log(topics);
     console.log ($(".topic").text());
}

 // This function handles events where one button is clicked
 $("#topic-button").on("click", function(event) {
     event.preventDefault();
     // This line grabs the input from the textbox
     var addTopic = $("#topic-input").val().trim();
     // The movie from the textbox is then added to our array
     topics.push(addTopic);
     // Calling renderButtons which handles the processing of our movie array
     renderButtons();
 });
 
 $(".topic").on("click", function(event) {
     event.preventDefault();
     console.log ("inside"+$(".topic").text());
     console.log("testing");
     $("#gifs-appear-here").empty();
     var type = $(this).text();
     // Constructing a URL to search Giphy for the name of the person who said the quote
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     type + "&api_key=OhclWPbbusY71l9srKOCsWtgV7uFlQeC&limit=10";    
     // Performing our AJAX GET request
     $.ajax({
           url: queryURL,
           method: "GET"
    })
     .then(function(response) {
         // Storing an array of results in the topics variable
         var topicresult = response.data;
         console.log(response.data);
         // Looping over every result item
         for (var i = 0; i < topicresult.length; i++) {
             // Only taking action if the photo has an appropriate rating
             if (topicresult[i].rating !== "r" && topicresult[i].rating !== "pg-13") {
             // Creating a div for the gif
                 var gifDiv = $("<span>");
     
                 // Storing the result item's rating
                 var rating = topicresult[i].rating;
     
                 // Creating a paragraph tag with the result item's rating
                 var p = $("<span>").text("Rating: " + rating);
                 p.attr("class", "rate");
                 // Creating an image tag
                 var natureImage = $("<img>");
                 
                 // Giving the image tag an src attribute of a proprty pulled off the
                 // result item
                 natureImage.attr("src", topicresult[i].images.fixed_height_still.url);
                     
                 natureImage.attr("data-still", topicresult[i].images.fixed_height_still.url);
                 natureImage.attr("data-animate", topicresult[i].images.fixed_height.url);
                 natureImage.attr("class", "gif");
                 console.log("class"+natureImage.attr("class"));
                 natureImage.attr("data-state", "still");
                 // Appending the paragraph and natureImage to the "gifDiv" div
                gifDiv.append(p);
                // gifDiv.append("<br>");
                 gifDiv.append(natureImage);
                 
     
                 // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                 $("#gifs-appear-here").append(gifDiv);
             }
         }
         
     //   console.log("inside gif");
     $(".gif").on("click", function() {
         console.log("inside gif");
         // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
         var state = $(this).attr("data-state");
         // If the clicked image's state is still, update its src attribute to what its data-animate value is.
         // Then, set the image's data-state to animate
         // Else set src to the data-still value
         if (state === "still") {
             $(this).attr("src", $(this).attr("data-animate"));
             $(this).attr("data-state", "animate");
         } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
         }
     });

 });
});      
});   