import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function NavbarNavigation() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text
                style={styles.linkContainer}
                onPress={() => router.push("/screens/SavedCities")}
            >
                <View style={styles.item}>
                    <AntDesign name="heart" size={24} color="#fbf2d5" style={styles.icon} />
                    <Text style={styles.content}>Favoris</Text>
                </View>
            </Text>
            <Text
                style={styles.linkContainer}
                onPress={() => router.push("/screens/SearchCity")}
            >
                <View style={styles.item}>
                    <AntDesign name="search1" size={24} color="#fbf2d5" style={styles.icon} />
                    <Text style={styles.content}>Rechercher</Text>
                </View>
            </Text>
            <Text
                style={styles.linkContainer}
                onPress={() => router.push("/screens/CityWeather")}
            >
                <View style={styles.item}>
                    <AntDesign name="cloud" size={24} color="#fbf2d5" style={styles.icon} />
                    <Text style={styles.content}>Accueil</Text>
                </View>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#394a51',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 90,
    },
    linkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        alignItems: 'center',
    },
    content: {
        color: '#fbf2d5',
        fontSize: 14,
        fontFamily: 'roboto',
    },
    icon: {
        marginBottom: 5,
    },
});
