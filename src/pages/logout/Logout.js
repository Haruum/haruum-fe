import { useContext, useEffect } from "react";
import { logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth";

function Logout() {
	const [userAuth, setUserAuth] = useContext(AuthContext);
	const history = useNavigate();

	useEffect(() => {
		logoutUser();
		setUserAuth({
			accessToken: null,
			username: null,
			type: null,
		});
		history("/login");
	}, []);

	return <h1>Logout Page</h1>;
}

export default Logout;
