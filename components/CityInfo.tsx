import React, { useRef } from "react";
import TodayForecast from "./TodayForecast";
import { Box, Button, Heading, Stack, Text, Image } from "native-base";
import normalize from "react-native-normalize";
import { Modalize } from "react-native-modalize";

const CityInfo = ({ data, lat, lon }) => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <Stack space={2} direction="row" alignItems="baseline">
        <Heading size="md" mb={2}>
          {data.city}
        </Heading>
      </Stack>
      <Box>
        <Image
          size={normalize(220, "height")}
          alt="icon"
          source={{ uri: `https://openweathermap.org/img/wn/${data.icon}@4x.png` }}
        />
      </Box>

      <Stack direction="row" alignItems="center" space={4} mb={5}>
        <Heading size="4xl" color="blue.50">
          {data.temp.toFixed(0)}°C
        </Heading>
        <Box>
          <Text>{data.description}</Text>
          <Text>Wind {data.wind.toFixed(0)} km/h</Text>
        </Box>
      </Stack>

      <TodayForecast lat={lat} lon={lon} />

      <Button mt={10} onPress={onOpen}>
        Weekly forecast
      </Button>
    </>
  );
};

export default CityInfo;
