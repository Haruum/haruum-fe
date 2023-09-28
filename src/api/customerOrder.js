import { GATEWAY_URL } from "./config";

const GET_ALL_PAYMENT_METHODS_URL = `${GATEWAY_URL}order/payment/all/`;

const CREATE_ORDER_URL = `${GATEWAY_URL}order/create/`;
const SUBMIT_RATING_URL = `${GATEWAY_URL}order/review/submit/`;
const GET_ACTIVE_CUSTOMER_ORDERS = `${GATEWAY_URL}order/customer/active/`;
const GET_COMPLETED_CUSTOMER_ORDERS = `${GATEWAY_URL}order/customer/completed/`;
const GET_CUSTOMER_ORDER_BY_ID_URL = `${GATEWAY_URL}order/customer/detail/?laundry_order_id=`;

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

export const getActiveCustomerOrders = async (accessToken) => {
	const response = await fetch(GET_ACTIVE_CUSTOMER_ORDERS, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const getCompletedCustomerOrders = async (accessToken) => {
	const response = await fetch(GET_COMPLETED_CUSTOMER_ORDERS, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const getCustomerOrderById = async (orderID, accessToken) => {
	const response = await fetch(`${GET_CUSTOMER_ORDER_BY_ID_URL}${orderID}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const submitOrderRating = async (
	orderID,
	rating,
	comment,
	accessToken
) => {
	const responseData = {
		laundry_order_id: orderID,
		rating: rating,
		comment: comment,
	};

	const response = await fetch(SUBMIT_RATING_URL, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(responseData),
	});

	const data = await response.json();
	return [response.status, data];
};
