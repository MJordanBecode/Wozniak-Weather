import createElement from "./utils/createElement.js";
import customRound from "./utils/rounding.js";

export default async function processWeatherData(data) {
    const SELECT_MAIN = document.querySelector("main");
    console.log("voici le main :", SELECT_MAIN);

    const weatherCard = createElement("div");
    weatherCard.classList.add("weather-card");

    // Add current date and time
    const dateTimeContainer = createElement("div");
    dateTimeContainer.classList.add("date-time-container");

    const currentDateTime = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const formattedDateTime = currentDateTime.toLocaleDateString('fr-FR', options);

    const dateTimeDisplay = createElement("p");
    dateTimeDisplay.textContent = formattedDateTime;
    dateTimeDisplay.classList.add("date-time");

    dateTimeContainer.appendChild(dateTimeDisplay);
    weatherCard.appendChild(dateTimeContainer);

    const mainInfo = createElement("div");
    mainInfo.classList.add("main-info");

    const cityName = createElement("h2");
    cityName.textContent = data.city.name;
    mainInfo.appendChild(cityName);

    const country = createElement("p");
    country.textContent = data.city.country;
    console.log("ma country : ",country)
    country.classList.add("country");
    mainInfo.appendChild(country);

    weatherCard.appendChild(mainInfo);

    const coordinates = createElement("div");
    coordinates.classList.add("coordinates");

    const LAT = createElement("p");
    LAT.textContent = `Latitude: ${data.city.coord.lat}`;
    LAT.classList.add("lat");
    coordinates.appendChild(LAT);

    const LON = createElement("p");
    LON.textContent = `Longitude: ${data.city.coord.lon}`;
    LON.classList.add("lon");
    coordinates.appendChild(LON);

    weatherCard.appendChild(coordinates);

    const days = [];
    let currentDay = [];

    if (Array.isArray(data.list)) {
        data.list.forEach((item) => {
            const hour = item.dt_txt.slice(11, 13);
            if (hour === "00" && currentDay.length > 0) {
                days.push(currentDay);
                currentDay = [];
            }
            const weatherData = {
                time: item.dt_txt,
                temp: item.main.temp,
                condition: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                pressure: item.main.pressure
            };
            currentDay.push(weatherData);
        });
        if (currentDay.length > 0) {
            days.push(currentDay);
        }
    } else {
        console.error('data.list n\'est pas un tableau');
    }

    const featuredDayContainer = createElement("div");
    featuredDayContainer.classList.add("featured-day-container");

    const daysContainer = createElement("div");
    daysContainer.classList.add("days-container");

    days.forEach((day, index) => {
        let tempSum = 0, humiditySum = 0, pressureSum = 0, windSpeedSum = 0;
        let tempMin = Infinity, tempMax = -Infinity; // Ajout pour min et max
        let iconSrc = "public/icons/day.svg";
        const dayCount = day.length;

        day.forEach((entry) => {
            // Calcul des min et max de température
            tempMin = Math.min(tempMin, entry.temp);
            tempMax = Math.max(tempMax, entry.temp);

            tempSum += entry.temp;
            humiditySum += entry.humidity;
            pressureSum += entry.pressure;
            windSpeedSum += entry.windSpeed;
            if (entry.icon.includes("n")) {
                iconSrc = "../../src/public/icons/cloudy-day-1.svg";
            } else if (entry.condition.includes("cloud")) {
                iconSrc = "../../src/public/icons/cloudy-day-1.svg";
            } else if (entry.condition.includes("rain")) {
                iconSrc = "../../src/public/icons/rainy-6.svg";
            } else if (entry.condition.includes("snow")) {
                iconSrc = "../../src/public/icons/snowy-3.svg";
            } else if (entry.condition.includes("thunder")) {
                iconSrc = "../../src/public/icons/thunder.svg";
            }
        });

        let avgTemp = customRound(tempSum / dayCount);
        let avgHumidity = customRound(humiditySum / dayCount);
        let avgPressure = customRound(pressureSum / dayCount);
        let avgWindSpeed = customRound(windSpeedSum / dayCount);

        // Arrondissement des températures min et max
        tempMin = customRound(tempMin);
        tempMax = customRound(tempMax);

        const dayDiv = createElement("div");

        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + index);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = forecastDate.toLocaleDateString('fr-FR', options);

        if (index === 0) {
            dayDiv.classList.add("day", "featured-day");

            const dayTitle = createElement("h3");
            dayTitle.textContent = "Aujourd'hui";
            dayDiv.appendChild(dayTitle);

            const weatherDetails = createElement("div");
            weatherDetails.classList.add("weather-details");

            const weatherIconContainer = createElement("div");
            weatherIconContainer.classList.add("weather-icon-container");

            const weatherIcon = createElement("img");
            weatherIcon.src = iconSrc;
            weatherIcon.alt = "Weather Icon";
            weatherIcon.classList.add("weather-icon");
            weatherIconContainer.appendChild(weatherIcon);

            const tempContainer = createElement("div");
            tempContainer.classList.add("temp-container");

            const tempValue = createElement("span");
            tempValue.textContent = `${avgTemp}°C`;
            tempValue.classList.add("temp-value");
            tempContainer.appendChild(tempValue);

            const tempLabel = createElement("span");
            tempLabel.textContent = "Température";
            tempLabel.classList.add("temp-label");
            tempContainer.appendChild(tempLabel);

            weatherIconContainer.appendChild(tempContainer);
            weatherDetails.appendChild(weatherIconContainer);

            const statsContainer = createElement("div");
            statsContainer.classList.add("stats-container");

            const humidityInfo = createElement("div");
            humidityInfo.classList.add("stat-item");
            humidityInfo.innerHTML = `<span class="stat-label">Humidité</span><span class="stat-value">${avgHumidity}%</span>`;
            statsContainer.appendChild(humidityInfo);

            const pressureInfo = createElement("div");
            pressureInfo.classList.add("stat-item");
            pressureInfo.innerHTML = `<span class="stat-label">Pression</span><span class="stat-value">${avgPressure} hPa</span>`;
            statsContainer.appendChild(pressureInfo);

            const windSpeedInfo = createElement("div");
            windSpeedInfo.classList.add("stat-item");
            windSpeedInfo.innerHTML = `<span class="stat-label">Vent</span><span class="stat-value">${avgWindSpeed} m/s</span>`;
            statsContainer.appendChild(windSpeedInfo);

            // Ajout des températures min et max
            const tempMinMaxInfo = createElement("div");
            tempMinMaxInfo.classList.add("stat-item");
            tempMinMaxInfo.innerHTML = `<span class="stat-label">Min/Max</span><span class="stat-value">${tempMin}°C / ${tempMax}°C</span>`;
            statsContainer.appendChild(tempMinMaxInfo);

            weatherDetails.appendChild(statsContainer);
            dayDiv.appendChild(weatherDetails);

            featuredDayContainer.appendChild(dayDiv);
        } else {
            dayDiv.classList.add("day");

            const dayTitle = createElement("h3");
            dayTitle.textContent = formattedDate;
            dayDiv.appendChild(dayTitle);

            const weatherIcon = createElement("img");
            weatherIcon.src = iconSrc;
            weatherIcon.alt = "Weather Icon";
            weatherIcon.classList.add("weather-icon");
            dayDiv.appendChild(weatherIcon);

            dayDiv.innerHTML += `
                <p>Température moyenne : ${avgTemp}°C</p>
                <p>Température min : ${tempMin}°C</p>
                <p>Température max : ${tempMax}°C</p>
                <p>Humidité : ${avgHumidity}%</p>
                <p>Pression : ${avgPressure} hPa</p>
                <p>Vent : ${avgWindSpeed} m/s</p>
            `;

            daysContainer.appendChild(dayDiv);
        }
    });

    const forecastTitle = createElement("h2");
    forecastTitle.textContent = "Prévisions pour les prochains jours";
    forecastTitle.classList.add("forecast-title");

    weatherCard.appendChild(featuredDayContainer);
    weatherCard.appendChild(forecastTitle);
    weatherCard.appendChild(daysContainer);
    SELECT_MAIN.appendChild(weatherCard);
}