import { GATEWAY_URL } from "./config";

const GET_ALL_PAYMENT_METHODS_URL = `${GATEWAY_URL}order/payment/all/`;
const CREATE_ORDER_URL = `${GATEWAY_URL}order/create/`;

export const getAllPaymentMethods = async () => {
	const response = await fetch(GET_ALL_PAYMENT_METHODS_URL);
	const data = await response.json();
	return [response.status, data];
};

export const submitOrder = async (
	outlet_email,
	pickup_delivery_address,
	payment_method_id,
	ordered_items,
	accessToken
) => {
	const requestData = {
		assigned_outlet_email: outlet_email,
		pickup_delivery_address: pickup_delivery_address,
		payment_method_id: payment_method_id,
		ordered_items: ordered_items,
	};

	const response = await fetch(CREATE_ORDER_URL, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(requestData),
	});

	const data = await response.json();
	return [response.status, data];
};
