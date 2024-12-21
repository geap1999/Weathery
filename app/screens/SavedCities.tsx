import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherCard } from '../components/card';
import { Weather } from '../types/weather';
import { getWeather } from '../services/get_weather';
import LottieView from 'lottie-react-native';

export default function SavedCities() {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [cityWeathers, setCityWeathers] = useState<Weather[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCities = async () => {
            try {
                const cities = await AsyncStorage.getItem('savedCities');
                setLoading(false);
                if (cities === null) {
                    return;
                }
                const cityList = JSON.parse(cities);
                if (cityList.length > 0) {
                    setIsEmpty(false);
                    const weatherData = [];
                    for (const city of cityList) {
                        const cityWeather = await getWeather(city);
                        weatherData.push(cityWeather);
                    }
                    setCityWeathers(weatherData);
                }
            } catch (error) {
                console.error('Erreur lors de la gestion de données.', error);
            }
        };
        getCities();
    }, [cityWeathers]);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <LottieView
                        style={{ flex: 1 }}
                        source={require('../../assets/animations/loading.json')}
                        autoPlay
                        loop
                    />
                </View>
            ) : isEmpty ? (
                <Text style={styles.emptyText}>
                    Aucune ville sauvegardée
                </Text>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {cityWeathers.map((cityWeather, index) => (
                        <WeatherCard
                            key={index}
                            cityWeather={cityWeather}
                            searched={cityWeather.name}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 18,
        marginTop: 20,
    },
    scrollView: {
        marginTop: 20,
    },
});