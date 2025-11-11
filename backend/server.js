import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
	cors({
		origin: FRONTEND_ORIGIN,
		credentials: true
	})
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
	res.json({ status: "ok", service: "ecommerce-backend" });
});

// Routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
	console.log(`Backend running on http://localhost:${PORT}`);
});


