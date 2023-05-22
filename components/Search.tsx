import React, { useState } from "react";
import { Box, Icon, Input, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Search = () => {
  const [city, setCity] = useState("");

  const geocode = async () => {
    const loc = await Location.geocodeAsync(city);
    const lat = loc[0].latitude;
    const lon = loc[0].longitude;
    console.log("Geocoded location: ", lat, lon);
  };

  return (
    <Box>
      <Input
        mb={6}
        borderColor="blue.500"
        w={{
          base: "75%",
          md: "25%",
        }}
        variant="rounded"
        InputLeftElement={<Icon as={<Ionicons name="search" size={24} />} size={5} ml="2" color="blue.500" />}
        color="blue.500"
        placeholder="Search city"
        placeholderTextColor="blue.500"
        value={city}
        onChangeText={setCity}
      />
      <Button onPress={geocode}>Search</Button>
    </Box>
  );
};

export default Search;
