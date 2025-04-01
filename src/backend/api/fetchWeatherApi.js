    import env from "env";
    import { setLocalStorage } from "../utils/localStorage";

    /**
     * 
     * @param {*} city => city name, takes the city name as a parameter
     * @description => fetches the weather data from the openweathermap api
     * @returns 
     */
    export default async function fetchWeatherApi(city, country) {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
        if(!response.ok) {
            throw new Error('City not found')
        }
        let data = await response.json()
                // Stocker les données météo sous la clé de la ville
                setLocalStorage(city, JSON.stringify(data)); 

                // Stocker le nom de la ville sous la clé 'city' pour le rechargement
                setLocalStorage("city", city); 
        console.log(data)
        return data
        } catch (error) {
            console.log(error)
        }
    }

