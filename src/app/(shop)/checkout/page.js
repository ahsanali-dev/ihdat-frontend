"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { orderActions } from "@/store/slices/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ShoppingBag, CreditCard, Truck, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Yup Validation Schema
const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required").min(3, "Name is too short"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[0-9\s-]{10,15}$/, "Invalid phone format (e.g. +92 300 1234567)"),
  address: Yup.string().required("Shipping address is required").min(10, "Please provide complete address details"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal Code/ZIP is required").min(5, "Postal code is too short"),
  paymentMethod: Yup.string().required("Please select a payment option"),
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const products = useSelector((state) => state.products.products);
  
  // Checkout success details
  const [successOrder, setSuccessOrder] = useState(null);

  // Financial calculations
  const shippingCharge = totalAmount >= 10000 ? 0 : 250;
  const finalTotal = totalAmount + shippingCharge;

  const handleSubmit = (values, { setSubmitting }) => {
    // Generate mock order object
    const orderData = {
      customer: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
      },
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        color: item.colorName,
        size: item.size,
        quantity: item.quantity,
        image: item.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600",
      })),
      totalAmount: finalTotal,
    };

    // Dispatch order creation & clear cart via async thunk using Axios
    dispatch(orderActions.createOrder(orderData))
      .unwrap()
      .then((savedOrder) => {
        setSuccessOrder(savedOrder);
        dispatch(cartActions.clearCart());
      })
      .catch((err) => {
        console.error("Order checkout failed:", err);
        alert(err || "Failed to register order. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // If order was successfully completed
  if (successOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[#E4E4E7]/60 p-8 md:p-12 shadow-xl space-y-8 flex flex-col items-center rounded-2xl"
        >
          <CheckCircle2 className="h-16 w-16 text-[#C5A880] stroke-[1.5]" />
          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-light uppercase tracking-wider text-[#111111]">
              Order Confirmed
            </h1>
            <p className="text-sm text-[#71717A] tracking-wider">
              Thank you for shopping with **ihdat**. Your order has been registered successfully.
            </p>
            <p className="text-xs font-semibold text-[#111111] bg-[#FAF6F0] px-4 py-2 border border-[#E4E4E7] inline-block tracking-widest uppercase rounded-lg">
              ORDER ID: {successOrder.id}
            </p>
          </div>

          <div className="h-[1px] w-full bg-[#E4E4E7]/50" />

          {/* Customer info block */}
          <div className="w-full text-left grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#71717A] tracking-wider leading-relaxed">
            <div>
              <h4 className="font-bold text-[#111111] uppercase tracking-widest mb-2">Delivery Address</h4>
              <p>{successOrder.customer.name}</p>
              <p>{successOrder.customer.address}</p>
              <p>{successOrder.customer.city}, {successOrder.customer.postalCode}</p>
              <p>Phone: {successOrder.customer.phone}</p>
            </div>
            <div>
              <h4 className="font-bold text-[#111111] uppercase tracking-widest mb-2">Summary</h4>
              <p>Total Items: {successOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p>Payment: Cash On Delivery</p>
              <p className="text-[#111111] font-bold mt-2">Total Charged: Rs. {successOrder.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#E4E4E7]/50" />

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/products"
              className="px-6 py-3 border border-transparent text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-[#C5A880] hover:text-black transition-colors inline-flex items-center justify-center rounded-lg"
            >
              Continue Shopping <ArrowRight className="h-3.5 w-3.5 ml-2" />
            </Link>
            <Link
              href="/track"
              className="px-6 py-3 border border-[#E4E4E7] text-xs font-semibold uppercase tracking-widest text-[#111111] bg-[#FAF6F0] hover:bg-[#E4E4E7]/30 transition-colors inline-flex items-center justify-center rounded-lg"
            >
              Track Order
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // If cart is empty and checkout page is accessed directly
  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <ShoppingBag className="h-12 w-12 text-[#71717A]/40 mx-auto stroke-[1]" />
        <h2 className="text-xl font-serif font-light uppercase tracking-wider text-[#111111]">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-[#71717A] tracking-wider leading-relaxed">
          Please add clothing items to your bag before proceeding to the checkout screen.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 border border-transparent text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-[#C5A880] hover:text-black transition-colors rounded-lg"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Checkout Form (Formik) - 7 cols */}
        <div className="lg:col-span-7 bg-white border border-[#E4E4E7]/40 p-6 sm:p-10 shadow-xs space-y-8 rounded-2xl">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-light uppercase tracking-wider text-[#1E1E24]">
              Shipping Details
            </h2>
            <p className="text-[10px] text-[#71717A] tracking-widest uppercase">
              Please enter your primary delivery details
            </p>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              postalCode: "",
              paymentMethod: "cod",
            }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                  />
                  <div className="text-[10px] font-bold text-[#7D1D2B]">
                    <ErrorMessage name="name" />
                  </div>
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="e.g. customer@example.com"
                      className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                    />
                    <div className="text-[10px] font-bold text-[#7D1D2B]">
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="e.g. +92 300 1234567"
                      className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                    />
                    <div className="text-[10px] font-bold text-[#7D1D2B]">
                      <ErrorMessage name="phone" />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-1.5">
                  <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Street Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Apartment, suite, street name, house number"
                    className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                  />
                  <div className="text-[10px] font-bold text-[#7D1D2B]">
                    <ErrorMessage name="address" />
                  </div>
                </div>

                {/* City and Postal Code Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      City
                    </label>
                    <Field
                      type="text"
                      name="city"
                      id="city"
                      placeholder="e.g. Lahore / Islamabad / Karachi"
                      className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                    />
                    <div className="text-[10px] font-bold text-[#7D1D2B]">
                      <ErrorMessage name="city" />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="space-y-1.5">
                    <label htmlFor="postalCode" className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Postal Code / ZIP
                    </label>
                    <Field
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="e.g. 54000"
                      className="w-full border border-[#E4E4E7] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#71717A] focus:outline-none focus:border-black rounded-lg"
                    />
                    <div className="text-[10px] font-bold text-[#7D1D2B]">
                      <ErrorMessage name="postalCode" />
                    </div>
                  </div>
                </div>

                {/* Payment Option Swatches */}
                <div className="space-y-3.5 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] block">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* COD Option */}
                    <label className="border border-[#E4E4E7] p-4 flex items-start space-x-3 cursor-pointer bg-[#FAF6F0]/20 hover:border-black rounded-lg">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="mt-1 accent-[#C5A880]"
                      />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#111111] flex items-center">
                          <Truck className="h-3.5 w-3.5 mr-1.5 text-[#C5A880]" /> Cash On Delivery
                        </span>
                        <p className="text-[10px] text-[#71717A]">
                          Pay in cash upon physical shipment receipt.
                        </p>
                      </div>
                    </label>

                    {/* Card Option (Simulated) */}
                    <label className="border border-gray-200 p-4 flex items-start space-x-3 cursor-not-allowed bg-gray-50 opacity-60">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        disabled
                        className="mt-1 accent-[#C5A880]"
                      />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 flex items-center">
                          <CreditCard className="h-3.5 w-3.5 mr-1.5 text-gray-300" /> Card Payment (Coming Soon)
                        </span>
                        <p className="text-[10px] text-gray-400">
                          Credit card payment will be integrated in future phases.
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="text-[10px] font-bold text-[#7D1D2B]">
                    <ErrorMessage name="paymentMethod" />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#111111] hover:bg-[#C5A880] hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center mt-6 rounded-lg"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side: Order Summary - 5 cols */}
        <div className="lg:col-span-5 lg:sticky lg:top-22 bg-[#FAF6F0] border border-[#E4E4E7] p-6 space-y-6 rounded-2xl">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-light uppercase tracking-wider text-[#111111]">
              Order Summary
            </h3>
            <div className="h-[1px] w-full bg-[#E4E4E7]" />
          </div>

          {/* Cart Items List */}
          <div className="divide-y divide-[#E4E4E7]/60 max-h-[300px] overflow-y-auto pr-2">
            {cartItems.map((item) => {
              const productObj = products.find((p) => p.id === item.id);
              const itemImage = item.image || (productObj && productObj.images && productObj.images[0] ? productObj.images[0] : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");
              
              return (
                <div key={`${item.id}-${item.color}-${item.size}`} className="py-4 flex justify-between space-x-4">
                  <div className="flex space-x-3">
                    {/* Swatch mini box */}
                    <div
                      className="h-12 w-10 flex-shrink-0 border border-[#E4E4E7] bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#111111] overflow-hidden relative"
                    >
                      {itemImage ? (
                        <Image src={itemImage} alt={item.name} fill sizes="40px" className="object-cover object-center" />
                      ) : (
                        <span className="bg-white/80 px-1 rounded uppercase z-10">{item.size}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[#111111] font-serif">{item.name}</h4>
                      <p className="text-[9px] text-[#71717A] tracking-wider uppercase">
                        Qty: {item.quantity} | {item.colorName} | Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#111111]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="h-[1px] w-full bg-[#E4E4E7]" />

          {/* Calculations Summary */}
          <div className="space-y-2 text-xs tracking-wider leading-relaxed">
            <div className="flex justify-between text-[#71717A]">
              <span>Cart Subtotal</span>
              <span>Rs. {totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#71717A]">
              <span>Shipping Fee</span>
              <span>{shippingCharge === 0 ? "FREE" : `Rs. ${shippingCharge}`}</span>
            </div>
            <div className="flex justify-between text-[#111111] font-bold text-sm pt-2 border-t border-dashed border-[#E4E4E7]">
              <span>Estimated Total</span>
              <span>Rs. {finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Security details */}
          <div className="bg-white border border-[#E4E4E7] p-4 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-[#C5A880] mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-black">
                Secure Checkout Guarantee
              </span>
              <p className="text-[9px] text-[#71717A] leading-relaxed">
                Your data is safe and encrypted. We maintain the highest standards of safety in processing.
              </p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
