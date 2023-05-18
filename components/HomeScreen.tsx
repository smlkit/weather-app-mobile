import { Heading, View, Button, Text, Image, Box, Stack } from "native-base";
import { useEffect, useState } from "react";
import { useThunkDispatch } from "../core/store/store";
import {
  fetchLocation,
  fetchLocationSelector,
  fetchWeather,
  fetchWeatherSelector,
} from "../core/store/slices/weatherSlice";
import { useSelector } from "react-redux";
import { StatusOfRequestEnum } from "../core/types/enums/StatusOfRequestEnum";
import * as dayjs from "dayjs";
import normalize from "react-native-normalize";

export const HomeScreen = () => {
  const dispatch = useThunkDispatch();
  const { data: location } = useSelector(fetchLocationSelector);
  const { data, status, error } = useSelector(fetchWeatherSelector);
  const [today, setToday] = useState(null);

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude: lat, longitude: lon } = location.coords;
      dispatch(fetchWeather({ lat, lon }));
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      const time = dayjs.unix(data.timestamp).format("dddd, DD/MM/YY");
      setToday(time);
    }
  }, [data]);

  const onRefresh = () => {
    if (location) {
      const { latitude: lat, longitude: lon } = location.coords;
      dispatch(fetchWeather({ lat, lon }));
    }
  };

  if (status === StatusOfRequestEnum.LOADING || status === StatusOfRequestEnum.IDLE) {
    return (
      <View variant="page">
        <Heading>Waiting...</Heading>
      </View>
    );
  }

  return (
    <View variant="page">
      {data && (
        <>
          <Heading size="xl" mb={2}>
            {data.city}
          </Heading>
          <Text letterSpacing={3}>{today}</Text>
          <Box>
            <Image
              size={normalize(250, "height")}
              alt="icon"
              source={{ uri: `https://openweathermap.org/img/wn/${data.icon}@4x.png` }}
            />
          </Box>

          <Stack direction="row" alignItems="center" space={4}>
            <Heading size="3xl">{data.temp.toFixed(0)}°C</Heading>
            <Box>
              <Text>{data.description}</Text>
              <Text>Wind {data.wind.toFixed(0)} km/h</Text>
            </Box>
          </Stack>
          {/* <Button marginTop="20px" onPress={onRefresh}>
            Refresh
          </Button> */}
        </>
      )}
    </View>
  );
};
