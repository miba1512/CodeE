import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
	const { items, removeFromCart, clearCart } = useCart();
	const subtotal = items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Cart</h1>

			{items.length === 0 ? (
				<p className="text-gray-600">Your cart is empty.</p>
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-4">
						{items.map((item) => (
							<div key={item.id} className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
								{item.imageUrl || item.image ? (
									<img
										src={item.imageUrl || item.image}
										alt={item.name}
										className="h-20 w-28 rounded object-cover"
									/>
								) : null}
								<div className="flex-1">
									<h2 className="text-lg font-semibold">{item.name}</h2>
									<p className="text-sm text-gray-600">
										Price: ${Number(item.price).toFixed(2)} · Qty: {item.qty || 1}
									</p>
								</div>
								<div className="text-right">
									<p className="font-semibold">
										${(Number(item.price) * (item.qty || 1)).toFixed(2)}
									</p>
									<button
										onClick={() => removeFromCart(item.id)}
										className="mt-2 rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="rounded-lg border bg-white p-4 shadow-sm h-fit">
						<h3 className="text-lg font-semibold mb-4">Order Summary</h3>
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-600">Subtotal</span>
							<span className="font-semibold">${subtotal.toFixed(2)}</span>
						</div>
						<div className="mt-4 flex flex-col gap-3">
							<Link
								to="/checkout"
								className="w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
							>
								Proceed to Checkout
							</Link>
							<button
								onClick={clearCart}
								className="w-full rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-50"
							>
								Clear Cart
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


