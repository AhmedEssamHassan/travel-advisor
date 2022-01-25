import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const response = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "14f3e0aa8fmsh734ad64355d03c6p1a0ab9jsn4aa6ba9efdb7",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/weather",
        {
          params: { lat, lon: lng },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key":
              "14f3e0aa8fmsh734ad64355d03c6p1a0ab9jsn4aa6ba9efdb7",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
