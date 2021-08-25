import * as FileSystem from "expo-file-system";
//import { insertPlace, fetchPlaces } from "../../helper/db";
import Place from "../../models/place";
import { locationRequest } from "../../location/location.service";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_PLACE = "DELETE_PLACE";
export const UPDATE_PLACE = "UPDATE_PLACE";

export const deletePlace = (placeId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://myplace121212-default-rtdb.firebaseio.com/myplaces/${placeId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({ type: DELETE_PLACE, pid: placeId });
  };
};

export const updatePlace = (id, title, image, location) => {
  return async (dispatch) => {
    const address = await locationRequest(location);
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      if (image === newPath) {
        newPath === image;
      } else {
        await FileSystem.moveAsync({
          from: image,
          to: newPath,
        });
      }
      const response = await fetch(
        `https://myplace121212-default-rtdb.firebaseio.com/myplaces/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            image: newPath,
            address: address,
            coords: { lat: location.lat, lng: location.lng },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: UPDATE_PLACE,
        pid: id,
        placeData: {
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
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const address = await locationRequest(location);
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const responFire = await fetch(
        "https://myplace121212-default-rtdb.firebaseio.com/myplaces.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            image: newPath,
            address: address,
            coords: { lat: location.lat, lng: location.lng },
          }),
        }
      );
      const ResData = await responFire.json();
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: ResData.name,
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
      //console.log(resData);
      const loadedPlaces = [];
      for (const key in resData) {
        loadedPlaces.push(
          new Place(
            key,
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

//Adding data to local DB
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const address = await locationRequest(location);

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
*/
