import React, { useEffect } from "react";
import { useThunkDispatch } from "../core/store/store";
import { fetchTodayForecast, fetchTodayForecastSelector } from "../core/store/slices/weatherSlice";
import { View, Text, Box, Image } from "native-base";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const TodayForecast = ({ lat, lon }) => {
  const dispatch = useThunkDispatch();
  const { data, status, error } = useSelector(fetchTodayForecastSelector);

  useEffect(() => {
    dispatch(fetchTodayForecast({ lat, lon }));
  }, []);

  return (
    <View>
      <Box width="85%" display="flex" flexDirection="row" marginBottom="15px">
        {data &&
          data.map((el) => (
            <Box display="flex" alignItems="center" justifyContent="center" key={el.time}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${el.icon}@2x.png`,
                }}
                alt="Alternate Text"
                size="sm"
              />
              <Text fontWeight="bold">{el.temp.toFixed(0)}°C</Text>
              <Text>{dayjs.unix(+el.time).format("ha")}</Text>
            </Box>
          ))}
      </Box>
    </View>
  );
};

export default TodayForecast;
