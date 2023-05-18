import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import type { RootState } from "../store";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";

interface Weather {
  city: string;
  temp: number;
  wind: number;
  timestamp: number;
  description: string;
  icon: string;
}

interface Location {
  lat: number;
  lon: number;
}

interface weatherSlice {
  fetchWeather: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Weather;
  };
  fetchLocation: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: LocationObject;
  };
}

const initialState: weatherSlice = {
  fetchWeather: {
    data: null,
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  fetchLocation: {
    data: null,
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
      .addCase(fetchWeather.pending, (state) => {
        state.fetchWeather.status = StatusOfRequestEnum.LOADING;
        state.fetchWeather.error = null;
        state.fetchWeather.data = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.fetchWeather.status = StatusOfRequestEnum.SUCCESS;
        state.fetchWeather.error = null;
        state.fetchWeather.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.fetchWeather.error = action.error.message || "unknown error";
        state.fetchWeather.status = StatusOfRequestEnum.ERROR;
        state.fetchWeather.data = null;
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

export const fetchWeather = createAsyncThunk<Weather, { lat: number; lon: number }, { rejectValue: string }>(
  "weather/fetchWeather",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bef09c5f612d5e9d330f7e944a21f1a&units=metric`
      );
      const json = await response.json();

      const weather = {
        city: json.name,
        temp: json.main.temp,
        wind: json.wind.speed,
        timestamp: json.dt,
        description: json.weather[0].main,
        icon: json.weather[0].icon,
      };

      return weather;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

const selfSelector = (state: RootState) => state.weather;
export const fetchWeatherSelector = createSelector(selfSelector, (state) => state.fetchWeather);
export const fetchLocationSelector = createSelector(selfSelector, (state) => state.fetchLocation);

export default weatherSlice.reducer;
