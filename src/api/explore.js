import { GATEWAY_URL } from "./config";

const EXPLORE_OUTLET_URL = `${GATEWAY_URL}search/outlets/?`;
const OUTLET_DETAIL_URL = `${GATEWAY_URL}search/outlet/details/?email=`;
const OUTLET_REVIEW_URL = `${GATEWAY_URL}outlet/reviews/?email=`;

export const getOutlet = async (name, latitude, longitude) => {
	let baseSearchURL = EXPLORE_OUTLET_URL;

	if (name !== null && name !== "") {
		baseSearchURL += `name=${name}&`;
	}

	if (latitude !== null && longitude !== null) {
		baseSearchURL += `latitude=${latitude}&longitude=${longitude}`;
	}

	const response = await fetch(baseSearchURL);
	return await response.json();
};

export const getOutletByEmail = async (email) => {
	let detailURL = `${OUTLET_DETAIL_URL}${email}`;
	const response = await fetch(detailURL);
	const data = await response.json();

	return [response.status, data];
};

export const getOutletReviews = async (email) => {
	let reviewURL = `${OUTLET_REVIEW_URL}${email}`;
	const response = await fetch(reviewURL);
	const data = await response.json();

	return [response.status, data];
}