import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Weather } from '../types/weather';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export const WeatherCard: React.FC<{ cityWeather: Weather; searched: string }> = ({
  cityWeather,
  searched,
}) => {
  const { name, main, weather, sys } = cityWeather;
  const router = useRouter();
  const temperature = main.temp.toFixed(0); // enlever les chiffres après la virgule
  const tempMin = main.temp_min.toFixed(0);
  const tempMax = main.temp_max.toFixed(0);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const checkSavedCities = async () => {
      try {
        const cities = await AsyncStorage.getItem('savedCities');
        if (cities) {
          const savedCities = JSON.parse(cities);
          setIsSaved(savedCities.includes(name));
        } else {
          await AsyncStorage.setItem('savedCities', JSON.stringify([])); // créer l'item s'il n'existe pas
          setIsSaved(false);
        }
      } catch (error) {
        console.error('Erreur lors la gestion des données.', error);
      }
    };
    checkSavedCities();
  }, [name]);

  const handleSaveOrRemove = async () => {
    try {
      const cities = await AsyncStorage.getItem('savedCities');
      let savedCities = cities ? JSON.parse(cities) : [];
      if (savedCities.includes(name)) {
        savedCities = savedCities.filter((city: string) => city !== name);
        setIsSaved(false);
      } else {
        savedCities.push(name);
        setIsSaved(true);
      }
      await AsyncStorage.setItem('savedCities', JSON.stringify(savedCities));
    } catch (error) {
      console.error('Erreur lors de la gestion des données.', error);
    }
  };

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: "/screens/CityWeather", params: { cityName: searched ? name : searched } })}>
      <View className="bg-white p-4 m-4 rounded-lg shadow-lg">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold mb-2">
            {name}, {sys.country}
            {searched === '' && (
              <Text className="text-sm text-gray-500"> - Ma localisation</Text>
            )}
          </Text>
          {searched !== '' && (
            <TouchableOpacity onPress={handleSaveOrRemove}>
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isSaved ? 'blue' : '#000'}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-lg text-gray-600 mb-2">{weather[0].description}</Text>
        <Text className="text-3xl font-bold mb-2">{temperature}°C</Text>
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500">Min: {tempMin}°C</Text>
          <Text className="text-sm text-gray-500">Max: {tempMax}°C</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
