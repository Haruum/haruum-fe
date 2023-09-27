import { useContext, useEffect, useState } from "react";
import Banner from "./components/Banner";
import LoginCard from "./components/LoginCard";
import { toast } from "../../utils/toast";
import {
	getAccessToken,
	getUserName,
	getUserType,
	loginUser,
	logoutUser,
} from "../../utils/auth";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userAuth, setUserAuth] = useContext(AuthContext);

	useEffect(() => {
		logoutUser();
		setUserAuth({
			accessToken: null,
			username: null,
			type: null,
		});
	}, []);

	const history = useNavigate();

	const handleLogin = async () => {
		try {
			await loginUser(email, password);
			setUserAuth({
				accessToken: getAccessToken(),
				username: getUserName(),
				type: getUserType(),
			});

			toast.open("Successfully logged in", "success");
			history("/explore");
		} catch (exception) {
			toast.open(exception, "fail");
		}
	};

	return (
		<div class="content-body-login">
			<Banner />
			<LoginCard
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				handleLogin={handleLogin}
			/>
		</div>
	);
}

export default LoginPage;
