function TransactionItem({ item, pricePerItem, quantity, subTotal }) {
	return (
		<>
			<div class="container__table__row">
				<div class="container__table__col">{item}</div>
				<div class="container__table__col">
					{pricePerItem}
					<span class="container__table__small">x{quantity}</span>
				</div>
				<div class="container__table__col">{subTotal}</div>
			</div>
			<br />
		</>
	);
}

export default TransactionItem;
