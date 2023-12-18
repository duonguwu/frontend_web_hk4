// CheckoutContext.js
import { createContext, useState, useContext } from "react";

export const CheckoutContext = createContext();

const initialState = {
  paymentMethod: "cashOnDelivery",
  isPaymentComplete: false,
};

export const CheckoutProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setPaymentMethod = (paymentMethod) => {
    setState((prevState) => ({ ...prevState, paymentMethod }));
  };

  const setPaymentComplete = (isPaymentComplete) => {
    setState((prevState) => ({ ...prevState, isPaymentComplete }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        state,
        setPaymentMethod,
        setPaymentComplete,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// export const useCheckoutContext = () => {
//   const context = useContext(CheckoutContext);
//   if (!context) {
//     throw new Error(
//       "useCheckoutContext must be used within a CheckoutProvider"
//     );
//   }
//   return context;
// };

export default CheckoutProvider;
