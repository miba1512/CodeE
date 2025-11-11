import { useEffect, useState } from "react";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const isDark = stored === "dark";
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);

	function toggleDark() {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	}

	return (
		<nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<a href="/" className="text-xl font-bold text-indigo-700 dark:text-indigo-400">E-commerce</a>

					<div className="hidden md:flex items-center gap-6">
						<a href="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Home</a>
						<a href="/products" className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Products</a>
						<a href="/cart" className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Cart</a>
						<a href="/login" className="rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700 transition-colors">Login</a>
						<button
							onClick={toggleDark}
							className="rounded-md border px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							aria-label="Toggle dark mode"
						>
							{dark ? "Light" : "Dark"}
						</button>
					</div>

					<div className="md:hidden flex items-center gap-2">
						<button
							onClick={toggleDark}
							className="rounded-md border px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							aria-label="Toggle dark mode"
						>
							{dark ? "L" : "D"}
						</button>
						<button
							onClick={() => setOpen((v) => !v)}
							className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
							aria-label="Toggle menu"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{open && (
				<div className="md:hidden border-t dark:border-gray-800 bg-white dark:bg-gray-900">
					<div className="px-4 py-3 space-y-2">
						<a href="/" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400">Home</a>
						<a href="/products" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400">Products</a>
						<a href="/cart" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400">Cart</a>
						<a href="/login" className="inline-block rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700">Login</a>
					</div>
				</div>
			)}
		</nav>
	);
}


