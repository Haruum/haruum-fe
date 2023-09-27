import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PinkButton from "../../common/PinkButton";
import {
	registerUser as registerFirebaseUser,
	deleteUser,
} from "../../utils/firebase";
import { getLatitudeLongitudeFromPlaceID } from "../../utils/geocoder";
import { registerCustomer } from "../../api/customerAuth";
import { toast } from "../../utils/toast";

function CustomerRegistrationPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState(null);

	const history = useNavigate();

	const registerCallback = async () => {
		try {
			const firebaseUser = await registerFirebaseUser(email, password);
			const { lat, lng } = await getLatitudeLongitudeFromPlaceID(
				address?.value?.place_id ?? null
			);

			const { status, data } = await registerCustomer(
				email,
				phoneNumber,
				name,
				address?.value?.description ?? null,
				lat,
				lng,
				password
			);

			if (status !== 200) {
				toast.open(data.message, "fail");
				await deleteUser(firebaseUser);
			} else {
				toast.open("User is successfully added", "success");
				history("/login");
			}
		} catch (exception) {
			toast.open(exception.message, "fail");
		}
	};

	return (
		<div class="content-body">
			<section class="page-banner">
				<h2>
					Where <span>convenience</span> meets <span>excellence</span>.
				</h2>
				<h3>join Haruum today</h3>
			</section>
			<section>
				<div class="form-container">
					<div class="form-header">
						<h1>Register as a Customer</h1>
					</div>
					<div className="form-body">
						<div class="form-input__grouper">
							<input type="hidden" name="userType" value="CUSTOMER" />
							<FormInput
								inputField={"name"}
								type={"text"}
								value={name}
								setValue={setName}
							/>
							<FormInput
								inputField={"email"}
								type={"email"}
								value={email}
								setValue={setEmail}
							/>
						</div>
						<div class="form-input__grouper">
							<FormInput
								inputField={"phone number"}
								type={"text"}
								value={phoneNumber}
								setValue={setPhoneNumber}
							/>
							<FormInput
								inputField={"password"}
								type={"password"}
								value={password}
								setValue={setPassword}
							/>
						</div>
						<div class="form-input__group">
							<label for="address" class="form-input__label">
								Address
							</label>
							<GooglePlacesAutocomplete
								selectProps={{
									address,
									onChange: setAddress,
									className: "form-input",
								}}
							/>
						</div>
					</div>
					<PinkButton text={"Register"} onClick={registerCallback} />
				</div>
			</section>
		</div>
	);
}

export default CustomerRegistrationPage;
