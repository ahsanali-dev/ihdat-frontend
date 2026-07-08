import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";
import quickViewReducer from "./slices/quickViewSlice";
import reviewReducer from "./slices/reviewSlice";
import customOrderReducer from "./slices/customOrderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    auth: authReducer,
    quickView: quickViewReducer,
    reviews: reviewReducer,
    customOrders: customOrderReducer,
  },
});

export default store;
