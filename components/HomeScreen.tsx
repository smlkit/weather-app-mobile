import {
  Heading,
  View,
  Button,
  Text,
  Image,
  Box,
  Stack,
  Input,
  Icon,
  Spinner,
  ScrollView,
} from "native-base";
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
import { Ionicons } from "@expo/vector-icons";

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
        <Stack space={5}>
          <Spinner accessibilityLabel="Loading weather" color="muted.700" size="lg" />
          <Heading size="sm">Loading, please wait...</Heading>
        </Stack>
      </View>
    );
  }

  return (
    <View variant="page">
      <ScrollView variant="page" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {data && (
          <>
            <Heading size="xl" mb={2}>
              <Ionicons name="location-outline" size={27} />
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

            <Stack direction="row" alignItems="center" space={4} mb={5}>
              <Heading size="3xl">{data.temp.toFixed(0)}°C</Heading>
              <Box>
                <Text>{data.description}</Text>
                <Text>Wind {data.wind.toFixed(0)} km/h</Text>
              </Box>
            </Stack>

            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              variant="rounded"
              placeholderTextColor="muted.400"
              InputLeftElement={
                <Icon as={<Ionicons name="search" size={24} />} size={5} ml="2" color="muted.400" />
              }
              placeholder="Search city"
            />

            {/* <Button marginTop="20px" onPress={onRefresh}>
            Refresh
          </Button> */}
          </>
        )}
      </ScrollView>
    </View>
  );
};
