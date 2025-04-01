import inputCity from './controller/inputCityController/inputUserController.js'
import fetchWeatherData from "./components/test.js";
import otherElementByHours from './components/elementByHour.js';
import { reloadWeatherData } from './utils/localStorage.js';
// import displayGraphic from './utils/chart.js';
inputCity();
fetchWeatherData();
otherElementByHours();
displayGraphic();

document.addEventListener("DOMContentLoaded", () => {
    reloadWeatherData(); // Charge la dernière ville au démarrage
});