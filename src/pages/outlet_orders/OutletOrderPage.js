import { useContext, useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import OrdersList from "./components/OrdersList";
import { getOutletOrders } from "../../api/outletOrder";
import { AuthContext } from "../../context/auth";
import { toast } from "../../utils/toast";
import { useNavigate } from "react-router";

function OutletOrdersPage() {
	const [userAuth, setUserAuth] = useContext(AuthContext);
	const [outletOrders, setOutletOrders] = useState([]);
	const history = useNavigate();

	const fetchOutletOrders = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await getOutletOrders(userAuth.accessToken);
		if (status === 401) {
			toast.open("Access token is expired. Please login again.", "fail");
			history("/login");

		} else if (status !== 200) {
			toast.open(data.message, "fail");

		} else {
			setOutletOrders(data);
		}
	};

	useEffect(() => {
    fetchOutletOrders();
  }, []);

	return (
		<>
			<PageTitle title={"List of Orders"} />
			<OrdersList orders={outletOrders}/>
			<div class="blob-1"></div>
			<div class="blob-2"></div>
		</>
	);
}

export default OutletOrdersPage;
