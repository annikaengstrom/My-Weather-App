$("document").ready(function() {

var getWeather = function(coordinates) {
    $.ajax({
        url: (`https://api.darksky.net/forecast/7d4a82d04b77180c233aed34692e1f2a/${coordinates.lat}, ${coordinates.lng}`),
        jsonp: "callback",
        dataType: "jsonp",
        
        success: function( response ) {
            console.log("My Weather Data", response );
            generateIcon(response.currently)
            $(".tempnow").text(response.currently.temperature)
            $(".summarynow").text(response.currently.summary)
            
            appendDays(response.daily.data)
            
        }
    });
}

function generateIcon(currently) {
    var iconElement = $(".iconnow")
    if(currently.icon === "rain") {
        iconElement.attr("src", "css/weathericons/rainicon.png")
    } else if (currently.icon === "partly-cloudy-day") {
        iconElement.attr("src", "css/weathericons/partlysunnyicon.png")
    }
}

var getLocation = function(location) {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCyYdryPOWd6hAIPalfuCym6C5Kl4S-fas`,
        success: function(response) {
            console.log("My Location Data", response );
            getWeather(response.results[0].geometry.location)
        }
    })
}

getLocation('London')

console.log("ready!")

 $(".searchform").keypress(function(event) {
    
     if(event.which == 13) {
         console.log('You pressed enter!');
         var locationValue = $('.searchform').val()
         getLocation(locationValue);
     };

 });

console.log("ready!");



 function appendDays(days) {
    $('.days-of-the-week').empty()
   days.forEach(function(dailyweather) {
     var dayElement = `
       <div class="day">
             <div class="temperature">
                 <p> ${dailyweather.temperatureMax} </p>
             </div>
             <div class="rainfall">
                 <p> ${dailyweather.precipProbability} </p>
                 </div>
                 <div class = "bottombox">
                 </div>
             </div>
         </div>
     `
     $('.days-of-the-week').append(dayElement)
   })
   
 }

console.log("ready!");


}) // THIS IS THE END OF THE .ready