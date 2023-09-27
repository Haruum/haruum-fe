import FormInput from "../../../common/FormInput";
import { Link } from "react-router-dom";

function LoginCard({ email, setEmail, password, setPassword, handleLogin }) {
	return (
		<div class="login-card">
			<div class="form-header">Login</div>
			<div class="form-body">
				<FormInput
					inputField={"email"}
					type={"text"}
					value={email}
					setValue={setEmail}
				/>
				<FormInput
					inputField={"password"}
					type={"password"}
					value={password}
					setValue={setPassword}
				/>
				<button class="form-submit" onClick={handleLogin}>
					Login
				</button>
				<div class="form-subheader">
					New to haruum?{" "}
					<span>
						<Link to="/register">SIGN UP</Link> now!
					</span>
				</div>
			</div>
		</div>
	);
}

export default LoginCard;
