var lat;
var long;
var cities;

var localStorageCont = JSON.parse(localStorage.getItem("city_list"));
if (localStorageCont === null) {
    cities = [];
}
else {
    cities = localStorageCont
    city = cities[cities.length-1];
    displayCityWeather(city);
}

function displayCityWeather(city) {
    $("#show_city").text(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=69712313de0b3188381f1b726de5c5a9";

        $ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var date = moment.unix(response.dt).format("MM/DD/YYYY");
            $("#show_city").text(city + " (" + date + ")");

            var temperature = ((response.main.temp - 273.15)*(9/5) + 32).toFixed(1);
            $("#temp_val").text(temperature + " °F");
            var wind_speed = response.wind.speed;
            $("#wind_val").text(wind_speed + " MPH");

            var iconcode = response.weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
            let locationIcon = $('.weather-icon');
            $('locationIcon').attr('src', iconurl);

            var iconImage = $('<img><img/>');
            iconImage.attr('src', "icons/" +iconcode+ ".png");
            $(".weather-icon").empty();
            $(".weather-icon").append(iconImage);

            lat = parseInt(response.coord.lat);
            long = parseInt(response.coord.lon);
            displayCityWeatherWithLatLong(let,long);

        });
    }

    function displayCityWeatherWithLatLong(lat,long) {
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat+ "&lon=" + long + "&appid=69712313de0b3188381f1b726de5c5a9";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        console.log(response);
        
        var humidity = response.current.humidity;
        $("#humid_val").text(humidity + " %");
        var uvi = response.current.uvi;
        $("#uv_val").text(uvi);

        if (Number(uvi) <= 2){
            $("#uv_val").css('background-color', 'green');
        }
        else if (Number(uvi) <= 5&Number(uvi) > 2){
            $("#uv_val").css('background-color', 'orange');
        }
        else if (Number(uvi) <= 7&Number(uvi) > 5){
            $("uv_val").css('background-color', 'red');
        }

        var forecast = response.daily;
        renderForecast(forecast);
        });
    }

    

}