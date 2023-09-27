function OutletDetail({ outletName, address, rating }) {
	// const outletName = "Laundry Pak Ogah";
	// const address = "Jl. Bougenville 2 Blok J1/7, Taman Galaxi";
	// const rating = 3.4;

	return (
		<div class="detail-title">
			<span class="head" id="outlet-name">
				{outletName}
			</span>
			<div class="text-icons mt10">
				<i class="fa fa-map-marker icon"></i>
				<span class="detail-text" id="outlet-address">
					{address}
				</span>
				<div class="star-rating mt10" id="outlet-rating">
					{Array.from({ length: Math.floor(rating) }).map((_) => (
						<i class="fa fa-star icon"></i>
					))}
					<span class="rating-text">Rating - {rating}</span>
				</div>
			</div>
		</div>
	);
}

export default OutletDetail;
