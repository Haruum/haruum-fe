import OrderCard from "./OrderCard";

function OrdersList() {
	return (
		<section class="section">
			<div class="list__wrapper">
				<OrderCard />
				<OrderCard />
				<OrderCard />
			</div>
		</section>
	);
}

export default OrdersList;
