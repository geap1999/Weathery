import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const weatherIcons: { [key: string]: JSX.Element } = {
    Clear: <Icon name="weather-sunny" size={24} color="#f0f" />,
    Clouds: <Icon name="weather-cloudy" size={24} color="#f0f" />,
    Rain: <Icon name="weather-rainy" size={24} color="#f0f" />,
    Snow: <Icon name="weather-snowy" size={24} color="#f0f" />,
    Thunderstorm: <Icon name="weather-lightning" size={24} color="#f0f" />,
    Mist: <Icon name="weather-fog" size={24} color="#f0f" />,
    Drizzle: <Icon name="weather-partly-rainy" size={24} color="#f0f" />,
    Default: <Icon name="weather-cloudy" size={24} color="#f0f" />,
};

export default weatherIcons;
