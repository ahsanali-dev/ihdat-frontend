"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, MessageSquare, User, Mail, Send, Check, X, Edit3, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { reviewActions } from "@/store/slices/reviewSlice";
import { productActions } from "@/store/slices/productSlice";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Validation schema with Yup
const reviewValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Please enter your name."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  rating: Yup.number()
    .min(1, "Rating must be at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars.")
    .required("Please select a rating."),
  comment: Yup.string()
    .trim()
    .required("Please write a review comment."),
});

export default function ReviewsSection({ productId = null, productName = null }) {
  const dispatch = useDispatch();
  const { reviews, loading, error, submitSuccess } = useSelector((state) => state.reviews);
  const products = useSelector((state) => state.products.products);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hover Rating state
  const [hoverRating, setHoverRating] = useState(0);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rating: 5,
      comment: "",
      productId: productId || "",
      productName: productName || "",
    },
    validationSchema: reviewValidationSchema,
    onSubmit: (values) => {
      dispatch(
        reviewActions.addReview({
          name: values.name,
          email: values.email,
          rating: values.rating,
          comment: values.comment,
          productId: values.productId || null,
          productName: values.productName || null,
        })
      );
    },
  });

  useEffect(() => {
    setIsMounted(true);
    dispatch(reviewActions.fetchReviews(productId));
    if (products.length === 0) {
      dispatch(productActions.fetchProducts());
    }
  }, [dispatch, productId, products.length]);

  useEffect(() => {
    if (submitSuccess) {
      formik.resetForm();
      // Auto close modal on success after 2 seconds
      const closeTimer = setTimeout(() => {
        setIsModalOpen(false);
        dispatch(reviewActions.resetSubmitStatus());
      }, 2000);
      
      return () => clearTimeout(closeTimer);
    }
  }, [submitSuccess, dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
    dispatch(reviewActions.resetSubmitStatus());
  };

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      formik.setFieldValue("productId", "");
      formik.setFieldValue("productName", "");
    } else {
      const prod = products.find((p) => p.id === selectedId);
      if (prod) {
        formik.setFieldValue("productId", prod.id);
        formik.setFieldValue("productName", prod.name);
      }
    }
  };

  return (
    <section className="bg-transparent py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/50 pb-8">
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
            Customer Experiences
          </span>
          <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
            Reviews & Testimonials
          </h2>
          <p className="text-xs text-[#71717A] tracking-wider max-w-xl">
            Read what our valued customers have to say about the design, fit, and craftsmanship of ihdat Kotis & Waistcoats.
          </p>
        </div>

        {/* Button to Trigger Modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3.5 bg-black hover:bg-[#C5A880] hover:text-black text-white text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm self-start md:self-end rounded-lg"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Write A Review</span>
        </button>
      </div>

      {/* Slider of Reviews */}
      <div className="w-full">
        {loading && reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="h-6 w-6 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500 font-light tracking-widest">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="border border-dashed border-gray-200 p-16 text-center rounded-2xl space-y-2 max-w-2xl mx-auto">
            <MessageSquare className="h-8 w-8 text-gray-300 mx-auto" />
            <p className="text-sm font-medium text-gray-600">No reviews yet</p>
            <p className="text-xs text-gray-400">
              Be the first to share your experience with our handcrafted wardrobe collection.
            </p>
          </div>
        ) : (
          <div className="w-full relative px-1">
            {isMounted && (
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="reviews-swiper select-none"
              >
                {reviews.map((rev) => (
                  <SwiperSlide key={rev.id || rev._id} className="h-auto pb-4">
                    <div className="relative bg-white p-8 border border-zinc-200/80 hover:border-[#C5A880]/70 transition-all duration-300 h-full flex flex-col justify-between min-h-[250px] group/card hover:shadow-[0_12px_40px_rgba(197,168,128,0.06)] rounded-2xl">
                      {/* Quote Mark Watermark */}
                      <div className="absolute top-6 right-6 opacity-[0.08] text-[#C5A880] select-none pointer-events-none group-hover/card:scale-110 group-hover/card:opacity-[0.15] transition-all duration-500">
                        <Quote className="h-8 w-8" />
                      </div>

                      <div className="space-y-4">
                        {/* Rating Stars & Verification */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < rev.rating
                                    ? "fill-[#C5A880] text-[#C5A880]"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          
                          {/* Verified Badge */}
                          <div className="flex items-center space-x-1 text-[#2D6A4F] text-[8px] font-bold tracking-widest uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2D6A4F]" />
                            <span>Verified Buyer</span>
                          </div>
                        </div>

                        {/* Product Title on top of review */}
                        {rev.productName && !productId ? (
                          <div className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold border-b border-[#C5A880]/10 pb-1.5 leading-relaxed">
                            For: <Link href={`/products/${rev.productId}`} className="hover:text-black underline">{rev.productName}</Link>
                          </div>
                        ) : rev.productName && productId ? (
                          <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium border-b border-gray-100 pb-1.5">
                            Verified Product Review
                          </div>
                        ) : (
                          <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium border-b border-gray-100 pb-1.5">
                            General Feedback
                          </div>
                        )}

                        {/* Review text */}
                        <p className="text-xs text-zinc-700 leading-relaxed tracking-wide font-light italic line-clamp-4">
                          "{rev.comment}"
                        </p>
                      </div>

                      {/* Meta info */}
                      <div className="flex justify-between items-center pt-5 mt-6 border-t border-zinc-200/50">
                        <div className="flex items-center space-x-2">
                          <div className="h-7 w-7 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] text-[10px] font-bold border border-[#C5A880]/10">
                            {rev.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-black tracking-widest uppercase leading-none mb-0.5">
                              {rev.name}
                            </span>
                            <span className="text-[8px] text-[#A1A1AA] tracking-wider uppercase font-light">
                              Customer
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] text-[#A1A1AA] tracking-widest uppercase">
                          {new Date(rev.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>

      {/* Review submission Modal overlay and dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop with Framer Motion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white max-w-lg w-full border border-gray-100 p-8 shadow-2xl z-10 space-y-6 flex flex-col max-h-[90vh] overflow-y-auto rounded-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={loading}
                className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Form Title */}
              <div className="space-y-1.5 border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl uppercase tracking-wider text-black">
                  Share Your Review
                </h3>
                <p className="text-[11px] text-gray-500 tracking-wider">
                  Your email will remain confidential and will not be displayed.
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {error && (
                  <div className="text-[11px] text-[#7D1D2B] bg-[#7D1D2B]/5 border border-[#7D1D2B]/20 p-3 tracking-wide">
                    {error}
                  </div>
                )}

                {/* Success Banner */}
                {submitSuccess && (
                  <div className="text-[11px] text-[#2D6A4F] bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 p-4 tracking-wide flex items-center">
                    <Check className="h-4 w-4 mr-2 text-[#2D6A4F]" />
                    <span className="font-semibold text-black">Thank you! Review submitted successfully.</span>
                  </div>
                )}

                {/* Product Identifier Display / Selector */}
                {productId ? (
                  <div className="bg-[#FAF6F0] p-4 border border-[#C5A880]/20 text-[11px] text-zinc-700 tracking-wide">
                    Reviewing: <span className="font-serif font-bold text-[#C5A880] uppercase tracking-wider">{productName}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24]">
                      Select Product (Optional)
                    </label>
                    <select
                      name="productId"
                      value={formik.values.productId}
                      onChange={handleProductChange}
                      className="w-full bg-[#FAF6F0]/40 border border-gray-200 px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-[#C5A880] transition-colors rounded-lg"
                    >
                      <option value="">General Store Review</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Rating Input selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24]">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => formik.setFieldValue("rating", star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110 duration-150"
                      >
                        <Star
                          className={`h-5.5 w-5.5 ${
                            star <= (hoverRating || formik.values.rating)
                              ? "fill-[#C5A880] text-[#C5A880]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-[10px] font-semibold text-gray-400 ml-2.5 tracking-widest uppercase">
                      {formik.values.rating === 5
                        ? "Excellent"
                        : formik.values.rating === 4
                        ? "Very Good"
                        : formik.values.rating === 3
                        ? "Good"
                        : formik.values.rating === 2
                        ? "Fair"
                        : "Poor"}
                    </span>
                  </div>
                  {formik.touched.rating && formik.errors.rating && (
                    <div className="text-[10px] text-[#7D1D2B] mt-1">{formik.errors.rating}</div>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24] flex items-center">
                    <User className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. Ayesha Khan"
                    className={`w-full bg-[#FAF6F0]/40 border rounded-lg px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-[#C5A880] transition-colors ${
                      formik.touched.name && formik.errors.name ? "border-[#7D1D2B]/50" : "border-gray-200"
                    }`}
                    disabled={loading || submitSuccess}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-[10px] text-[#7D1D2B] mt-1">{formik.errors.name}</div>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24] flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. ayesha@example.com"
                    className={`w-full bg-[#FAF6F0]/40 border rounded-lg px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-[#C5A880] transition-colors ${
                      formik.touched.email && formik.errors.email ? "border-[#7D1D2B]/50" : "border-gray-200"
                    }`}
                    disabled={loading || submitSuccess}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-[10px] text-[#7D1D2B] mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Review Message Comment */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24]">
                    Review Comment
                  </label>
                  <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Write your review here. Tell us about the fabric quality, stitching, embroidery, or sizing fit..."
                    rows={4}
                    className={`w-full bg-[#FAF6F0]/40 border rounded-lg px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-[#C5A880] transition-colors resize-none ${
                      formik.touched.comment && formik.errors.comment ? "border-[#7D1D2B]/50" : "border-gray-200"
                    }`}
                    disabled={loading || submitSuccess}
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <div className="text-[10px] text-[#7D1D2B] mt-1">{formik.errors.comment}</div>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || submitSuccess}
                  className="w-full py-4 bg-black hover:bg-[#C5A880] hover:text-black text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-sm disabled:bg-gray-400 disabled:text-white disabled:hover:bg-gray-400 rounded-lg"
                >
                  {loading ? (
                    <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
