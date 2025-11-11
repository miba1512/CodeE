import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		// Save a demo user; real apps send to backend
		localStorage.setItem("demo_user", JSON.stringify({ email, password }));
		localStorage.setItem("auth", JSON.stringify({ email, loginAt: new Date().toISOString() }));
		navigate("/");
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Sign Up</h1>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
					<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
						Create account
					</button>
					<Link to="/login" className="text-sm text-indigo-700 hover:underline">
						Already have an account? Login
					</Link>
				</div>
			</form>
		</div>
	);
}


