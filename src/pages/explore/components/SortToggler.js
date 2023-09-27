function SortToggler() {
	return (
		<>
			<div class="sort-container">
				<span class="sort-title">Sort based on</span>
				<div class="sort-form-group">
					<input
						type="radio"
						name="sort-value"
						value="Location"
						id="sort-location"
					/>
					<label for="sort-location">Location</label>
				</div>

				<div class="sort-form-group">
					<input
						type="radio"
						name="sort-value"
						value="Ratings"
						id="sort-ratings"
					/>
					<label for="sort-ratings">Ratings</label>
				</div>

				<div class="sort-form-group">
					<input type="radio" name="sort-value" value="Price" id="sort-price" />
					<label for="sort-price">Price</label>
				</div>
			</div>
		</>
	);
}

export default SortToggler;
