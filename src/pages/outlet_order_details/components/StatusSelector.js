function StatusSelector({ orderStatuses, selectedStatus, setSelectedStatus }) {
	return (
		<>
			<span>Select Order Status</span>
			<select
				className="form-input width-30"
				onChange={(e) => setSelectedStatus(e.target.value)}
			>
				{orderStatuses.map((orderStatus) =>
					orderStatus.id === selectedStatus ? (
						<option key={orderStatus.id} selected={true} value={orderStatus.id}>
							{orderStatus.name}
						</option>
					) : (
						<option key={orderStatus.id} value={orderStatus.id}>
							{orderStatus.name}
						</option>
					)
				)}
			</select>
		</>
	);
}

export default StatusSelector;
