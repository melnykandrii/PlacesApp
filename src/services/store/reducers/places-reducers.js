import {
  ADD_PLACE,
  SET_PLACES,
  DELETE_PLACE,
  UPDATE_PLACE,
} from "../actions/places-actions";
import Place from "../../models/place";

const initialState = {
  places: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((pl) => pl.id !== action.pid),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(pl.id, pl.title, pl.imageUri, pl.address, pl.lat, pl.lng)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        //new Date().toString(), //temporary provided the id
        action.placeData.id,
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    case UPDATE_PLACE:
      const placeIndex = state.places.findIndex((pl) => pl.id === action.pid);
      const updatedPlace = new Place(
        action.pid,
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      const updatedPlaces = [...state.places];
      updatedPlaces[placeIndex] = updatedPlace;
      return { ...state, places: updatedPlaces };
    default:
      return state;
  }
};
