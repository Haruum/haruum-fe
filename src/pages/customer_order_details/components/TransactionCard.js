import TransactionItem from "./TransactionItem";

function TransactionCard() {
	const paymentMethod = "cash";
	const transactionAmount = 180000;

	return (
		<div class="container__card">
			<h4 class="container__card--header">Transaction Details</h4>
			<div class="container__table">
				<TransactionItem
					item={"Jeans"}
					pricePerItem={3000}
					quantity={4}
					subTotal={12000}
				/>
				<TransactionItem
					item={"Jeans"}
					pricePerItem={3000}
					quantity={4}
					subTotal={12000}
				/>
				<TransactionItem
					item={"Jeans"}
					pricePerItem={3000}
					quantity={4}
					subTotal={12000}
				/>
			</div>
			<p class="container__table__small">Total</p>
			<p class="container__subtotal">{transactionAmount}</p>
			<p class="container__method">paid using {paymentMethod}</p>
		</div>
	);
}

export default TransactionCard;
