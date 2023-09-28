import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import FormInput from "../../../common/FormInput";

function UpdateBasicDataModal({
	isAvailable,
	setIsAvailable,
	quota,
	setQuota,
	address,
	setAddress,
	phoneNumber,
	setPhoneNumber,
  submitCallback,
  cancelCallback
}) {
	return (
		<div className="container--flex__sub" style={{ padding: "15px" }}>
			<FormInput
				inputField={"phone number"}
				type={"text"}
				value={phoneNumber}
				setValue={setPhoneNumber}
			/>

			<FormInput
				inputField={"quota"}
				type={"number"}
				value={quota}
				setValue={(e) => setQuota(Number(e))}
			/>

			<div class="form-input__group">
				<label class="form-input__label">Outlet Availability Status</label>
				<select
					className="form-input"
					onChange={(e) => setIsAvailable(e.target.value === "available")}
				>
					<option value={"available"} selected={isAvailable}>Available</option>
					<option value={"not available"} selected={!isAvailable}>Not Available</option>
				</select>
			</div>

			<div class="form-input__group">
				<label for="address" class="form-input__label">
					Address
				</label>
				<GooglePlacesAutocomplete
					selectProps={{
						defaultInputValue: address,
						onChange: (addr) => setAddress(addr.value.description),
						className: "form-input",
					}}
				/>
			</div>

			<div style={{ display: "flex" }}>
				<button className={"status-pill returned"} style={{ border: 0 }} onClick={submitCallback}>
					Update
				</button>
				<button className={"status-pill washed"} style={{ border: 0 }} onClick={cancelCallback}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default UpdateBasicDataModal;
