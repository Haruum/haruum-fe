function CheckoutButton({ callback }) {
	return (
		<div class="checkout-container">
			<span class="error-text" style={{ visibility: "hidden" }}>
				Please select one of the available services.
			</span>
			<button class="checkout-btn" id="checkout-btn" onClick={callback}>
				<span>Checkout</span>
				<svg
					width="46"
					height="41"
					viewBox="0 0 46 41"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24.7772 9.21954L37.8516 20.8293L24.7772 32.4391M7.96729 20.8293H37.8516H7.96729Z"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<div
				class="purple-line"
				style={{
					position: "relative",
					marginLeft: "auto",
					top: "20px",
					right: "50px",
				}}
			></div>
		</div>
	);
}

export default CheckoutButton;
