import "./App.css";
import Footer from "./common/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./common/NavBar";
import ExplorePage from "./pages/explore/ExplorePage";
import OutletDetailPage from "./pages/outlet_details/OutletDetailPage";
import CustomerOrdersPage from "./pages/customer_orders/CustomerOrder";
import CustomerOrderDetailPage from "./pages/customer_order_details/CustomerOrderDetailPage";
import CustomerRegistrationPage from "./pages/customer_registration/CustomerRegistrationPage";
import { AuthContext } from "./context/auth";
import { useEffect, useState } from "react";
import { getAccessToken, getUserName, getUserType } from "./utils/auth";
import LoginPage from "./pages/login_page/LoginPage";
import Logout from "./pages/logout/Logout";

function App() {
	const [userAuth, setUserAuth] = useState({
		accessToken: getAccessToken(),
		username: getUserName(),
		type: getUserType(),
	});

	useEffect(() => {
		console.log(userAuth);
	}, [userAuth]);

	return (
		<AuthContext.Provider value={[userAuth, setUserAuth]}>
			<BrowserRouter>
				<NavBar />
				<main className="content">
					<Routes>
						<Route path="/explore" element={<ExplorePage />} />
						<Route
							path="/explore/outlet/:email"
							element={<OutletDetailPage />}
						/>
						<Route
							path="/register/customer"
							element={<CustomerRegistrationPage />}
						/>
						{/* <CustomerOrdersPage /> */}
						{/* <CustomerOrderDetailPage /> */}
						<Route path="/logout" element={<Logout />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
