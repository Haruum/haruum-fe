import { useState } from "react";
import ItemCart from "./ItemCart";
import TotalPrice from "./Subtotal";
import TitleCart from "./TitleCart";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CheckoutModal({
	items,
	cartAmount,
	cancelCallback,
	submitCallback,
	customerAddress,
	setCustomerAddress,
	paymentMethods,
	setSelectedPaymentMethod,
}) {
	return (
		<div className="modal-body" style={{ gap: "15px" }}>
			<h1 className="h1-order-summary">Order Summary</h1>
			<TitleCart />
			{items
				.filter((item) => item.quantity !== 0)
				.map((item) => (
					<ItemCart
						quantity={item.quantity}
						item={item.service_category_name}
						subtotal={item.subtotal}
					/>
				))}
			<TotalPrice cartAmount={cartAmount} />
			<h1>Please select pickup and delivery address</h1>
			<GooglePlacesAutocomplete
				selectProps={{
					customerAddress,
					defaultInputValue: customerAddress,
					onChange: setCustomerAddress,
					className: "form-input width-30",
				}}
			/>
			<h1>Please select the payment method</h1>
			<select className="form-input width-30">
				{paymentMethods.map((paymentMethod) => (
					<option>{paymentMethod.name}</option>
				))}
			</select>
			<div
				className="two-page-container"
				style={{ display: "flex", flexDirection: "row", gap: 15 }}
			>
				<button className="confirm-button" onClick={submitCallback}>
					Confirm
				</button>
				<button className="cancel-button" onClick={cancelCallback}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default CheckoutModal;
