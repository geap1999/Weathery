# Application Météo

Une application météo développée avec [Expo](https://expo.dev/). Cette application récupère les données météorologiques en temps réel via [OpenWeather API](https://openweathermap.org/api) pour fournir aux utilisateurs les conditions météorologiques actuelles de leur localisation et de leurs villes favorites.

## Fonctionnalités

- **Mises à jour météorologiques en temps réel** : Obtenez des informations précises et actualisées sur la météo.
- **Fonction de recherche** : Consultez la météo de n'importe quelle ville dans le monde.
- **Villes sauvegardées** : Enregistrez vos villes préférées pour accéder rapidement à leur météo.
- **Interface conviviale** : Design intuitif et réactif, optimisé pour les appareils mobiles.

## Technologies utilisées

- **Frontend** : React Native avec Expo
- **API** : OpenWeather API

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v20 ou une version plus récente)
- [Expo](https://docs.expo.dev/get-started/)
- Une clé API valide provenant de [OpenWeather](https://openweathermap.org/api)

## Installation

1. Clonez le repo :

   ```bash
   git clone https://github.com/geap1999/Weathery.git
   cd group-1044391/Weathery
   ```

2. Installez les dépendances :

   ```bash
   npm i
   ```

3. Créez un fichier `.env` dans la racine de l'application et ajoutez votre clé OpenWeather API :

   ```env
   EXPO_PUBLIC_WEATHERY_API_KEY=TA_CLÉ_API
   ```

4. Lancez l'application :

   ```bash
   npm start
   ```

5. Ouvrez l'application sur votre appareil :
   Utilisez l'application Expo Go pour scanner le code QR ou un émulateur iOS/Android.

## Comment utiliser

1. Ouvrez l'application.
2. Utilisez la barre de recherche pour trouver la météo d'une ville spécifique.
3. Enregistrez des villes pour y accéder plus tards.
4. Consultez les détails météorologiques, comme la température, l'humidité, etc...
5. Renseignez vous sur les températures à venir (jours à venir, heures à venir)

## Auteurs

Les gitteurs du quartiers