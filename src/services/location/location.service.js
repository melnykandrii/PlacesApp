import ENV from "../../../env";

export const locationRequest = async (loc) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${ENV.googleApiKey}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await response.json();
  if (!resData.results) {
    throw new Error("Something went wrong!");
  }
  const address = resData.results[0].formatted_address;
  return address;
};
