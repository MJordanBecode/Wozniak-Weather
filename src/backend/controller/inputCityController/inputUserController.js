import fetchWeatherApi from "../../api/fetchWeatherApi";
export default function inputCity() {
  const SUBMIT_BUTTON = document.querySelector('.submit-city');
  const CITY_INPUT = document.querySelector('#select-city');
  const COUNTRY_INPUT = document.querySelector('#select-country')
  
  return new Promise((resolve, reject) => {
    async function getWeather() {
      try {
        console.log('valeur de l\'input ville : ', CITY_INPUT.value);
        console.log('valeur de l\'input pays : ', COUNTRY_INPUT.value);
        
        if (CITY_INPUT.value.trim() === "") return; // Vérifie qu'on ne soumet pas un champ vide
        
        // Passer à la fois la ville et le pays à fetchWeatherApi
        const data = await fetchWeatherApi(CITY_INPUT.value, COUNTRY_INPUT.value);
        resolve(data);
        
        // Vider les inputs après soumission
        CITY_INPUT.value = ''; 
        COUNTRY_INPUT.value = '';
      } catch (error) {
        reject(error);
      }
    }
    
    // Fonction pour gérer la soumission
    function handleSubmit(e) {
      // Empêche le comportement par défaut du formulaire si c'est un événement de soumission
      if (e.type === 'submit') {
        e.preventDefault();
      }
      
      getWeather();
    }
    
    // Ajout des écouteurs d'événements
    SUBMIT_BUTTON.addEventListener('click', handleSubmit);
    
    // Gestion de l'événement Enter pour les deux inputs
    CITY_INPUT.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Empêche la soumission du formulaire
        handleSubmit(e);
      }
    });
    
    COUNTRY_INPUT.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Empêche la soumission du formulaire
        handleSubmit(e);
      }
    });
    
    // Nettoyage des écouteurs d'événements en cas de rejet de la promesse
    const cleanup = () => {
      SUBMIT_BUTTON.removeEventListener('click', handleSubmit);
      CITY_INPUT.removeEventListener('keydown', handleSubmit);
      COUNTRY_INPUT.removeEventListener('keydown', handleSubmit);
    };
    
    // Ajout de la gestion des erreurs
    Promise.race([
      new Promise((_, reject) => {
        // Gestion des erreurs potentielles
        window.addEventListener('error', (errorEvent) => {
          cleanup();
          reject(errorEvent.error);
        });
      })
    ]);
  });
}