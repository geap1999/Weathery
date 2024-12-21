import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { WeatherHour } from '../types/weather';

type hourlyForecastProps = {
    weatherHours: WeatherHour[];
}

const HourlyForecast = ({weatherHours} : hourlyForecastProps) => {
    return (
        <View style={styles.container}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollHours}
                    >
                        {weatherHours.map((weather, index) => (
                            index < 24 && (
                                <View key={index} style={styles.hourCard}>
                                    <Text style={styles.hourText}>{index}H</Text>
                                    <Text style={styles.weatherDescription}>
                                        {weather.weather[0].description}
                                    </Text>
                                    <Text style={styles.tempText}>
                                        {Math.round((weather as WeatherHour).main.temp)}°C
                                    </Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                </View>
            )
        };

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginTop: 20,
    },
    scrollHours: {
        flexGrow: 0,
    },
    hourCard: {
        width: 80,
        padding: 10,
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    hourText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
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
});

export default HourlyForecast;
