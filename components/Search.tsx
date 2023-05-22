import React, { useState } from "react";
import { useThunkDispatch } from "../core/store/store";
import { Box, Flex, Icon, Input, Button, IconButton, Text, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { fetchCurrentWeather, fetchTodayForecast } from "../core/store/slices/weatherSlice";

const Search = () => {
  const dispatch = useThunkDispatch();
  const colorMode = useColorMode().colorMode;
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const geocode = async () => {
    const loc = await Location.geocodeAsync(city);
    if (loc.length === 0) {
      setError(true);
      console.log(error);
    } else {
      const lat = loc[0].latitude;
      const lon = loc[0].longitude;
      dispatch(fetchCurrentWeather({ lat, lon }));
      dispatch(fetchTodayForecast({ lat, lon }));
    }
  };

  return (
    <>
      <Flex width="90%" direction="row" alignItems="baseline" justifyContent="space-between">
        <Input
          width="220px"
          mb={0.2}
          borderColor="blue.500"
          variant="rounded"
          InputLeftElement={
            <Icon as={<Ionicons name="search" size={24} />} size={5} ml="2" color="blue.500" />
          }
          color="blue.500"
          placeholder="Search city"
          placeholderTextColor="blue.500"
          value={city}
          onChangeText={setCity}
        />
        <Button onPress={geocode}>Search</Button>
      </Flex>
      {error && (
        <Box width="90%" textAlign="left">
          <Text color={colorMode === "dark" ? "danger.500" : "error.600"}>Wrong city name!</Text>
        </Box>
      )}
    </>
  );
};

export default Search;
