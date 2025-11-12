import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		setError("");

		// Dummy auth: accept any non-empty email/password, or check against a stored signup user
		const savedUser = JSON.parse(localStorage.getItem("demo_user") || "null");
		const isMatch =
			savedUser && savedUser.email === email && savedUser.password === password;

		if ((email && password) || isMatch) {
			localStorage.setItem(
				"auth",
				JSON.stringify({ email, loginAt: new Date().toISOString() })
			);
			navigate("/");
		} else {
			setError("Invalid credentials");
		}
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Login</h1>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				{error && <p className="text-sm text-red-600">{error}</p>}

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
						placeholder="you@example.com"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
						placeholder="••••••••"
					/>
				</div>

				<div className="pt-2 flex items-center gap-3">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
					>
						Login
					</button>
					<Link to="/signup" className="text-sm text-indigo-700 hover:underline">
						Create an account
					</Link>
				</div>
			</form>
		</div>
	);
}
