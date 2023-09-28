import { useNavigate, useParams } from "react-router";
import PageTitle from "../../common/PageTitle";
import StatusPill from "../../common/Pill";
import PinkButton from "../../common/PinkButton";
import TransactionCard from "./components/TransactionCard";
import Loader from "../../common/Loader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
	getCustomerOrderById,
	submitOrderRating,
} from "../../api/customerOrder";
import { toast } from "../../utils/toast";
import RatingModal from "./components/RatingModal";
import ReviewCard from "../../common/ReviewCard";

function CustomerOrderDetailPage() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isReviewing, setIsReviewing] = useState(false);
	const [orderDetail, setOrderDetail] = useState({});

	const [userAuth, setUserAuth] = useContext(AuthContext);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState(null);

	const history = useNavigate();

	const fetchOrderDetail = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		setIsLoading(true);
		const [status, data] = await getCustomerOrderById(id, userAuth.accessToken);
		if (status === 401) {
			toast.open("Token is expired. Please login again.", "fail");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
			history("/customer/orders");
		} else {
			setOrderDetail(data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchOrderDetail();
	}, []);

	const submitRatingCallback = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await submitOrderRating(
			id,
			rating,
			comment,
			userAuth.accessToken
		);
		if (status === 401) {
			toast.open("Token is expired. Please login again.", "fail");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
			history("/customer/orders");
		} else {
			toast.open(data.message, "success");
			history("/customer/orders");
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div class="container--flex__sub" style={{ gap: "15px" }}>
					<PageTitle title={"Order Details"} />
					<h4 class="subheader">{orderDetail.outlet_name}</h4>
					<StatusPill status={orderDetail.status_name} />
					<TransactionCard
						laundryItems={orderDetail.laundry_receipts}
						transactionAmount={orderDetail.transaction_amount}
						paymentMethod={orderDetail.payment_method_name}
					/>

					{orderDetail.review === null &&
					orderDetail.status_name === "returned" &&
					!isReviewing ? (
						<PinkButton
							text={"Review"}
							onClick={() => {
								setIsReviewing(true);
							}}
						/>
					) : (
						<></>
					)}

					{orderDetail.review === null && isReviewing ? (
						<RatingModal
							setRating={setRating}
							comment={comment}
							setComment={setComment}
							submitRating={submitRatingCallback}
						/>
					) : (
						<></>
					)}

					{orderDetail.review !== null ? (
						<ReviewCard
							rating={orderDetail.review.rating}
							comment={orderDetail.review.comment}
						/>
					) : (
						<></>
					)}
				</div>
			)}
		</>
	);
}

export default CustomerOrderDetailPage;
