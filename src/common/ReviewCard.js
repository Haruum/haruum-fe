function ReviewCard({ rating, comment }) {
	return (
		<div class="review-card width-30">
			<div class="star-and-rating">
				{Array.from({ length: Math.floor(rating) }).map((_) => (
					<i class="fa fa-star icon"></i>
				))}
				<span style={{ color: "black" }}>{rating}</span>
			</div>
			<svg
				width="100%"
				height="1"
				viewBox="0 0 534 1"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line y1="0.5" x2="534" y2="0.5" stroke="#D187FF" />
			</svg>
			<div class="rating-text">{comment}</div>
		</div>
	);
}

export default ReviewCard;
