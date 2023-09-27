import ReviewCard from "./ReviewCard";

function ReviewList() {
	return (
		<div class="reviews">
			<span>Reviews</span>
			<div class="review-list">
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</div>
		</div>
	);
}

export default ReviewList;
