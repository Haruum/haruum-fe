import NoActiveOrders from "./NoActiveOrders";
import OrderCard from "./OrderCard";

function OrdersList({ orders, type }) {
	return (
		<section class="section">
			<div class="list__wrapper">
				
				{orders.length > 0 ? orders.map((order) => (
					<OrderCard
						orderID={order.id}
						orderDate={new Date(order.date_created).toLocaleString()}
						outletName={order.outlet_name}
						status={order.status_name}
						itemCount={order.laundry_receipts.reduce(
							(accum, newItem) => accum + newItem.quantity,
							0
						)}
						transactionAmount={order.transaction_amount}
					/>
				)) : <NoActiveOrders type={type}/>}
			</div>
		</section>
	);
}

export default OrdersList;
