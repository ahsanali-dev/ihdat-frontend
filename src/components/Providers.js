"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import { productActions } from "../store/slices/productSlice";

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate public catalog via Redux Thunk
    dispatch(productActions.fetchProducts());
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
