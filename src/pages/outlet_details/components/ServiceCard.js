import { capitalizeWords } from "../../../utils/firebase/string";

function ServiceCard({ serviceName, pricePerItem, quantity, incrementQuantity, decrementQuantity }) {
	return (
		<div className="service-card">
			<div class="service-detail">
				<svg
					width="64"
					height="64"
					viewBox="0 0 64 64"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M48 13.36L48.0267 13.3307M56 10.6667V53.3333C56 54.7478 55.4381 56.1044 54.4379 57.1046C53.4377 58.1048 52.0812 58.6667 50.6667 58.6667H13.3333C11.9188 58.6667 10.5623 58.1048 9.5621 57.1046C8.5619 56.1044 8 54.7478 8 53.3333V10.6667C8 9.25218 8.5619 7.89563 9.5621 6.89543C10.5623 5.89524 11.9188 5.33334 13.3333 5.33334H50.6667C52.0812 5.33334 53.4377 5.89524 54.4379 6.89543C55.4381 7.89563 56 9.25218 56 10.6667Z"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M32 50.6667C36.2435 50.6667 40.3131 48.981 43.3137 45.9804C46.3143 42.9798 48 38.9101 48 34.6667C48 30.4232 46.3143 26.3535 43.3137 23.353C40.3131 20.3524 36.2435 18.6667 32 18.6667C27.7565 18.6667 23.6869 20.3524 20.6863 23.353C17.6857 26.3535 16 30.4232 16 34.6667C16 38.9101 17.6857 42.9798 20.6863 45.9804C23.6869 48.981 27.7565 50.6667 32 50.6667V50.6667Z"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M32 42.6667C29.8783 42.6667 27.8434 41.8238 26.3431 40.3235C24.8429 38.8232 24 36.7884 24 34.6667"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<div class="service-name-price">
					<span class="service-name">{capitalizeWords(serviceName)}</span>
					<span class="service-price">Rp {pricePerItem}/pcs</span>
				</div>
			</div>
			<div class="product-increment">
				<button class="count-btn" onClick={decrementQuantity}>-</button>
				<span class="count-span">{quantity}</span>
				<button class="count-btn" onClick={incrementQuantity}>+</button>
			</div>
		</div>
	);
}

export default ServiceCard;
