import {
  Heading,
  View,
  Button,
  Text,
  Image,
  Box,
  Stack,
  Spinner,
  ScrollView,
  useColorMode,
} from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { useThunkDispatch } from "../core/store/store";
import {
  fetchLocation,
  fetchLocationSelector,
  fetchCurrentWeather,
  fetchCurrentWeatherSelector,
} from "../core/store/slices/weatherSlice";
import { useSelector } from "react-redux";
import { StatusOfRequestEnum } from "../core/types/enums/StatusOfRequestEnum";
import * as dayjs from "dayjs";
import normalize from "react-native-normalize";
import { Modalize } from "react-native-modalize";
import { Dimensions, RefreshControl } from "react-native";
import WeekForecast from "./WeekForecast";
import TodayForecast from "./TodayForecast";
import Search from "./Search";

export const HomeScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useThunkDispatch();
  const { data: location } = useSelector(fetchLocationSelector);
  const { data, status } = useSelector(fetchCurrentWeatherSelector);
  const [today, setToday] = useState(null);
  const colorMode = useColorMode().colorMode;
  const color = colorMode === "dark" ? "#eff6ff" : "#374151";

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude: lat, longitude: lon } = location.coords;
      dispatch(fetchCurrentWeather({ lat, lon }));
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      const time = dayjs.unix(data.timestamp).format("dddd, DD/MM/YY");
      setToday(time);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (status === StatusOfRequestEnum.LOADING || status === StatusOfRequestEnum.IDLE) {
    return (
      <View variant="page">
        <Stack space={5}>
          <Spinner accessibilityLabel="Loading weather" color="blue.500" size="lg" />
          <Heading size="sm">Loading, please wait...</Heading>
        </Stack>
      </View>
    );
  }

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View variant="page" _light={{ color: "red.300" }} _dark={{ color: "blue.300" }}>
      <Modalize ref={modalizeRef} adjustToContentHeight={true}>
        <Box height={Dimensions.get("window").height / 1.15}>
          <WeekForecast />
        </Box>
      </Modalize>
      <ScrollView
        variant="page"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {data && location && (
          <>
            <Search />

            <Stack space={2} direction="row" alignItems="baseline">
              {/* <SimpleLineIcons name="location-pin" size={25} color={color} /> */}
              <Heading size="md" mb={2}>
                {data.city}
              </Heading>
            </Stack>
            {/* <Text letterSpacing={3}>{today}</Text> */}
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

            <TodayForecast lat={location.coords.latitude} lon={location.coords.longitude} />

            <Button mt={10} onPress={onOpen}>
              Weekly forecast
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};
