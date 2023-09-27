function LaundryCard({ outletName, address, rating, onOrderClick }) {
	return (
		<div class="laundry-card-rectangle">
			<div class="outlet-card-information">
				<span class="laundry-card-outlet-name">{outletName}</span>
				<div class="text-icons">
					<i class="fa fa-map-marker icon"></i>
					<span class="laundry-card-location-name">{address}</span>
				</div>
				<div class="star-rating">
					{Array.from({ length: Math.floor(rating) }).map((_) => (
						<i class="fa fa-star icon"></i>
					))}
					{Array.from({ length: (5 - Math.floor(rating)) }).map((_) => (
						<i class="fa fa-star icon hollow"></i>
					))}
					<span class="rating-text">Rating - {rating}</span>
				</div>
			</div>
			<div class="button-holder">
				<div class="card-line"></div>
				<button class="order-button" onClick={onOrderClick}>
					<span>Order Now</span>
					<i class="fa fa-arrow-right icon"></i>
				</button>
			</div>
		</div>
	);
}

export default LaundryCard;
