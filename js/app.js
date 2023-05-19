/**
 * Obtención de los datos a modificar
 */
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const errorMsg = document.querySelector('.error-msg');

searchBtn.addEventListener('click', function(){
    event.preventDefault();

    
    /* Datos de la API */
    const APIKEY = `a1099c033b55bf9c2a3f6598d2a46543`;
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=${APIKEY}&units=metric&lang=sp`;

    /* Fetch de la URL de la API para traer los datos */
    fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);

        if(data.cod == '404') {
            errorMsg.style.display = 'block';
            document.querySelector('.main-container').style.display = 'none';
        } else if(searchBox.value == '') {
            errorMsg.style.display = 'block';
            document.querySelector('.main-container').style.display = 'none';
        } else if(data.cod == '200') {
            errorMsg.style.display = 'none';
            document.querySelector('.main-container').style.display = 'block';
        }

        /* Datos a modificar */
        const currentTemp = document.querySelector('.current-temp');
        const currentCond = document.querySelector('.current-cond');
        const tempCond = document.querySelector('.temp-cond');
        const locationData = document.querySelector('.location-data');
        const maxTemp = document.querySelector('.max-temp');
        const minTemp = document.querySelector('.min-temp');
        const humidity = document.querySelector('.humidity');
        const pressure = document.querySelector('.pressure');
        const windSpeed = document.querySelector('.wind-speed');

        currentTemp.innerHTML = parseInt(data.main.temp);
        
        locationData.innerHTML = data.name;
        
        maxTemp.innerHTML = parseInt(data.main.temp_max);

        /* Switch para cambiar el gráfico de como esta el clima */
        switch (data.weather[0].main) {
            case 'Clear':
                if(data.weather[0].id == 800){
                    currentCond.src = 'img/weather-conditions/01d.png';
                }
                break;
            case 'Clouds':
                if(data.weather[0].id == 801){
                    currentCond.src = 'img/weather-conditions/02d.png';
                } else if(data.weather[0].id == 802){
                    currentCond.src = 'img/weather-conditions/03d.png';
                } else if(data.weather[0].id == 803){
                    currentCond.src = 'img/weather-conditions/04d.png';
                } else if(data.weather[0].id == 804){
                    currentCond.src = 'img/weather-conditions/04d.png';
                };
                break;
            case 'Atmosphere':
                currentCond.src = 'img/weather-conditions/04d.png';
                break;
            case 'Snow':
                currentCond.src = 'img/weather-conditions/13d.png';
                break;
            case 'Rain':
                currentCond.src = 'img/weather-conditions/10d.png';
                break;
            case 'Drizzle':
                currentCond.src = 'img/weather-conditions/09d.png';
                break;
            case 'Thunderstorm':
                currentCond.src = 'img/weather-conditions/11d.png';
                break;
            
            default:
                currentCond.src = '';
                break;
        };
        
        /**
         * Función que devuelve con una letra mayúscula
         * en cada palabra la descripción del tiempo
         */
        const firstLetterUppercase = () => {
            const str = data.weather[0].description;
            const arr = str.split(' ');
    
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }

            const str2 = arr.join(" ");

            return str2;
        };

        tempCond.innerHTML = firstLetterUppercase();
        minTemp.innerHTML = parseInt(data.main.temp_min);
        humidity.innerHTML = parseInt(data.main.humidity);
        pressure.innerHTML = data.main.pressure;
        windSpeed.innerHTML = parseInt(data.wind.speed);
    
        /* Mostrar Mapa de la Ubicación*/
        let coords = data.coord;
        let res = `https://api.tomtom.com/map/1/staticimage?key=ARJVkPL6TQjYRbG2GqZ87ASHeM5MylAu&zoom=9&center=${coords.lon},${coords.lat}&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified&language=en-GB`;
        const mapContainer = document.querySelector('.map-container');
        
        mapContainer.innerHTML = `
            <img class="map-image" src="${res}" alt="">
        `;

        localStorage.setItem("Ubicación", data.name);

    })

})