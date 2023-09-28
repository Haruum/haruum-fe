import OrderCard from "./OrderCard";

function OrdersList({ orders }) {
	return (
		<section class="section">
			<div class="list__wrapper">
				{orders.map((order) => (
					<OrderCard
						orderID={order.id}
						orderDate={new Date(order.date_created).toLocaleString()}
						customerName={order.customer_name}
						status={order.status_name}
						itemCount={order.laundry_receipts.reduce(
							(accum, newItem) => accum + newItem.quantity,
							0
						)}
						transactionAmount={order.transaction_amount}
					/>
				))}
			</div>
		</section>
	);
}

export default OrdersList;
