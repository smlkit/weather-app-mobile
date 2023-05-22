import { Heading, View, Box, Stack, Spinner, ScrollView, useColorMode } from "native-base";
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
import { Modalize } from "react-native-modalize";
import { Dimensions, RefreshControl } from "react-native";
import WeekForecast from "./WeekForecast";
import Search from "./Search";
import CityInfo from "./CityInfo";

export const HomeScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useThunkDispatch();
  const { data: location } = useSelector(fetchLocationSelector);
  const { data, status } = useSelector(fetchCurrentWeatherSelector);

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude: lat, longitude: lon } = location.coords;
      dispatch(fetchCurrentWeather({ lat, lon }));
    }
  }, [location]);

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
            <CityInfo data={data} lat={data.lat} lon={data.lon} />
          </>
        )}
      </ScrollView>
    </View>
  );
};
