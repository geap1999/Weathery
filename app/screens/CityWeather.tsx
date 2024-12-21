import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getWeather, getWeatherHours, getWeatherDays } from '../services/get_weather';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Weather, WeatherHour, WeatherDay } from '../types/weather';
import DailyForecast from '../components/dailyForecast';
import HourlyForecast from '../components/hourlyForecast';

export default function CityWeather() {
    const [cityWeather, setCityWeather] = useState<Weather>();
    const [weatherHours, setWeatherHours] = useState<WeatherHour[]>([]);
	const [weatherDays, setWeatherDays] = useState<WeatherDay[]>([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const { cityName } = useLocalSearchParams<{ cityName: string }>();
    const router = useRouter()

    useEffect(() => {
        setCanGoBack(router.canGoBack());
        const fetchWeather = async () => {
            try {
                if (cityName) {
                    const weatherData = await getWeather(cityName);
                    const weatherHoursData = await getWeatherHours(cityName);
					const weatherDaysData = await getWeatherDays(cityName);
                    setCityWeather(weatherData);
                    setWeatherHours(weatherHoursData.list);
					setWeatherDays(weatherDaysData.list);
                } else {
                    const userLocation = await Location.getCurrentPositionAsync({});
                    setLocation(userLocation);
                    const weatherData = await getWeather("");
                    const weatherHoursData = await getWeatherHours("");
					const weatherDaysData = await getWeatherDays("");
                    setCityWeather(weatherData);
                    setWeatherHours(weatherHoursData.list);
					setWeatherDays(weatherDaysData.list);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données météo :", error);
            }
        };
        fetchWeather();
    }, [cityName]);

    if (!location && !cityName) {
        return (
            <View>
                <Text>Veuillez activer la localisation pour obtenir les informations météo.</Text>
            </View>
        );
    }

    if (!cityWeather) {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <LottieView
                    style={{flex:1}}
                    source={require('../../assets/animations/loading.json')}
                    autoPlay
                    loop
                />
            </View>
        );
    }

    const temperature = Math.round(cityWeather.main.temp);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {canGoBack && (
            <View style={styles.containerButton}>
                <TouchableOpacity
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        }
                    }}
                >
                    <Image
                        source={require('../../assets/images/icons8-left-arrow-50.png')}
                        style={styles.returnIcon}
                    />
                </TouchableOpacity>
            </View>
            )}
            <View style={styles.weatherCard}>
                <View>
                    <Text style={styles.cityName}></Text>
                    <Text style={styles.cityName}>{cityWeather.name}</Text>
                    <Text style={styles.description}>{cityWeather.weather[0].description}</Text>
                    <Text style={styles.cityTemp}>{temperature}°C | {(temperature*(9/5))+32}°F</Text>
                </View>
                <View style={styles.cityMoreDetails}>
                    <Text style={styles.cityMoreDetail}>Humidité : {cityWeather.main.humidity}%</Text>
                    <Text style={styles.cityMoreDetail}>Pression : {cityWeather.main.pressure} hPa</Text>
                    <Text style={styles.cityMoreDetail}>Vitesse du vent : {Math.round(cityWeather.wind.speed * 3.6)} km/h</Text>
                </View>
				<View style={styles.cityDetails}>
					<Text style={styles.temp}>Min: {Math.round(cityWeather.main.temp_min)}°C</Text>
					<Text style={styles.temp}>Max: {Math.round(cityWeather.main.temp_max)}°C</Text>
				</View>
            </View>

            <View style={styles.separator} />

                <View>
                    <Text style={styles.sectionTitle}> Prévision de la semaine : </Text>
                    {weatherDays && (
                        <View>
                            {weatherDays && <DailyForecast weatherDays={weatherDays} />}
                        </View>
                    )}
                </View>

                <View style={styles.separator} />

                <View>
                    <Text style={styles.sectionTitle} > Prévision de la journée : </Text>
                    {weatherHours && (
                        <View style={styles.weatherScrollerContainer}>
                            {weatherHours && <HourlyForecast weatherHours={weatherHours} />}
                        </View>
                    )}
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
    },
    containerButton: {
        position: "absolute",
        top: 40,
        left:10,
    },
    returnButton:{
        backgroundColor: '#394a51',
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    returnButtonTitle: {
        color: '#fbf2d5',
        fontSize: 16,
        fontFamily: 'roboto',
    },
    returnIcon: {
        position: "absolute",
        top: 40,
        left:10,
    },
    weatherCard: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        shadowColor: '#394a51',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        alignSelf: 'center',
    },
    cityTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#394a51',
    },
    description: {
        fontSize: 18,
        color: 'gray',
        alignSelf: 'center',
    },
    temp: {
        fontSize: 22,
        color: '#fdc57b',
    },
    cityDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    cityMoreDetails: {
        marginTop: 10,
        alignItems: 'center',
    },
    cityMoreDetail: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#394a51',
        paddingLeft: 10,
        textAlign: 'center',
    },
    weatherScrollerContainer: {
        marginTop: 20,
        width: '100%',
    },
    tempByDay: {
        flexDirection: 'row',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
    }
});