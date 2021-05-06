// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
  // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`,async function (event){
      
  // - Ignore the default behavior of the button
  
    event.preventDefault()
    
  // - Get a reference to the element containing the user-entered location
  
  // - Get the user-entered location from the element's value
  let locationInput = document.querySelector(`#location`)
  let daysInput = document.querySelector(`#days`)
  let location= locationInput.value
  let days= daysInput.value
  // - Check to see if the user entered both location and day; if so:
  if (location.length >0 && days.length>0){
  // - Construct a URL to call the WeatherAPI.com API
  let url = `https://api.weatherapi.com/v1/forecast.json?key=731e57f3152d498f97411935213004&q=${location}&days=${days}`
  
  // - Fetch the url, wait for a response, store the response in memory
  
  let response = await fetch(url)
  
   // - Ask for the json-formatted data from the response, wait for the data, store it in memory
  let json = await response.json()
  // - Write the json-formatted data to the JavaScript console
  console.log(json)
  // - Store the interpreted location, current weather conditions, the forecast as three separate variables
  
  let APIlocation = json.location
  let APIcurrent = json.current
  let current = document.querySelector(`.current`)
  let forecast= document.querySelector(`.forecast`)
  
  // Display current location, and weather condition
  current.innerHTML = `
  <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${APIlocation.name}, ${APIlocation.region}</div>
          <div class="font-bold">
            <img src="https:${APIcurrent.condition.icon}" class="inline-block">
            <span class="temperature">${APIcurrent.temp_f}</span>° 
            and
            <span class="conditions">${APIcurrent.condition.text}</span>
          </div>
        </div>
   `  

   // Display day of forecast input by the user
    forecast.innerHTML = `<div class="text-center space-y-8">
                            <div class="font-bold text-3xl"> ${days} Day Forecast</div>
                          </div>
                        `

   // Loop for the number of days input by the user
    for (let i=0; i<days; i++){ 
    let APIforecast = json.forecast.forecastday[i]
   
    // Display the forecasts based on the number of days the user input
    forecast.insertAdjacentHTML(`beforeend`, `
   <div class="text-center space-y-8">
        <div>
          <img src="https:${APIforecast.day.condition.icon}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${APIforecast.date}</h1>
          <h2 class="text-xl">High ${APIforecast.day.maxtemp_f}° – Low ${APIforecast.day.mintemp_f}°</h2>
          <p class="text-gray-500">${APIforecast.day.condition.text}</h1>
        </div>
        </div>
    </div>
  
    `)}
  }else{
  
  // Do nothing if the user did not enter both location and day
  
  }
  
    })
  
      
      
  
      
  })