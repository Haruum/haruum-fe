import { Rating } from "react-simple-star-rating";
import ReviewTitle from "./ReviewTitle";
import ReviewInput from "./ReviewInput";
import Button from "../../../common/Button";

function RatingModal({ setRating, comment, setComment, submitRating }) {
	return (
		<>
			<ReviewTitle />
			<Rating onClick={setRating}/>
			<ReviewInput comment={comment} setComment={setComment}/>
			<Button text={"Submit Review"} className={"review-button"} onClick={submitRating}/>
		</>
	);
}

export default RatingModal;
