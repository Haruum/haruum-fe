import { getCustomerData } from "../api/customerAuth";
import { getOutletData } from "../api/outletAuth";
import { signInUser } from "./firebase";

const setAccessToken = (accessToken) => {
	localStorage.setItem("accessToken", accessToken);
};

const setUserName = (name) => {
	localStorage.setItem("userName", name);
};

const setUserType = (type) => {
	localStorage.setItem("type", type);
};

export const getAccessToken = () => {
	const accessToken = localStorage.getItem("accessToken") ?? null;
	try {
		return JSON.parse(accessToken);
	} catch (error) {
		return accessToken;
	}
};

export const getUserName = () => {
	const userName = localStorage.getItem("userName") ?? null;
	try {
		return JSON.parse(userName);
	} catch (error) {
		console.log("CAUGHT");
		return userName;
	}
};

export const getUserType = () => {
	const userType = localStorage.getItem("type") ?? null;
	try {
		return JSON.parse(userType);
	} catch (error) {
		return userType;
	}
};

export const loginUser = async (email, password) => {
	const user = await signInUser(email, password);
	console.log(user);
	const [customerStatus, customerData] = await getCustomerData(
		user.accessToken
	);
	const [outletStatus, outletData] = await getOutletData(user.email);

	if (customerStatus === 200) {
		setAccessToken(user.accessToken);
		setUserName(customerData.name);
		setUserType("customer");

	} else if (outletStatus === 200) {
		setAccessToken(user.accessToken);
		setUserName(outletData.name);
		setUserType("outlet");

	} else {
		throw new Error("Acess token is expired. Please try again");
	}
};

export const logoutUser = () => {
	setAccessToken(null);
	setUserName(null);
	setUserType(null);
};
