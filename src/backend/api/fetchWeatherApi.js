import env from "env";

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
       console.log(data)
       return data
    } catch (error) {
        console.log(error)
    }
}

