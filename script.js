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
        })
    }
}