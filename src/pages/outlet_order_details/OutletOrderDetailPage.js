import { useNavigate, useParams } from "react-router";
import PageTitle from "../../common/PageTitle";
import TransactionCard from "./components/TransactionCard";
import Loader from "../../common/Loader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
	getOrderStatuses,
	getOutletOrderById,
	updateOrderStatus,
} from "../../api/outletOrder";
import { toast } from "../../utils/toast";
import StatusSelector from "./components/StatusSelector";
import Button from "../../common/Button";
import ReviewCard from "../../common/ReviewCard";
import { BluePill } from "../../common/Pill";

function OutletOrderDetailPage() {
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [orderDetail, setOrderDetail] = useState({});
	const [orderStatuses, setOrderStatuses] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState(null);

	const [userAuth, setUserAuth] = useContext(AuthContext);
	const history = useNavigate();

	const fetchOrderDetail = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await getOutletOrderById(id, userAuth.accessToken);
		if (status === 401) {
			toast.open("Token is expired. Please login again.", "fail");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
			history("/outlet/orders");
		} else {
			setOrderDetail(data);
			setSelectedStatus(data.status_id);
		}
	};

	const fetchOrderStatuses = async () => {
		const [status, data] = await getOrderStatuses();
		if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			setOrderStatuses(data);
		}
	};

	const fetchInitialData = async () => {
		setIsLoading(true);
		await fetchOrderDetail();
		await fetchOrderStatuses();
		setIsLoading(false);
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	const updateOrderStatusCallback = async () => {
		if (userAuth.accessToken === 401) {
			history("/login");
		}

		const [status, data] = await updateOrderStatus(
			id,
			selectedStatus,
			userAuth.accessToken
		);

		if (status === 401) {
			toast.open("Token is expired. Please login again.", "fail");
			history("/login");
		} else if (status === 403) {
			toast.open(data.message, "fail");
			history("/outlet/orders");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			toast.open(data.message, "success");
			history("/outlet/orders");
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div class="container--flex__sub" style={{ gap: "15px" }}>
					<PageTitle title={"Order Details"} />
					<h4 class="subheader">Customer: {orderDetail.customer_name}</h4>
					<div class="review-card width-30" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<BluePill text={"Phone Number: 082312334620"}/>
						Address: {orderDetail.pickup_delivery_address}
					</div>
					<div class="status-pill washed" style={{ width: "fit-content" }}>
						{orderDetail.id}
					</div>
					<TransactionCard
						laundryItems={orderDetail.laundry_receipts}
						transactionAmount={orderDetail.transaction_amount}
						paymentMethod={orderDetail.payment_method_name}
					/>
					{orderDetail.status_name !== "returned" ? (
						<>
							<StatusSelector
								orderStatuses={orderStatuses}
								selectedStatus={selectedStatus}
								setSelectedStatus={setSelectedStatus}
							/>
							<Button
								text={"Update Status"}
								onClick={updateOrderStatusCallback}
							/>
						</>
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

export default OutletOrderDetailPage;
