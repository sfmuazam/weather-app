import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "./src/constant";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import WeatherSearch from "./src/components/weatherSearch";
import WeatherInfo from "./src/components/weatherInfo";

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [status, setStatus] = useState("");

  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
        return (
          <Text style={styles.errorStatus}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return;
    }
  };

  const searchWeather = (location) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15;
        data.main.temp = Math.round(data.main.temp);
        setWeatherData(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/image/gradient-bg.jpg")}
        style={styles.gradientBg}
      >
        <WeatherSearch searchWeather={searchWeather} />
        <View style={styles.margintTop20}>{renderComponent()}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
  },
  margintTop20: {
    marginTop: 20,
  },
  gradientBg: {
    flex: 1,
  },
  errorStatus: {
    paddingHorizontal: 20,
    color: "#fff",
  },
});

export default App;
