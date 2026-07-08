"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  X,
  Mail,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { reviewActions } from "@/store/slices/reviewSlice";
import { productActions } from "@/store/slices/productSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const adminReviewSchema = Yup.object().shape({
  name: Yup.string().trim().required("Customer name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  rating: Yup.number().min(1).max(5).required("Rating is required"),
  comment: Yup.string().trim().required("Comment text is required"),
  productId: Yup.string().nullable(),
});

export default function AdminReviewsPage() {
  const dispatch = useDispatch();
  const { reviews, loading, error, submitSuccess } = useSelector(
    (state) => state.reviews,
  );
  const products = useSelector((state) => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(reviewActions.fetchAdminReviews());
    if (products.length === 0) {
      dispatch(productActions.fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleToggleApprove = (id) => {
    dispatch(reviewActions.toggleReviewApproval(id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(reviewActions.deleteReview(id));
    }
  };

  // Admin add review formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rating: 5,
      comment: "",
      productId: "",
    },
    validationSchema: adminReviewSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedProduct = products.find((p) => p.id === values.productId);
      const payload = {
        name: values.name,
        email: values.email,
        rating: Number(values.rating),
        comment: values.comment,
        productId: values.productId || null,
        productName: selectedProduct ? selectedProduct.name : null,
      };

      dispatch(reviewActions.addReview(payload))
        .unwrap()
        .then(() => {
          resetForm();
          setIsModalOpen(false);
          // Refetch admin reviews to ensure complete sync
          dispatch(reviewActions.fetchAdminReviews());
        })
        .catch((err) => {
          alert(err || "Failed to add review from admin portal");
        });
    },
  });

  // Pagination calculations
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
            Reviews & Testimonials
          </h1>
          <p className="text-xs text-gray-500 tracking-wider">
            Moderate submitted customer reviews, toggle approval status, and
            write reviews as an Administrator
          </p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            formik.resetForm();
          }}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-black hover:bg-[#C5A880] hover:text-black text-white text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm self-start"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Review</span>
        </button>
      </div>

      {/* Main Reviews List */}
      <div className="bg-white border border-gray-200">
        {loading && reviews.length === 0 ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3.5 border-b border-gray-100 last:border-0">
                <div className="space-y-2 w-1/4">
                  <Skeleton height={14} width="80%" />
                  <Skeleton height={10} width="60%" />
                </div>
                <div className="space-y-2 w-1/4">
                  <Skeleton height={12} width="50%" />
                  <Skeleton height={10} width="30%" />
                </div>
                <div className="space-y-2 w-1/3">
                  <Skeleton height={12} width="90%" />
                  <Skeleton height={10} width="40%" />
                </div>
                <div className="w-16">
                  <Skeleton height={24} width="100%" borderRadius={12} />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <MessageSquare className="h-10 w-10 text-gray-300 mx-auto stroke-[1]" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              No reviews found
            </p>
            <p className="text-xs text-gray-400">
              Add a custom review above or wait for customer feedback.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
                <thead className="bg-gray-50/50">
                  <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold border-b border-gray-200/50">
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Associated Product</th>
                    <th className="px-6 py-4">Feedback & Rating</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                  {paginatedReviews.map((rev) => (
                    <tr
                      key={rev.id || rev._id}
                      className="hover:bg-gray-50/40 transition-colors"
                    >
                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-black">{rev.name}</p>
                          <p className="text-[10px] text-gray-400 flex items-center">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {rev.email}
                          </p>
                        </div>
                      </td>

                      {/* Associated Product */}
                      <td className="px-6 py-4">
                        {rev.productId ? (
                          <div className="space-y-0.5 max-w-[180px]">
                            <p className="font-medium text-zinc-900 truncate font-serif">
                              {rev.productName}
                            </p>
                            <Link
                              href={`/products/${rev.productId}`}
                              target="_blank"
                              className="text-[9px] text-[#C5A880] uppercase tracking-wider font-semibold hover:underline inline-flex items-center"
                            >
                              View page{" "}
                              <ExternalLink className="h-2.5 w-2.5 ml-1" />
                            </Link>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
                            General Feedback
                          </span>
                        )}
                      </td>

                      {/* Comment & Rating */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5 max-w-sm">
                          <div className="flex items-center space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rev.rating
                                    ? "fill-[#C5A880] text-[#C5A880]"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-[11px] text-zinc-600 italic font-light line-clamp-2">
                            "{rev.comment}"
                          </p>
                        </div>
                      </td>

                      {/* Status Approve / Disapprove */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleApprove(rev.id || rev._id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                            rev.isApproved
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                          } transition-colors`}
                        >
                          {rev.isApproved ? "Approved" : "Pending"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(rev.id || rev._id)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-gray-100">
              {paginatedReviews.map((rev) => (
                <div key={rev.id || rev._id} className="p-5 space-y-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5 text-left">
                      <p className="font-semibold text-black text-sm">
                        {rev.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{rev.email}</p>
                    </div>
                    <button
                      onClick={() => handleToggleApprove(rev.id || rev._id)}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${
                        rev.isApproved
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {rev.isApproved ? "Approved" : "Pending"}
                    </button>
                  </div>

                  <div className="space-y-2 text-left bg-gray-50/50 p-3.5 border border-gray-100 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < rev.rating
                                ? "fill-[#C5A880] text-[#C5A880]"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        {rev.productId ? "Product Linked" : "General"}
                      </span>
                    </div>

                    {rev.productId && (
                      <p className="text-[10px] font-serif font-semibold text-[#C5A880]">
                        For: {rev.productName}
                      </p>
                    )}

                    <p className="text-zinc-600 italic font-light leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex justify-end items-center pt-2">
                    <button
                      onClick={() => handleDelete(rev.id || rev._id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-200/50 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Review</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-500 tracking-wider">
              Showing page{" "}
              <span className="font-semibold text-black">{currentPage}</span> of{" "}
              <span className="font-semibold text-black">{totalPages}</span>
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Prev
              </button>

              {/* Individual Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 border text-[10px] font-bold tracking-wider transition-all ${
                      currentPage === pageNum
                        ? "bg-[#C5A880] text-black border-[#C5A880]"
                        : "border-gray-200 text-black hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center"
              >
                Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Add Custom Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <div className="relative bg-white max-w-md w-full border border-gray-200 p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <div className="space-y-1 pb-4 border-b border-gray-100 text-left">
              <h3 className="font-serif text-xl uppercase tracking-wider text-black">
                Add Custom Review
              </h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                Submit testimonial on behalf of a buyer
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-5 text-left"
            >
              {/* Product selector */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Target Product (Optional)
                </label>
                <select
                  name="productId"
                  value={formik.values.productId}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white rounded-none"
                >
                  <option value="">General Feedback / Store-wide</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Review Rating (1-5)
                </label>
                <select
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white rounded-none font-semibold text-black"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Maria B."
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white rounded-none"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-[10px] text-rose-600 font-bold mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Customer Email */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Customer Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. maria@example.com"
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white rounded-none"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-[10px] text-rose-600 font-bold mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Comment text */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Review Details
                </label>
                <textarea
                  name="comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={4}
                  placeholder="Paste or write the review comments here..."
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white rounded-none resize-none font-light"
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className="text-[10px] text-rose-600 font-bold mt-1">
                    {formik.errors.comment}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 bg-black hover:bg-[#C5A880] hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
              >
                {formik.isSubmitting ? "Saving review..." : "Save Testimonial"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
