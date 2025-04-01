import fetchWeatherApi from "../api/fetchWeatherApi.js";
import processWeatherData from "./createCard.js";
import otherElementByHours from "./elementByHour.js";
import displayGraphic from "../utils/chart.js";

export default async function fetchWeatherData() {
  const CITY_INPUT = document.querySelector('#select-city');
  const COUNTRY_INPUT = document.querySelector('#select-country');
  const SUBMIT_BUTTON = document.querySelector('.submit-city');

  async function handleWeatherFetch() {
    try {
      const cityName = CITY_INPUT.value.trim();
      const countryCode = COUNTRY_INPUT.value.trim();
      
      if (cityName === "") return;

      // Remove previous card
      const existingCard = document.querySelector('.weather-card');
      if (existingCard) {
        existingCard.remove();
      }

      // Fetch data and process it
      const data = await fetchWeatherApi(cityName, countryCode);
      // Pass data to otherElementByHours
      await otherElementByHours(data);
      await displayGraphic(data);
      
      await processWeatherData(data);


      console.log(displayGraphic)
      
      // Clear inputs
      CITY_INPUT.value = ''; 
      COUNTRY_INPUT.value = '';
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  }

  // Event listeners
  SUBMIT_BUTTON.addEventListener('click', handleWeatherFetch);
  
  // Handle Enter key for both inputs
  CITY_INPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleWeatherFetch();
    }
  });
  
  COUNTRY_INPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleWeatherFetch();
    }
  });
}