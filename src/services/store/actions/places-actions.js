import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helper/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "dummy address",
        15.453322334,
        17.455322833
      );

      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResults.insertId, title: title, image: newPath },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

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
