import React, { useEffect } from "react";
import { useThunkDispatch } from "../core/store/store";
import { fetchTodayForecast, fetchTodayForecastSelector } from "../core/store/slices/weatherSlice";
import { View, Text, Box, Image } from "native-base";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FlatList } from "react-native";

const TodayForecast = ({ lat, lon }) => {
  const dispatch = useThunkDispatch();
  const { data, status, error } = useSelector(fetchTodayForecastSelector);

  useEffect(() => {
    dispatch(fetchTodayForecast({ lat, lon }));
  }, []);

  return (
    <View height="110px">
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item }) => (
          <Box display="flex" alignItems="center" justifyContent="center" key={item.time}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
              }}
              alt="Alternate Text"
              size="sm"
            />
            <Text fontWeight="bold">{item.temp.toFixed(0)}°C</Text>
            <Text>{dayjs.unix(+item.time).format("ha")}</Text>
          </Box>
        )}
        keyExtractor={(item) => item.time}
      />
    </View>
  );
};

export default TodayForecast;
