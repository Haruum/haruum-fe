import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyCrxj5mT3Qo0u8keyjVkkNRdwg6QYAsT3M",
	authDomain: "haruum-auth.firebaseapp.com",
	projectId: "haruum-auth",
	storageBucket: "haruum-auth.appspot.com",
	messagingSenderId: "461436233451",
	appId: "1:461436233451:web:4ee81be49c6485ac08c0ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const registerUser = async (email, password) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	return userCredential.user;
};

export const deleteUser = async (user) => {
	await user.delete();
};

export const signInUser = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	return userCredential.user;
};
