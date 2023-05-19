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
  useColorMode,
} from "native-base";
import { useEffect, useRef, useState } from "react";
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
import { SimpleLineIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { TouchableOpacity, Dimensions } from "react-native";
import Modal from "./Modal";

export const HomeScreen = () => {
  const modalizeRef = useRef<Modalize>(null);

  const dispatch = useThunkDispatch();
  const { data: location } = useSelector(fetchLocationSelector);
  const { data, status, error } = useSelector(fetchWeatherSelector);
  const [today, setToday] = useState(null);
  const colorMode = useColorMode().colorMode;
  const color = colorMode === "dark" ? "#f3f4f6" : "#374151";

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
          <Modal />
        </Box>
      </Modalize>
      <ScrollView variant="page" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {data && (
          <>
            <Stack space={2} direction="row" alignItems="baseline">
              <SimpleLineIcons name="location-pin" size={25} color={color} />
              <Heading size="xl" mb={2}>
                {data.city}
              </Heading>
            </Stack>
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
              borderColor="coolGray.400"
              w={{
                base: "75%",
                md: "25%",
              }}
              variant="rounded"
              placeholderTextColor="coolGray.400"
              InputLeftElement={
                <Icon as={<Ionicons name="search" size={24} />} size={5} ml="2" color="coolGray.400" />
              }
              placeholder="Search city"
            />

            <Button mt={10} onPress={onOpen}>
              Weekly forecast
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};
