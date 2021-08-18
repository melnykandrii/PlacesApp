import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helper/db";
import ENV from "../../../../env";
import Place from "../../models/place";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    // console.log(resData);
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }
    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResults = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      const responFire = await fetch(
        "https://myplace121212-default-rtdb.firebaseio.com/myplaces.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: dbResults.insertId,
            title: title,
            image: newPath,
            address: address,
            coords: { lat: location.lat, lng: location.lng },
          }),
        }
      );

      const rData = await responFire.json();

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResults.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
//Retriving data from Firebase DB;
export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://myplace121212-default-rtdb.firebaseio.com/myplaces.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      // console.log(resData);
      const loadedPlaces = [];
      for (const key in resData) {
        loadedPlaces.push(
          new Place(
            key + resData[key].id,
            resData[key].title,
            resData[key].image,
            resData[key].address,
            resData[key].coords.lat,
            resData[key].coords.lng
          )
        );
      }
      dispatch({ type: SET_PLACES, places: loadedPlaces });
    } catch (err) {
      //send to analytics server
      throw err;
    }
  };
};
//Retriving data from local DB
/*
export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResults = await fetchPlaces();
      // console.log(dbResults);
      dispatch({ type: SET_PLACES, places: dbResults.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
*/
