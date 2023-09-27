function Cart({ currentTotal }) {
	return (
		<div class="amount-in-cart">
			<div class="amount-in-cart-details">
				<span class="text">Amount in cart</span>
				<span class="price" id="total-price">
					Rp{currentTotal}
				</span>
			</div>
			<svg
				width="82"
				height="82"
				viewBox="0 0 82 82"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="41" cy="41" r="41" fill="#D187FF" />
				<path
					d="M57.8821 54.6667H30.5488L22.5096 20.902H17.686M24.1174 27.3333H62.7056L57.8821 48.2353H28.9409L24.1174 27.3333Z"
					stroke="white"
					strokeWidth="3.21569"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M54.6669 64.3137C56.4428 64.3137 57.8825 62.874 57.8825 61.098C57.8825 59.3221 56.4428 57.8824 54.6669 57.8824C52.8909 57.8824 51.4512 59.3221 51.4512 61.098C51.4512 62.874 52.8909 64.3137 54.6669 64.3137Z"
					stroke="white"
					strokeWidth="3.21569"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M33.7645 64.3137C35.5405 64.3137 36.9802 62.874 36.9802 61.098C36.9802 59.3221 35.5405 57.8824 33.7645 57.8824C31.9885 57.8824 30.5488 59.3221 30.5488 61.098C30.5488 62.874 31.9885 64.3137 33.7645 64.3137Z"
					stroke="white"
					strokeWidth="3.21569"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

export default Cart;
