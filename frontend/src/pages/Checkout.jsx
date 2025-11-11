import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
	const { clearCart } = useCart();
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [payment, setPayment] = useState("card");
	const [success, setSuccess] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setSuccess(true);
		clearCart();
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Checkout</h1>

			{success ? (
				<div className="rounded-md border bg-green-50 p-4 text-green-700">
					Order Placed Successfully
				</div>
			) : (
				<form onSubmit={handleSubmit} className="max-w-xl space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
							placeholder="Jane Doe"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
						<textarea
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
							className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
							placeholder="123 Main St, City, Country"
							rows={3}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
						<select
							value={payment}
							onChange={(e) => setPayment(e.target.value)}
							className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
						>
							<option value="card">Credit/Debit Card</option>
							<option value="paypal">PayPal</option>
							<option value="cod">Cash on Delivery</option>
						</select>
					</div>
					<div className="pt-2">
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
						>
							Place Order
						</button>
					</div>
				</form>
			)}
		</div>
	);
}


