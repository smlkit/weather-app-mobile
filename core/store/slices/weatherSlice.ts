import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import type { RootState } from "../store";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";

interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  wind: number;
  timestamp: number;
  description: string;
  icon: string;
  lat: number;
  lon: number;
}

interface TodayForecast {
  icon: string;
  temp: number;
  time: string;
}

interface weatherSlice {
  fetchCurrentWeather: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: CurrentWeather;
  };
  fetchLocation: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: LocationObject;
  };
  fetchTodayForecast: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: TodayForecast[];
  };
}

const initialState: weatherSlice = {
  fetchCurrentWeather: {
    data: null,
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  fetchLocation: {
    data: null,
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  fetchTodayForecast: {
    data: [],
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.fetchCurrentWeather.status = StatusOfRequestEnum.LOADING;
        state.fetchCurrentWeather.error = null;
        state.fetchCurrentWeather.data = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.fetchCurrentWeather.status = StatusOfRequestEnum.SUCCESS;
        state.fetchCurrentWeather.error = null;
        state.fetchCurrentWeather.data = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.fetchCurrentWeather.error = action.error.message || "unknown error";
        state.fetchCurrentWeather.status = StatusOfRequestEnum.ERROR;
        state.fetchCurrentWeather.data = null;
      })
      .addCase(fetchLocation.pending, (state) => {
        state.fetchLocation.status = StatusOfRequestEnum.LOADING;
        state.fetchLocation.error = null;
        state.fetchLocation.data = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.fetchLocation.status = StatusOfRequestEnum.SUCCESS;
        state.fetchLocation.error = null;
        state.fetchLocation.data = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.fetchLocation.error = action.error.message || "unknown error";
        state.fetchLocation.status = StatusOfRequestEnum.ERROR;
        state.fetchLocation.data = null;
      })
      .addCase(fetchTodayForecast.pending, (state) => {
        state.fetchTodayForecast.status = StatusOfRequestEnum.LOADING;
        state.fetchTodayForecast.error = null;
        state.fetchTodayForecast.data = null;
      })
      .addCase(fetchTodayForecast.fulfilled, (state, action) => {
        state.fetchTodayForecast.status = StatusOfRequestEnum.SUCCESS;
        state.fetchTodayForecast.error = null;
        state.fetchTodayForecast.data = action.payload;
      })
      .addCase(fetchTodayForecast.rejected, (state, action) => {
        state.fetchTodayForecast.error = action.error.message || "unknown error";
        state.fetchTodayForecast.status = StatusOfRequestEnum.ERROR;
        state.fetchTodayForecast.data = null;
      });
  },
});

export const fetchLocation = createAsyncThunk<LocationObject, void, { rejectValue: string }>(
  "weather/fetchLocation",
  async (_, { rejectWithValue }) => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return rejectWithValue("Permission to access location was denied");
      }
      const location = await getCurrentPositionAsync({});
      return location;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentWeather = createAsyncThunk<
  CurrentWeather,
  { lat: number; lon: number },
  { rejectValue: string }
>("weather/fetchCurrentWeather", async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bef09c5f612d5e9d330f7e944a21f1a&units=metric`
    );
    const json = await response.json();

    const weather = {
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      wind: json.wind.speed,
      timestamp: json.dt,
      description: json.weather[0].main,
      icon: json.weather[0].icon,
      lat: lat,
      lon: lon,
    };

    return weather;
  } catch (error) {
    console.log("error", error);
    return rejectWithValue(error);
  }
});

export const fetchTodayForecast = createAsyncThunk<
  TodayForecast[],
  { lat: number; lon: number },
  { rejectValue: string }
>("weather/fetchTodayForecast", async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9bef09c5f612d5e9d330f7e944a21f1a&units=metric`
    );
    const json = await response.json();
    console.log(json);
    const forecast = json.list
      .slice(0, 10)
      .map((el) => ({ icon: el.weather[0].icon, temp: el.main.temp, time: el.dt }));

    console.log(forecast);
    return forecast;
  } catch (error) {
    console.log("error", error);
    return rejectWithValue(error);
  }
});

// export const fetchWeekForecast = createAsyncThunk<
//   WeekForecast[],
//   { lat: number; lon: number },
//   { rejectValue: string }
// >("weather/fetchWeekForecast", async ({ lat, lon }, { rejectWithValue }) => {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9bef09c5f612d5e9d330f7e944a21f1a&units=metric`
//     );
//     const json = await response.json();

//     const forecast = json.list
//       .slice(0, 6)
//       .map((el) => ({ icon: el.weather[0].icon, temp: el.main.temp, time: el.dt }));

//     return forecast;
//   } catch (error) {
//     console.log("error", error);
//     return rejectWithValue(error);
//   }
// });

const selfSelector = (state: RootState) => state.weather;
export const fetchCurrentWeatherSelector = createSelector(selfSelector, (state) => state.fetchCurrentWeather);
export const fetchTodayForecastSelector = createSelector(selfSelector, (state) => state.fetchTodayForecast);

export const fetchLocationSelector = createSelector(selfSelector, (state) => state.fetchLocation);

export default weatherSlice.reducer;
