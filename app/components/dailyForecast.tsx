import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherDay } from '../types/weather';

type dailyForecastProps = {
    weatherDays: WeatherDay[];
}

const DailyForecast = ({ weatherDays } : dailyForecastProps) => {
    return (
        <View style={styles.container}>
            {weatherDays.map((weather, index) => (
                index < 5 && (
                    <View key={index} style={styles.dayCard}                                >
                        <Text style={styles.dayText}>Jour {index + 1}</Text>
                        <Text style={styles.weatherDescription}>
                            {weather.weather[0].description}
                        </Text>
                        <Text style={styles.tempText}>
                            {Math.round((weather as WeatherDay).temp.day)}°C
                        </Text>
                    </View>
                )
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    dayCard: {
        padding: 15,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#394a51',
    },
    weatherDescription: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
        marginBottom: 10,
        textAlign: 'center',
    },
    tempText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fdc57b',
    },
})

export default DailyForecast;
