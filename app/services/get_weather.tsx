import axios from 'axios';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location';

export const getWeather = async (city: string) => {
    const locale = Localization.getLocales();
    const WEATHERY_API_KEY = process.env.EXPO_PUBLIC_WEATHERY_API_KEY;

    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("Permission de localisation refusée");
            return;
        }

        if (city !== "") {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);
            return response.data;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
    };
}

export const getWeatherHours = async (city: string) => {
    const locale = Localization.getLocales();
    const WEATHERY_API_KEY = process.env.EXPO_PUBLIC_WEATHERY_API_KEY;

    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("Permission de localisation refusée");
            return;
        }

        if (city !== "") {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);
            return response.data;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
    };
}

export const getWeatherDays = async (city: string) => {
    const locale = Localization.getLocales();
    const WEATHERY_API_KEY = process.env.EXPO_PUBLIC_WEATHERY_API_KEY;

    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("Permission de localisation refusée");
            return;
        }

        if (city !== "") {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);
            return response.data;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${WEATHERY_API_KEY}&lang=${locale[0].languageCode}&units=metric`);

            return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
    };
}