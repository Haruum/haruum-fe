import { GATEWAY_URL } from "./config";

const GET_OUTLET_ORDERS = `${GATEWAY_URL}order/outlet/`;
const GET_OUTLET_ORDER_BY_ID_URL = `${GATEWAY_URL}order/outlet/detail/?laundry_order_id=`;
const GET_ALL_ORDER_STATUSES_URL = `${GATEWAY_URL}order/status/all/`;
const UPDATE_ORDER_STATUS = `${GATEWAY_URL}order/status/update/`;

export const getOrderStatuses = async () => {
	const response = await fetch(GET_ALL_ORDER_STATUSES_URL);

	const data = await response.json();
	return [response.status, data];
};

export const getOutletOrders = async (accessToken) => {
	const response = await fetch(GET_OUTLET_ORDERS, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const getOutletOrderById = async (id, accessToken) => {
	const response = await fetch(`${GET_OUTLET_ORDER_BY_ID_URL}${id}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const data = await response.json();
	return [response.status, data];
};

export const updateOrderStatus = async (orderID, statusID, accessToken) => {
	const requestData = {
		laundry_order_id: orderID,
		status_id: statusID,
	};

	const response = await fetch(UPDATE_ORDER_STATUS, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(requestData),
	});

	const data = await response.json();
	return [response.status, data];
};
