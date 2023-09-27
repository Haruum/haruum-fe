import { setDefaults, fromPlaceId } from "react-geocode";

const API_KEY = "AIzaSyAuzTtz8_h_S8hGb8IGUKPTzqyN6KiFGrc";

setDefaults({
	key: API_KEY, // Your API key here.
	language: "en", // Default language for responses.
	region: "aus", // Default region for responses.
});

export const getLatitudeLongitudeFromPlaceID = async (placeID) => {
	if (placeID !== null) {
		const { results } = await fromPlaceId(placeID);
		return results[0].geometry.location;

	} else {
		return { lat: null, lng: null };
	}
};
