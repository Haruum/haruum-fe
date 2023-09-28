import { GATEWAY_URL } from "./config";
import { deleteUser, registerUser as registerFirebaseUser } from "../utils/firebase";
const REGISTER_CUSTOMER_URL = `${GATEWAY_URL}auth/register/customer/`;
const CUSTOMER_DATA_URL = `${GATEWAY_URL}customer/data/`;

export const registerCustomerBasicData = async (
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
	const [status, data] = await registerCustomerBasicData(
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
