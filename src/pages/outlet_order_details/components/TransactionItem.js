import { capitalizeWords } from "../../../utils/string";

function TransactionItem({ item, pricePerItem, quantity, subTotal }) {
	return (
		<>
			<div class="container__table__row">
				<div class="container__table__col">{capitalizeWords(item)}</div>
				<div class="container__table__col">
					Rp{pricePerItem}
					<span class="container__table__small">x{quantity}</span>
				</div>
				<div class="container__table__col">Rp{subTotal}</div>
			</div>
			<br />
		</>
	);
}

export default TransactionItem;
