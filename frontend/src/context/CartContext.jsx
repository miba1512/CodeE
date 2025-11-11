import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
	switch (action.type) {
		case "ADD": {
			const existing = state.items.find((it) => it.id === action.item.id);
			if (existing) {
				return {
					...state,
					items: state.items.map((it) =>
						it.id === action.item.id ? { ...it, qty: it.qty + (action.item.qty || 1) } : it
					)
				};
			}
			return {
				...state,
				items: [...state.items, { ...action.item, qty: action.item.qty || 1 }]
			};
		}
		case "REMOVE": {
			return {
				...state,
				items: state.items.filter((it) => it.id !== action.id)
			};
		}
		case "CLEAR": {
			return { ...state, items: [] };
		}
		default:
			return state;
	}
}

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, { items: [] });

	const addToCart = (item) => dispatch({ type: "ADD", item });
	const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
	const clearCart = () => dispatch({ type: "CLEAR" });

	const value = useMemo(
		() => ({
			items: state.items,
			addToCart,
			removeFromCart,
			clearCart
		}),
		[state.items]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return ctx;
}


