let products = [
	{ id: "p1", name: "T-Shirt", price: 19.99, imageUrl: "https://via.placeholder.com/300x200?text=T-Shirt", image: "https://via.placeholder.com/300x200?text=T-Shirt" },
	{ id: "p2", name: "Hoodie", price: 39.99, imageUrl: "https://via.placeholder.com/300x200?text=Hoodie", image: "https://via.placeholder.com/300x200?text=Hoodie" },
	{ id: "p3", name: "Sneakers", price: 89.99, imageUrl: "https://via.placeholder.com/300x200?text=Sneakers", image: "https://via.placeholder.com/300x200?text=Sneakers" }
];

export function getProducts(_req, res) {
	res.json({ products });
}

export function createProduct(req, res) {
	const { name, price, image } = req.body || {};
	if (!name || price === undefined) {
		return res.status(400).json({ message: "name and price are required" });
	}
	const id = `p${Date.now()}`;
	const imageUrl = image || "https://via.placeholder.com/300x200?text=Product";
	const product = { id, name, price: Number(price), imageUrl, image: imageUrl };
	products.push(product);
	res.status(201).json({ product });
}

export function updateProduct(req, res) {
	const { id } = req.params;
	const { name, price, image } = req.body || {};
	const idx = products.findIndex((p) => p.id === id);
	if (idx === -1) return res.status(404).json({ message: "Product not found" });
	const current = products[idx];
	const imageUrl = image ?? current.imageUrl;
	const updated = {
		...current,
		name: name ?? current.name,
		price: price !== undefined ? Number(price) : current.price,
		imageUrl,
		image: imageUrl
	};
	products[idx] = updated;
	res.json({ product: updated });
}

export function deleteProduct(req, res) {
	const { id } = req.params;
	const before = products.length;
	products = products.filter((p) => p.id !== id);
	if (products.length === before) return res.status(404).json({ message: "Product not found" });
	res.status(204).send();
}


