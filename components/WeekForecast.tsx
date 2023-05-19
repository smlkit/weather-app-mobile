import { View, Text, Heading, Box } from "native-base";
import React from "react";

const WeekForecast = () => {
  return (
    <View style={{ height: "100%" }}>
      <Heading>WeekForecast</Heading>
      <Box>
        <Text>NOW</Text>
        <Text>24 C</Text>
        <Text>Sunny</Text>
      </Box>

      <Box>
        <Text>15:00</Text>
        <Text>22 C</Text>
        <Text>Sunny</Text>
      </Box>
    </View>
  );
};

export default WeekForecast;
