import { Stack } from "expo-router";
import "../global.css";
import NavbarNavigation from "./components/Navbar";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
        // style={styles.stack} pas sur qu'on puisse lui mettre un style
      />
      <NavbarNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    flex: 1,
  },
});
