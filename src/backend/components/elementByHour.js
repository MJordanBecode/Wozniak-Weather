import createElement from "../utils/createElement.js";
import customRound from "../utils/rounding.js";

export default async function otherElementByHours(data) {
    const weatherData = data;

    const days = [];
    let currentDay = [];

    if (Array.isArray(weatherData.list)) {
        weatherData.list.forEach((item) => {
            const hour = item.dt_txt.slice(11, 13);
            if (hour === "00" && currentDay.length > 0) {
                days.push(currentDay);
                currentDay = [];
            }
            const weatherDataHour = {
                time: item.dt_txt,
                temp: item.main.temp,
                condition: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                pressure: item.main.pressure
            };
            currentDay.push(weatherDataHour);
        });
        if (currentDay.length > 0) {
            days.push(currentDay);
        }
    } else {
        console.error('data.list n\'est pas un tableau');
    }

    document.addEventListener('cardsCreated', () => {
        const ARROW_RIGHT = document.querySelector('.changeElementDay');
        const weatherDetails = document.querySelector('.weather-details');

        ARROW_RIGHT.addEventListener('click', () => {
            console.log('Arrow clicked');
            weatherDetails.innerHTML = ''; // Vider le contenu précédent
            
            // Ajouter un titre pour les prévisions horaires
            const hourlyTitle = createElement('h3');
            hourlyTitle.classList.add('hourly-forecast-title');
            hourlyTitle.textContent = 'Prévisions horaires pour aujourd\'hui';
            weatherDetails.appendChild(hourlyTitle);
            
            // Créer le conteneur pour les entrées horaires
            const hourlyEntriesContainer = createElement('div');
            hourlyEntriesContainer.classList.add('hourly-entries-container');
            
            // Afficher les données horaires pour le premier jour
            if (days.length > 0) {
                const firstDay = days[0];
                
                firstDay.forEach((entry, index) => {
                    const entryContainer = createElement('div');
                    entryContainer.classList.add('hourly-entry');
                    entryContainer.style.animationDelay = `${index * 0.1}s`;
                    
                    // Formater l'heure et la date
                    const dateTime = new Date(entry.time);
                    const formattedTime = dateTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    
                    const formattedDate = dateTime.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric'
                    });
                    
                    // En-tête de l'entrée (heure et température)
                    const entryHeader = createElement('div');
                    entryHeader.classList.add('hourly-entry-header');
                    
                    const timeContainer = createElement('div');
                    timeContainer.classList.add('hourly-time-container');
                    
                    const timeElement = createElement('span');
                    timeElement.classList.add('hourly-time');
                    timeElement.textContent = formattedTime;
                    timeContainer.appendChild(timeElement);
                    
                    const dateElement = createElement('span');
                    dateElement.classList.add('hourly-date');
                    dateElement.textContent = formattedDate;
                    timeContainer.appendChild(dateElement);
                    
                    entryHeader.appendChild(timeContainer);
                    
                    const tempElement = createElement('span');
                    tempElement.classList.add('hourly-temp');
                    tempElement.textContent = `${customRound(entry.temp)}°C`;
                    entryHeader.appendChild(tempElement);
                    
                    entryContainer.appendChild(entryHeader);
                    
                    // Contenu principal de l'entrée
                    const entryContent = createElement('div');
                    entryContent.classList.add('hourly-entry-content');
                    
                    // Icône et condition
                    const iconContainer = createElement('div');
                    iconContainer.classList.add('hourly-icon-container');
                    
                    const icon = createElement('img');
                    icon.classList.add('hourly-icon');
                    icon.src = `http://openweathermap.org/img/wn/${entry.icon}@2x.png`;
                    icon.alt = entry.condition;
                    iconContainer.appendChild(icon);
                    
                    const condition = createElement('span');
                    condition.classList.add('hourly-condition');
                    condition.textContent = entry.condition;
                    iconContainer.appendChild(condition);
                    
                    entryContent.appendChild(iconContainer);
                    
                    // Détails météo
                    const details = createElement('div');
                    details.classList.add('hourly-details');
                    
                    // Humidité
                    const humidityItem = createElement('div');
                    humidityItem.classList.add('hourly-detail-item');
                    
                    const humidityLabel = createElement('span');
                    humidityLabel.classList.add('hourly-detail-label');
                    humidityLabel.textContent = 'Humidité';
                    humidityItem.appendChild(humidityLabel);
                    
                    const humidityValue = createElement('span');
                    humidityValue.classList.add('hourly-detail-value');
                    humidityValue.textContent = `${entry.humidity}%`;
                    humidityItem.appendChild(humidityValue);
                    
                    details.appendChild(humidityItem);
                    
                    // Vitesse du vent
                    const windItem = createElement('div');
                    windItem.classList.add('hourly-detail-item');
                    
                    const windLabel = createElement('span');
                    windLabel.classList.add('hourly-detail-label');
                    windLabel.textContent = 'Vent';
                    windItem.appendChild(windLabel);
                    
                    const windValue = createElement('span');
                    windValue.classList.add('hourly-detail-value');
                    windValue.textContent = `${entry.windSpeed} m/s`;
                    windItem.appendChild(windValue);
                    
                    details.appendChild(windItem);
                    
                    // Pression
                    const pressureItem = createElement('div');
                    pressureItem.classList.add('hourly-detail-item');
                    
                    const pressureLabel = createElement('span');
                    pressureLabel.classList.add('hourly-detail-label');
                    pressureLabel.textContent = 'Pression';
                    pressureItem.appendChild(pressureLabel);
                    
                    const pressureValue = createElement('span');
                    pressureValue.classList.add('hourly-detail-value');
                    pressureValue.textContent = `${entry.pressure} hPa`;
                    pressureItem.appendChild(pressureValue);
                    
                    details.appendChild(pressureItem);
                    
                    entryContent.appendChild(details);
                    entryContainer.appendChild(entryContent);
                    
                    hourlyEntriesContainer.appendChild(entryContainer);
                });
            } else {
                const noData = createElement('p');
                noData.textContent = 'Aucune donnée disponible pour aujourd\'hui.';
                noData.style.textAlign = 'center';
                noData.style.padding = '20px';
                hourlyEntriesContainer.appendChild(noData);
            }
            
            weatherDetails.appendChild(hourlyEntriesContainer);
            
            // Ajouter un bouton pour revenir à l'affichage principal
            const backButton = createElement('button');
            backButton.classList.add('back-to-main');
            backButton.textContent = 'Retour';
            backButton.addEventListener('click', () => {
                // Recharger la page pour revenir à l'affichage principal
                // Vous pourriez implémenter une solution plus élégante si nécessaire
                location.reload();
            });
            weatherDetails.appendChild(backButton);
        });
    });

    console.log("otherElementByHours function called with data:", data);
}