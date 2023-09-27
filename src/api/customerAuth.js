import { GATEWAY_URL } from "./config";

const REGISTER_CUSTOMER_URL = `${GATEWAY_URL}auth/register/customer/`;
const CUSTOMER_DATA_URL = `${GATEWAY_URL}customer/data/`;

export const registerCustomer = async (
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

	const response = await fetch(REGISTER_CUSTOMER_URL, {
		method: "POST",
		body: JSON.stringify(requestData),
	});

	const data = await response.json();

	return { status: response.status, data: data };
};

export const getCustomerData = async (accessToken) => {
	const response = await fetch(CUSTOMER_DATA_URL, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};
