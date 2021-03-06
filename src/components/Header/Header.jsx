import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { Autocomplete } from "@react-google-maps/api";
export default function Header({ setCoords }) {
  const classes = useStyles();
  const [autoComplite, setAutoComplite] = useState(null);
  const onLoad = (autoC) => setAutoComplite(autoC);
  const onPlaceChanged = () => {
    const lat = autoComplite.getPlace().geometry.location.lat();
    const lng = autoComplite.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          travel advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            explorer new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="search ..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
