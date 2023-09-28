import "./App.css";
import Footer from "./common/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./common/NavBar";
import ExplorePage from "./pages/explore/ExplorePage";
import OutletDetailPage from "./pages/outlet_details/OutletDetailPage";
import OutletRegistrationPage from "./pages/outlet_registration/OutletRegistrationPage";
import CustomerOrdersPage from "./pages/customer_orders/CustomerOrderPage";
import CustomerOrderDetailPage from "./pages/customer_order_details/CustomerOrderDetailPage";
import CustomerRegistrationPage from "./pages/customer_registration/CustomerRegistrationPage";
import { AuthContext } from "./context/auth";
import { useState } from "react";
import { getAccessToken, getUserName, getUserType } from "./utils/auth";
import LoginPage from "./pages/login_page/LoginPage";
import Logout from "./pages/logout/Logout";
import OutletOrdersPage from "./pages/outlet_orders/OutletOrderPage";
import OutletOrderDetailPage from "./pages/outlet_order_details/OutletOrderDetailPage";
import OutletProfilePage from "./pages/outlet_profile/OutletProfilePage";

function App() {
	const [userAuth, setUserAuth] = useState({
		accessToken: getAccessToken(),
		username: getUserName(),
		type: getUserType(),
	});

	return (
		<AuthContext.Provider value={[userAuth, setUserAuth]}>
			<BrowserRouter>
				<NavBar />
				<main className="content">
					<Routes>
						<Route path="/logout" element={<Logout />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/explore" element={<ExplorePage />} />
						<Route
							path="/register/customer"
							element={<CustomerRegistrationPage />}
						/>
						<Route
							path="/explore/outlet/:email"
							element={<OutletDetailPage />}
						/>
						<Route path="/customer/orders/" element={<CustomerOrdersPage />} />
						<Route
							path="/customer/order/:id"
							element={<CustomerOrderDetailPage />}
						/>

						<Route
							path="/register/outlet/"
							element={<OutletRegistrationPage />}
						/>
						<Route path="/outlet/orders/" element={<OutletOrdersPage />} />
						<Route
							path="/outlet/order/:id"
							element={<OutletOrderDetailPage />}
						/>
						<Route path="/outlet/profile" element={<OutletProfilePage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
