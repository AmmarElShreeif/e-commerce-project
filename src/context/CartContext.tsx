import { createContext, Dispatch, SetStateAction } from "react";

interface CartContextType {
  cart: never[];
  setCart: Dispatch<SetStateAction<never[]>>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
