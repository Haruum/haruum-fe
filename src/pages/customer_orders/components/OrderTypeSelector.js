function OrderTypeSelector({ setOrdersToDisplay }) {
	return (
		<div class="sort-container">
			<span class="sort-title">Order Type</span>
			<br />
			<div class="sort-form-group">
				<input
					type="radio"
					name="sort-value"
					value={"active"}
					onChange={(e) => setOrdersToDisplay(e.target.value)}
				/>
				<label>On Going</label>
			</div>

			<div class="sort-form-group">
				<input
					type="radio"
					name="sort-value"
					value={"completed"}
					onChange={(e) => setOrdersToDisplay(e.target.value)}
				/>
				<label>Completed</label>
			</div>
		</div>
	);
}

export default OrderTypeSelector;
