import { GATEWAY_URL } from "./config";
import {
	deleteUser,
	registerUser as registerFirebaseUser,
} from "../utils/firebase";

const REGISTER_OUTLET_URL = `${GATEWAY_URL}auth/register/outlet/`;
const OUTLET_DATA_URL = `${GATEWAY_URL}search/outlet/details/`;
const OUTLET_DATA_TOKEN_BASED_URL = `${GATEWAY_URL}outlet/data/`;
const OUTLET_UPDATE_URL = `${GATEWAY_URL}outlet/update/`;
const OUTLET_UPDATE_SERVICE_URL = `${GATEWAY_URL}outlet/update/services-provided/`;

export const registerOutletBasicData = async (
	email,
	phoneNumber,
	name,
	address,
	latitude,
	longitude,
	password
) => {
	const requestData = {
		email: email,
		phone_number: phoneNumber,
		name: name,
		address: address,
		latitude: latitude,
		longitude: longitude,
		password: password,
	};

	const response = await fetch(REGISTER_OUTLET_URL, {
		method: "POST",
		body: JSON.stringify(requestData),
	});

	const data = await response.json();
	return [response.status, data];
};

export const registerUser = async (
	email,
	phoneNumber,
	name,
	address,
	latitude,
	longitude,
	password
) => {
	const firebaseUser = await registerFirebaseUser(email, password);
	const [status, data] = await registerOutletBasicData(
		email,
		phoneNumber,
		name,
		address,
		latitude,
		longitude,
		password
	);

	if (status !== 200) {
		await deleteUser(firebaseUser);
	}

	return [status, data];
};

export const getOutletData = async (email) => {
	const response = await fetch(`${OUTLET_DATA_URL}?email=${email}`, {
		method: "GET",
	});

	const data = await response.json();
	return [response.status, data];
};

export const getOutletDataToken = async (accessToken) => {
	const response = await fetch(`${OUTLET_DATA_TOKEN_BASED_URL}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const updateOutletData = async (
	isAvailable,
	quota,
	address,
	latitude,
	longitude,
	phoneNumber,
	accessToken
) => {
	const responseData = {
		is_available: isAvailable,
		quota: quota,
		address: address,
		latitude: latitude,
		longitude: longitude,
		phone_number: phoneNumber,
	};

	const response = await fetch(OUTLET_UPDATE_URL, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(responseData),
	});

	const data = await response.json();
	return [response.status, data];
};

export const updateOutletService = async (
	service_category_name,
	price_per_item,
	accessToken
) => {
	const responseData = {
		services_provided: [
			{
				service_category_name: service_category_name,
				price_per_item: price_per_item,
			},
		],
	};

	const response = await fetch(OUTLET_UPDATE_SERVICE_URL, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(responseData),
	});

	const data = await response.json();
	return [response.status, data];
};
