function ReviewInput({ comment, setComment }) {
	return (
		<section class="comments-section">
			<textarea
				placeholder="Share us your thoughts.."
				id="comment"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
		</section>
	);
}

export default ReviewInput;
