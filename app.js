window.addEventListener('load', ()=> {
    
    let long;
    let lat;
    
    const temperatureDegree = document.querySelector(".temp-degree");
    
    const windDirection = document.querySelector(".wind-direction")
    var sheet = document.querySelector(".sheet");
    const windSpeed = document.querySelector(".windspeed");

// Create our shared stylesheet:
//const sheet = new CSSStyleSheet();
//sheet.replaceSync('#target {color: darkseagreen}');

// Apply the stylesheet to a document:
// document.adoptedStyleSheets = [sheet];

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            long = position.coords.longitude.toFixed(2);
            lat = position.coords.latitude.toFixed(2);
            msl = 10;
           
            const api = `https://api.met.no/weatherapi/locationforecast/2.0/?lat=${lat}&lon=${long}`;
       
                    
        fetch(api)
        .then(data =>{
            return data.json();
        })
        .then(data => {
            console.log(data);
            
            const {air_temperature,                     
                    wind_speed, 
                    dew_point_temperatur, 
                    ultraviolet_index_clear_sky, 
                    wind_from_direction, 
                    relative_humidity
            } = data.properties.timeseries[0].data.instant.details;

            const {symbol_code} = data.properties.timeseries[0].data.next_1_hours.summary;
            const {air_temperature_max} = data.properties.meta.units;
            
            console.log(symbol_code);
            console.log(wind_speed);
            console.log(wind_from_direction);

            // Set DOM
            temperatureDegree.textContent = air_temperature + ' ' + air_temperature_max;
           
            directionTrunc = Math.trunc(wind_from_direction);
            
            windSpeed.textContent = wind_speed + " " + "ms";
            
            //Set Icon
            setIcons(symbol_code, document.querySelector('.icon'));
            

            
            function twister (){
                const transform = `rotate(${directionTrunc})`;
                sheet = transform;
                
                console.log(sheet);
                
            };
            twister ();
        });  
         
    }); 
 }



 function setIcons(symbol_code, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = symbol_code.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
   }
});


//** CLEAR_DAY CLEAR_NIGHT PARTLYCLOUDY_DAY PARTLYCLOUDY_NIGHT CLOUDY 
//* RAIN SLEET SNOW WIND FOG */
