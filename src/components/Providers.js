"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import { productActions } from "../store/slices/productSlice";
import { orderActions } from "../store/slices/orderSlice";

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate catalog and order lists via Redux Thunks using Axios
    dispatch(productActions.fetchProducts());
    dispatch(orderActions.fetchOrders());
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
