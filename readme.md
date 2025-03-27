# 🌤️ Documentation de l'API de Prévisions Météorologiques

Ce document décrit la structure des données renvoyées par l'API de prévisions météorologiques.

## 📊 Paramètres dans la réponse de l'API :

### **Paramètres internes** 🛠️
- **message** : Paramètre interne de l'API
- **cnt** : Nombre de timestamps retournés dans la réponse de l'API
- **list** : Liste des données de prévisions météorologiques

### **Paramètres de la liste :**
- **list.dt** : Timestamp Unix (UTC) correspondant à l'heure des données de prévisions
- **list.main** : Paramètres principaux météorologiques
    - **list.main.temp** : 🌡️ Température. Unités : Kelvin par défaut, Celsius en mode métrique, Fahrenheit en mode impérial.
    - **list.main.feels_like** : 🥶 Température ressentie, prenant en compte la perception humaine des conditions météorologiques. Unités : Kelvin par défaut, Celsius en mode métrique, Fahrenheit en mode impérial.
    - **list.main.temp_min** : ❄️ Température minimale au moment du calcul. Température minimale prévue (principalement pour les grandes villes et zones urbaines). Utilisation optionnelle.
    - **list.main.temp_max** : 🔥 Température maximale au moment du calcul. Température maximale prévue (principalement pour les grandes villes et zones urbaines). Utilisation optionnelle.
    - **list.main.pressure** : 🌬️ Pression atmosphérique au niveau de la mer, en hectopascals (hPa).
    - **list.main.sea_level** : Pression atmosphérique au niveau de la mer en hectopascals (hPa).
    - **list.main.grnd_level** : Pression atmosphérique au niveau du sol en hectopascals (hPa).
    - **list.main.humidity** : 💧 Humidité relative en pourcentage.
    - **list.main.temp_kf** : Paramètre interne de calcul

### **Conditions météorologiques** 🌥️
- **list.weather.id** : Identifiant unique de la condition météorologique
- **list.weather.main** : Groupe de paramètres météorologiques (pluie, neige, nuages, etc.)
- **list.weather.description** : Description détaillée de la condition météorologique dans le groupe.
- **list.weather.icon** : Identifiant de l'icône représentant la condition météorologique

### **Nuages** ☁️
- **list.clouds.all** : Pourcentage de couverture nuageuse du ciel

### **Vent** 🌬️
- **list.wind.speed** : Vitesse du vent. Unités : mètre/seconde par défaut, mètre/seconde en mode métrique, miles/heure en mode impérial.
- **list.wind.deg** : Direction du vent en degrés (convention météorologique).
- **list.wind.gust** : Vitesse des rafales de vent. Unités : mètre/seconde par défaut, mètre/seconde en mode métrique, miles/heure en mode impérial.

### **Visibilité** 🌫️
- **list.visibility** : Distance de visibilité moyenne en mètres. Valeur maximale de 10 kilomètres.

### **Précipitations** 🌧️
- **list.pop** : Probabilité de précipitations. Valeur comprise entre 0 (0%) et 1 (100%).

### **Pluie** 🌧️
- **list.rain.3h** : Volume de précipitations liquides sur les 3 dernières heures, en millimètres.

### **Neige** ❄️
- **list.snow.3h** : Volume de précipitations neigeuses sur les 3 dernières heures, en millimètres.

### **Système** 🔧
- **list.sys.pod** : Période de la journée (n - nuit, d - jour)
- **list.dt_txt** : Horodatage des données de prévisions au format ISO (UTC)

### **Paramètres de la ville** 🏙️
- **city.id** : Identifiant unique de la ville
- **city.name** : Nom de la ville
- **city.coord.lat** : Latitude géographique de la ville
- **city.coord.lon** : Longitude géographique de la ville
- **city.country** : Code ISO du pays (ex : FR, GB, JP)
- **city.population** : Population totale de la ville
- **city.timezone** : Décalage horaire en secondes par rapport à l'UTC
- **city.sunrise** : Heure du lever du soleil (timestamp Unix, UTC)
- **city.sunset** : Heure du coucher du soleil (timestamp Unix, UTC)

---

## 📝 Comment utiliser l'API :

1. **Effectuez un appel à l'API en utilisant le nom de la ville ou ses coordonnées géographiques (latitude et longitude).**
2. **Récupérez les données de prévisions et analysez-les pour extraire les informations météorologiques pertinentes.**
3. **Exploitez les différents paramètres pour afficher des données météorologiques détaillées : température, humidité, vitesse du vent, etc.**

Pour la documentation complète et des informations plus détaillées, consultez la [documentation officielle de l'API OpenWeather](https://openweathermap.org/api).
