import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { Language } from "@material-ui/icons";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [filteerdPlaces, setFilteerdPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [weatherData, setWheatherData] = useState([]);

  /* locate the map on user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  /* manage loading, gitting data, manage filtering by type */
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng).then((data) => {
        setWheatherData(data);
      });

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteerdPlaces([]);
        setRating("");
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((place, i) => place.rating > rating);
    setFilteerdPlaces(filteredPlaces);
    console.log(filteredPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ wigth: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteerdPlaces.length ? filteerdPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCordinates={setCoords}
            setBounds={setBounds}
            cordinates={coords}
            places={filteerdPlaces.length ? filteerdPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}
