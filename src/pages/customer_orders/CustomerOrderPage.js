import { useContext, useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import OrdersList from "./components/OrdersList";
import {
	getActiveCustomerOrders,
	getCompletedCustomerOrders,
} from "../../api/customerOrder";
import { AuthContext } from "../../context/auth";
import { toast } from "../../utils/toast";
import { useNavigate } from "react-router";
import OrderTypeSelector from "./components/OrderTypeSelector";

function CustomerOrdersPage() {
	const [userAuth, setUserAuth] = useContext(AuthContext);
	const [customerActiveOrders, setActiveCustomerOrders] = useState([]);
	const [customerCompletedOrders, setCompletedCustomerOrders] = useState([]);

	const [ordersToDisplay, setOrdersToDisplay] = useState("active");

	const history = useNavigate();

	const fetchActiveCustomerOrders = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await getActiveCustomerOrders(userAuth.accessToken);
		if (status === 401) {
			toast.open("Access token is expired. Please login again.", "fail");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			setActiveCustomerOrders(data);
		}
	};

	const fetchCompletedCustomerOrders = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await getCompletedCustomerOrders(
			userAuth.accessToken
		);
		if (status === 401) {
			toast.open("Access token is expired. Please login gain.", "fail");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			setCompletedCustomerOrders(data);
		}
	};

	const fetchInitialData = async () => {
		await fetchActiveCustomerOrders();
		await fetchCompletedCustomerOrders();
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	return (
		<>
			<div className="container--flex">
				<div className="container--flex__sub">
					<OrderTypeSelector setOrdersToDisplay={setOrdersToDisplay} />
				</div>
				<div
					className="container--flex__sub"
					style={{ justifyContent: "center" }}
				>
					<PageTitle title={"List of Orders"} />
					{ordersToDisplay === "active" ? (
						<OrdersList orders={customerActiveOrders} type={"active"}/>
					) : (
						<OrdersList orders={customerCompletedOrders} type={"completed"}/>
					)}
					<div class="blob-1"></div>
					<div class="blob-2"></div>
				</div>
			</div>
		</>
	);
}

export default CustomerOrdersPage;
