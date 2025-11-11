import { useEffect, useMemo, useState } from "react";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [sort, setSort] = useState("");

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch("http://localhost:5000/api/products");
				if (!res.ok) throw new Error(`Request failed: ${res.status}`);
				const data = await res.json();
				setProducts(data.products || []);
			} catch (err) {
				setError(err.message || "Failed to fetch");
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	const filtered = useMemo(() => {
		let list = [...products];
		const q = search.trim().toLowerCase();
		if (q) {
			list = list.filter((p) => p.name.toLowerCase().includes(q));
		}
		const min = minPrice === "" ? -Infinity : Number(minPrice);
		const max = maxPrice === "" ? Infinity : Number(maxPrice);
		list = list.filter((p) => {
			const price = Number(p.price);
			return price >= min && price <= max;
		});
		if (sort === "price-asc") list.sort((a, b) => Number(a.price) - Number(b.price));
		if (sort === "price-desc") list.sort((a, b) => Number(b.price) - Number(a.price));
		if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
		if (sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
		return list;
	}, [products, search, minPrice, maxPrice, sort]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Products</h1>

			{loading && <p className="text-gray-600 dark:text-gray-300">Loading products...</p>}
			{error && <p className="text-red-600">Error: {error}</p>}

			{!loading && !error && (
				<>
					<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search products..."
							className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
						/>
						<input
							type="number"
							min="0"
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
							placeholder="Min price"
							className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
						/>
						<input
							type="number"
							min="0"
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
							placeholder="Max price"
							className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
						/>
						<select
							value={sort}
							onChange={(e) => setSort(e.target.value)}
							className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
						>
							<option value="">Sort by</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
							<option value="name-asc">Name: A to Z</option>
							<option value="name-desc">Name: Z to A</option>
						</select>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((p) => (
						<div key={p.id} className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
							<img src={p.imageUrl} alt={p.name} className="h-40 w-full rounded-t-lg object-cover" />
							<div className="p-4">
								<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{p.name}</h2>
								<p className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold">${p.price.toFixed(2)}</p>
							</div>
						</div>
						))}
						{filtered.length === 0 && (
							<p className="text-gray-600 dark:text-gray-300">No products match your filters.</p>
						)}
					</div>
				</>
			)}
		</div>
	);
}


