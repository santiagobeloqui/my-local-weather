let latitude;
let longitude;
let urlWeather;
let urlCity;
let apiKey = 'AIzaSyAwec5Wpe0E7khHmvaG680DOCX7iKsVvdo';
let temperature = document.getElementById("temperature");
let main = document.getElementById("main");
let icon = document.getElementById("icon");
let city = document.getElementById("city");

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        urlWeather = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;
        urlCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude +','+longitude + '&key=' + apiKey;
        getCity();
        weather();
    });
}

function weather(){
    fetch(urlWeather).then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error('Request failed');
    }, networkError => console.log(networkError, message)
    ).then(jsonResponse =>{
        temperature.textContent = jsonResponse.main.temp + "°C";
        let measurementUnit = "celsius";
        main.textContent = jsonResponse.weather[0].description.toUpperCase();
        icon.setAttribute("src", jsonResponse.weather[0].icon);
        button.addEventListener("click",()=>{
            if(measurementUnit == "celsius"){
                temperature.textContent = (jsonResponse.main.temp * 1.8 + 32) + "°F";
                measurementUnit = "farenheit";
            } else{
                temperature.textContent = jsonResponse.main.temp + "°C";
                measurementUnit = "celsius";
            }
            
        });
    });
}

function getCity(){
    fetch(urlCity).then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error('Request failed');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse =>{
        city.textContent = jsonResponse.results[0].formatted_address;
    }); 
}






