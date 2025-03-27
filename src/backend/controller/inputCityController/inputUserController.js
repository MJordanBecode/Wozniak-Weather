import isValidString from '../../utils/regex.js';
import fetchWeatherApi from '../../api/fetchWeatherApi.js';
export default function controllerInputUser() {
    try {
        const SELECT_INPUT_CITY = document.querySelector('#select-city');
        const SELECT_BUTTON_CITY = document.querySelector('.submit-city');

        // Ajouter l'événement de clic sur le bouton
        SELECT_BUTTON_CITY.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche la soumission du formulaire

            const cityValue = isValidString(SELECT_INPUT_CITY.value); // Récupérer la valeur de l'input et la retirer tous les caractères spéciaux indésirables
            fetchWeatherApi(cityValue); // Appelle la fonction fetchWeatherApi avec la valeur de la ville
            console.log("Valeur de la ville :", cityValue); // Affiche la valeur dans la console

            // Tu peux ajouter d'autres actions à effectuer avec la valeur de la ville ici
            SELECT_INPUT_CITY.value = ''; // Optionnel : vider l'input après avoir cliqué
        });
    } catch (error) {
        console.log(error); // En cas d'erreur, affiche l'erreur dans la console
    }
}