export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-16 border-t bg-white">
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-sm text-gray-600">
				<p>&copy; {year} E-commerce. All rights reserved.</p>
			</div>
		</footer>
	);
}


