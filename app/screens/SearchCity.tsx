import React, { useEffect, useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, FlatList, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import citiesList from 'cities-list';
import { Weather } from '../types/weather';
import * as Location from 'expo-location';
import { getWeather } from '../services/get_weather';
import { WeatherCard } from '../components/card';
import LottieView from 'lottie-react-native';

const SearchCityWeather = () => {
    const [search, setSearch] = useState<string>('');
    const [cities] = useState<string[]>(Object.keys(citiesList));
    const [filteredData, setFilteredData] = useState<string[]>(cities);
    const [cityWeather, setCityWeather] = useState<Weather>();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const updateSearch = (search: string) => {
        setSearch(search);
        if (search.trim() === '') {
            setFilteredData([]);
        } else {
            const filtered = cities.filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    const handleOnPress = async (search_city: string) => {
        setLoading(true);
        setSearch(search_city.trim());
        setFilteredData([]);
        const weather = await getWeather(search_city.trim());
        setCityWeather(weather);
        setLoading(false);
    };

    const handleOnClear = () => {
        fetchWeatherUser()
    };

    const fetchWeatherUser = async () => {
        const weather = await getWeather("");
        setCityWeather(weather);
        setLoading(false);
        const userLocation = await Location.getCurrentPositionAsync({}); // a enlever si on met en argument la location, comme la page sera appelé d'index
        setLocation(userLocation);
    };

    useEffect(() => {
        fetchWeatherUser();
    }, []);

    if (!location) {
        return (
            <View>
                <Text>Veuillez activer la localisation pour obtenir les informations météo.</Text>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {loading ? (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <LottieView
                        style={{ flex: 1 }}
                        source={require('../../assets/animations/loading.json')}
                        autoPlay
                        loop
                    />
                </View>
            ) :
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Paris..."
                        onChangeText={updateSearch}
                        value={search}
                        onClear={handleOnClear}
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.inputSearchContainer}
                        inputStyle={styles.inputStyle}
                    />
                    {search.trim() !== '' && (
                        <FlatList
                            style={styles.suggestionList}
                            data={filteredData}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Text
                                    style={styles.listItem}
                                    onPress={() => handleOnPress(item)}
                                >
                                    {item}
                                </Text>
                            )}
                        />
                    )}
                    <View className="flex-1 justify-center mb-20 bg-white">
                        {cityWeather && <WeatherCard cityWeather={cityWeather} searched={search} />}
                    </View>
                </View>
            }
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    searchContainer: {
        width: '92%',
        backgroundColor: 'transparent',
        padding: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 0,
        marginTop: 10,
        alignSelf: 'center',
    },
    inputSearchContainer: {
        backgroundColor: '#e2e2e2',
        borderRadius: 8,
        height: 50,
    },
    inputStyle: {
        fontSize: 18,
        color: '#000',
    },
    suggestionList: {
        position: 'absolute',
        top: 80,
        marginTop: 20,
        zIndex: 1,
        backgroundColor: 'white',
        maxHeight: '60%',
        width: '90%',
        alignSelf: 'center',
    },
    listItem: {
        padding: 16,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    }
});

export default SearchCityWeather;
