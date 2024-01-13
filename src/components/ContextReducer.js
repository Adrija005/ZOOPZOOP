// Import necessary React modules and hooks
import React, { createContext, useContext, useReducer } from 'react';

// Create two separate contexts for cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define a reducer function to handle state updates based on actions
const reducer = (state, action) => {
  switch (action.type) {
    // If the action type is "ADD", add a new item to the cart
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    // If the action type is not recognized, log an error message
    default:
      console.log("Error in Reducer");
  }
};

// Create a provider component to wrap the entire application and provide the cart state and dispatch
export const CartProvider = ({ children }) => {
  // Use the useReducer hook to manage state with the defined reducer
  const [state, dispatch] = useReducer(reducer, []);

  // Provide the state and dispatch to the components in the tree
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Create a custom hook to conveniently access the cart state from any component
export const useCart = () => useContext(CartStateContext);

// Create a custom hook to conveniently access the cart dispatch function from any component
export const useDispatchCart = () => useContext(CartDispatchContext);


