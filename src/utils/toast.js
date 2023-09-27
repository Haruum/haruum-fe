export const toast = {
	open: function (message, type) {
		const toast = document.getElementById("toast");
		const messageContainer = document.getElementById("toastMessage");
		const closeButton = document.getElementById("closeToast");
		messageContainer.innerText = message;
		toast.classList.remove("fail");
		toast.classList.remove("success");
		toast.classList.add("open", type);
		closeButton.addEventListener("click", closeToast);
		setTimeout(() => {
			closeToast();
		}, 3000);
	},
	close: closeToast,
};

function closeToast() {
	const toast = document.getElementById("toast");
	const closeButton = document.getElementById("closeToast");
	toast.classList.remove("open");
	toast.classList.remove("fail");
	toast.classList.remove("success");
	closeButton.removeEventListener("click", closeToast);
}
