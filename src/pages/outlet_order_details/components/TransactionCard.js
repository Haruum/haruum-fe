import TransactionItem from "./TransactionItem";

function TransactionCard({ laundryItems, transactionAmount, paymentMethod }) {
	return (
		<div class="container__card">
			<h4 class="container__card--header">Transaction Details</h4>
			<div class="container__table">
				{laundryItems.map((laundryItem) => (
					<TransactionItem
						item={laundryItem.service_category_name}
						pricePerItem={laundryItem.subtotal / laundryItem.quantity}
						quantity={laundryItem.quantity}
						subTotal={laundryItem.subtotal}
					/>
				))}
			</div>
			<p class="container__table__small">Total</p>
			<p class="container__subtotal">Rp{transactionAmount}</p>
			<p class="container__method">paid using {paymentMethod}</p>
		</div>
	);
}

export default TransactionCard;
