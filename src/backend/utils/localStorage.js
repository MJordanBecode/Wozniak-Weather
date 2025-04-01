import fetchWeatherData from "../components/test";
import processWeatherData from "../components/createCard";
export  function setLocalStorage(key, value) {
   return localStorage.setItem(key, JSON.stringify(value));
}


export function getLocalStorage(key) {
   let data = localStorage.getItem(key);
   return data ? JSON.parse(data) : null;
}

export function removeWeatherCard(){
   return localStorage.clear()
}

export function clearLocalStorage(){

}

export async function reloadWeatherData() {
   // Récupère la ville depuis le localStorage sous la clé 'city'
   const lastCity = getLocalStorage("city");
   console.log("Données stockées pour la ville :", getLocalStorage(lastCity));


   if (lastCity) {
       // Si une ville est trouvée dans le localStorage, récupère les données associées
       const storedData = getLocalStorage(lastCity); // Utilise la ville comme clé
      
       if (storedData) {
           // Si des données sont trouvées, traite et affiche les cartes
           processWeatherData(JSON.parse(storedData));
       } else {
           // Si les données ne sont pas trouvées, effectue un appel API pour récupérer les données
           const newData = await fetchWeatherData(lastCity);
           processWeatherData(newData); // Affiche les données récupérées
       }
   } else {
       console.log("Aucune ville trouvée dans le localStorage.");
   }
}

