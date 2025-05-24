var searchButton = document.getElementById("searchButton");


var countryWeather=[];
const apiKey = "582db1101f944bb3b34155410251804";
const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3&q=`;
// const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&Current&days=3&q=cairo`;




async function fetchCountries(city='london') {


    // const countries = await fetch(`http://api.weatherapi.com/v1/search.json?key=&q=${encodeURIComponent(userInput)}`);
        // const response = await fetch(`${apiUrl}&q=${encodeURIComponent(userInput)}`);
console.log(typeof(city));
console.log(city);
console.log("Fetching data from:", apiUrl + city); 


    var response;
    try {
        response = await fetch(apiUrl + city);
        console.log("Response received:", response);
        
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert("Unable to fetch weather data. Please try again later.");
        return;
    }
    var data = await response.json();
    countryWeather=data
    console.log(countryWeather);


    var dayy = countryWeather.forecast.forecastday[0].date;
    var place = countryWeather.location.name;
    var temp = countryWeather.current.temp_c;
    var icon = iconConverter(countryWeather.current.condition.icon);
    var state = countryWeather.current.condition.text;
    var humidity = countryWeather.current.humidity;
    var wind = calcWind(countryWeather.current.wind_mph);
    var direction = getGeoDirection(countryWeather.location.lat , countryWeather.location.lon );
    
    
function ComingDays() {
    // for (let i = 1; i < countryWeather.forecast.forecastday.length; i++) {
        var day1 = countryWeather.forecast.forecastday[1].date;
        var maxTemp1 = countryWeather.forecast.forecastday[1].day.maxtemp_c;
        var minTemp1 = countryWeather.forecast.forecastday[1].day.mintemp_c;
        var icon1 = iconConverter(countryWeather.forecast.forecastday[1].day.condition.icon);
        var state1 = countryWeather.forecast.forecastday[1].day.condition.text;


        var day2 = countryWeather.forecast.forecastday[2].date;
        var maxTemp2 = countryWeather.forecast.forecastday[2].day.maxtemp_c;
        var minTemp2 = countryWeather.forecast.forecastday[2].day.mintemp_c;
        var icon2 = iconConverter(countryWeather.forecast.forecastday[2].day.condition.icon);
        var state2 = countryWeather.forecast.forecastday[2].day.condition.text;

        displayComingDay1(day1,maxTemp1,minTemp1,icon1,state1)
        displayComingDay2(day2,maxTemp2,minTemp2,icon2,state2)


        // displayComingDays(day,maxTemp,minTemp,icon,state)
        // for (let i = 0; i < countryWeather.forecast.forecastday.length-1; i++) {
        //     let comingDays = document.querySelectorAll(".comingDay");
        //     if (comingDays[i]) {
        //         comingDays[i].innerHTML = getDay(day[i]);
        //         console.log(comingDays[i]); }
        // }

    
}


ComingDays()
displayCity(dayy,place,temp,icon,state,humidity,wind,direction) 

}

fetchCountries()



function calcWind(wind) {
    var wind = Math.round(wind*1.60934);
    return wind;
}

function getDay(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

function monthName(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
}

function iconConverter(icon) {
    const iconUrl = icon.startsWith('//') 
  ? 'https:' + icon 
  : icon;
  return iconUrl;
}

function getGeoDirection(lat, lon) {
    let vertical = lat > 0 ? "North" : lat < 0 ? "South" : "Equator";
    let horizontal = lon > 0 ? "East" : lon < 0 ? "West" : "Prime Meridian";

    if (vertical === "Equator" && horizontal === "Prime Meridian") {
        return "Null Island";
    } else if (vertical === "Equator") {
        return `Equator`;
    } else if (horizontal === "Prime Meridian") {
        return `Prime Meridian`;
    }
    return `${vertical}-${horizontal}`;
}


function displayCity(dayy,place,temp,icon,state,humidity,wind,direction) {

    document.getElementById("day").innerHTML=getDay(dayy)
    document.getElementById("date").innerHTML=dayy.split("-").slice(2,3).join()+" "+monthName(dayy.split("-").slice(1,2).join())
    document.getElementById("place").innerHTML=place
    document.getElementById("temp").innerHTML=temp+"°C"
    document.getElementById("icon").innerHTML=`<img src="${icon}" alt="weather icon">`
    document.getElementById("state").innerHTML=state
    document.getElementById("humidity").innerHTML=humidity+"%"
    document.getElementById("wind").innerHTML=wind+" km/h"
    document.getElementById("direction").innerHTML=direction
}


function displayComingDay1(day1,maxTemp1,minTemp1,icon1,state1)
{
    document.querySelector(".comingDay1").innerHTML =getDay(day1)
    document.querySelector(".comingIcon1").innerHTML = `<img src="${icon1}" alt="weather icon">`;
    document.querySelector(".comingState1" ).innerHTML = state1;
    document.querySelector(".maxTemp1").innerHTML = maxTemp1 + "°C";
    document.querySelector(".minTemp1").innerHTML = minTemp1 + "°C";
}
function displayComingDay2(day2,maxTemp2,minTemp2,icon2,state2)
{
    document.querySelector(".comingDay2").innerHTML =getDay(day2)
    document.querySelector(".comingIcon2").innerHTML = `<img src="${icon2}" alt="weather icon">`;
    document.querySelector(".comingState2" ).innerHTML = state2;
    document.querySelector(".maxTemp2").innerHTML = maxTemp2 + "°C";
    document.querySelector(".minTemp2").innerHTML = minTemp2 + "°C";
}


// function displayComingDays(day, maxTemp, minTemp, icon, state) {
//     for (let i = 0; i < countryWeather.forecast.forecastday.length; i++) {
//         let comingDays = document.querySelectorAll(".comingDay");
//         if (comingDays[i]) {
//             comingDays[i].innerHTML = getDay(day);
//             console.log(comingDays[i]); }

//         // document.querySelectorAll(".comingIcon").innerHTML = `<img src="${icon}" alt="weather icon">`;
//         // document.querySelectorAll(".comingState" ).innerHTML = state;
//         // document.querySelectorAll(".maxTemp").innerHTML = maxTemp + "°C";
//         // document.querySelectorAll(".minTemp").innerHTML = minTemp + "°C";
//     }
// }

searchButton.addEventListener("click", async function() {
    var userInput = document.getElementById("userInput").value;
    console.log(userInput);
    
    if (userInput) {
        console.log("Calling fetchCountries with:", userInput);
        await fetchCountries(userInput);
        console.log("fetchCountries completed.");}
        else {
        alert("Please enter a valid city name.");
    }
});