import { GATEWAY_URL } from "./config";
const OUTLET_DATA_URL = `${GATEWAY_URL}search/outlet/details/`;

export const getOutletData = async (email) => {
	const response = await fetch(`${OUTLET_DATA_URL}?email=${email}`, {
		method: "GET",
	});

	const data = await response.json();

	return [response.status, data];
};