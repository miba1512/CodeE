import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${apiBaseUrl}/api/products`;

export default function AdminDashboard() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [form, setForm] = useState({ name: "", price: "", image: "" });
	const [editingId, setEditingId] = useState(null);

	async function load() {
		try {
			setLoading(true);
			const res = await fetch(API);
			const data = await res.json();
			setProducts(data.products || []);
		} catch (e) {
			setError(e.message || "Failed to load");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		load();
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	}

	async function handleCreate(e) {
		e.preventDefault();
		try {
			const res = await fetch(API, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: form.name, price: Number(form.price), image: form.image })
			});
			if (!res.ok) throw new Error("Create failed");
			setForm({ name: "", price: "", image: "" });
			await load();
		} catch (e) {
			alert(e.message);
		}
	}

	function startEdit(p) {
		setEditingId(p.id);
		setForm({ name: p.name, price: String(p.price), image: p.imageUrl || p.image || "" });
	}

	async function handleUpdate(id) {
		try {
			const res = await fetch(`${API}/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: form.name, price: Number(form.price), image: form.image })
			});
			if (!res.ok) throw new Error("Update failed");
			setEditingId(null);
			setForm({ name: "", price: "", image: "" });
			await load();
		} catch (e) {
			alert(e.message);
		}
	}

	async function handleDelete(id) {
		if (!confirm("Delete this product?")) return;
		try {
			const res = await fetch(`${API}/${id}`, { method: "DELETE" });
			if (!res.ok && res.status !== 204) throw new Error("Delete failed");
			await load();
		} catch (e) {
			alert(e.message);
		}
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>

			<div className="mb-8 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4">
				<h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Add Product</h2>
				<form onSubmit={handleCreate} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<input
						name="name"
						placeholder="Name"
						value={form.name}
						onChange={handleChange}
						required
						className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
					/>
					<input
						name="price"
						type="number"
						placeholder="Price"
						value={form.price}
						min="0"
						step="0.01"
						onChange={handleChange}
						required
						className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
					/>
					<input
						name="image"
						placeholder="Image URL"
						value={form.image}
						onChange={handleChange}
						className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
					/>
					<button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
						Add
					</button>
				</form>
			</div>

			{loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
			{error && <p className="text-red-600">{error}</p>}

			{!loading && !error && (
				<div className="overflow-x-auto rounded-lg border dark:border-gray-700">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-900">
							<tr>
								<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Image</th>
								<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
								<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
								<th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
							{products.map((p) => (
								<tr key={p.id}>
									<td className="px-4 py-2">
										{(p.imageUrl || p.image) && (
											<img src={p.imageUrl || p.image} alt={p.name} className="h-14 w-20 rounded object-cover" />
										)}
									</td>
									<td className="px-4 py-2">
										{editingId === p.id ? (
											<input
												name="name"
												value={form.name}
												onChange={handleChange}
												className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
											/>
										) : (
											<span className="text-gray-900 dark:text-gray-100">{p.name}</span>
										)}
									</td>
									<td className="px-4 py-2">
										{editingId === p.id ? (
											<input
												name="price"
												type="number"
												min="0"
												step="0.01"
												value={form.price}
												onChange={handleChange}
												className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
											/>
										) : (
											<span className="text-gray-900 dark:text-gray-100">${Number(p.price).toFixed(2)}</span>
										)}
									</td>
									<td className="px-4 py-2 text-right">
										{editingId === p.id ? (
											<div className="flex justify-end gap-2">
												<button
													onClick={() => handleUpdate(p.id)}
													className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
												>
													Save
												</button>
												<button
													onClick={() => {
														setEditingId(null);
														setForm({ name: "", price: "", image: "" });
													}}
													className="rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900"
												>
													Cancel
												</button>
											</div>
										) : (
											<div className="flex justify-end gap-2">
												<button
													onClick={() => startEdit(p)}
													className="rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900"
												>
													Edit
												</button>
												<button
													onClick={() => handleDelete(p.id)}
													className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
												>
													Delete
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}


