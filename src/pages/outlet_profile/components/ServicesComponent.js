import ServiceCard from "./ServiceCard";

function ServicesComponent({ services, setupModifyCategoryModal }) {
	console.log(services);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				width: "80%",
			}}
		>
			<button className={"confirm-button"} onClick={() => setupModifyCategoryModal("", 0)}>Add Service</button>
			{services.map((service) => (
				<ServiceCard
					service={service}
					setupModifyCategoryModal={setupModifyCategoryModal}
				/>
			))}
		</div>
	);
}

export default ServicesComponent;
