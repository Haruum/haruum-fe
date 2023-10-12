import ReviewCard from "./ReviewCard";

function ReviewList({ reviews }) {
	return (
		<div class="reviews">
			<span>Reviews</span>
			<div class="review-list">
				{reviews.map((review) => <ReviewCard rating={review.rating} comment={review.comment} />)}
			</div>
		</div>
	);
}

export default ReviewList;
