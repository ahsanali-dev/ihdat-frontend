"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "@/store/slices/productSlice";
import api from "@/utils/api";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Plus, Trash2, Edit, X, AlertCircle, ChevronRight, ChevronLeft, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Product validation schema
const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required").min(3, "Name too short"),
  price: Yup.number().required("Price is required").positive("Must be positive"),
  category: Yup.string().required("Category is required"),
  customCategory: Yup.string().nullable().test("custom-cat-test", "Custom category name is required", function(value) {
    const { category } = this.parent;
    if (category === "CUSTOM") {
      return !!value && value.trim().length >= 2;
    }
    return true;
  }),
  description: Yup.string().required("Description is required").min(10, "Too short"),
  stock: Yup.number().required("Stock quantity is required").integer("Must be integer").min(0, "Min stock is 0"),
  sizes: Yup.array().min(1, "Select at least one size"),
  imageInput1: Yup.string().required("Main image is required"),
  imageInput2: Yup.string().nullable(),
  imageInput3: Yup.string().nullable(),
  imageInput4: Yup.string().nullable(),
  colors: Yup.array().of(
    Yup.object().shape({
      hex: Yup.string().required("Color hex is required").matches(/^#[0-9A-F]{6}$/i, "Must be valid hex code (e.g. #ffffff)"),
      name: Yup.string().required("Color name is required").min(1, "Name too short"),
    })
  ).min(1, "Select at least one color"),
  video: Yup.string().url("Must be a valid URL").nullable(),
});

export default function AdminProductsPage() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [uploadingField, setUploadingField] = useState(null);

  const compressAndUploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // WebP format compression with 0.8 quality
          const webpBase64 = canvas.toDataURL("image/webp", 0.8);

          // Use our authenticated Axios helper
          api.post(API_ENDPOINTS.UPLOAD, {
            file: webpBase64,
            fileName: `product-${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`,
          })
            .then((res) => {
              resolve(res.data.url);
            })
            .catch((err) => {
              reject(err.response?.data?.message || err.message || "Upload failed");
            });
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleUploadProcess = async (file, fieldKey, setFieldValue) => {
    setUploadingField(fieldKey);
    try {
      const url = await compressAndUploadImage(file);
      setFieldValue(fieldKey, url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please verify you are logged in and try again.");
    } finally {
      setUploadingField(null);
    }
  };

  // Categories list state populated from products + defaults
  const [categories, setCategories] = useState(() => {
    const defaultCats = ["Women's Kotis", "Kids' Waistcoats", "Custom Jackets", "Velvet & Silk", "Apparel & Suits"];
    const existingCats = products.map((p) => p.category);
    return Array.from(new Set([...defaultCats, ...existingCats]));
  });

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // File Upload Handlers
  const handleFileChange = (e, fieldKey, setFieldValue) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadProcess(file, fieldKey, setFieldValue);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, fieldKey, setFieldValue) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUploadProcess(file, fieldKey, setFieldValue);
    }
  };

  const handleRemoveImage = (fieldKey, setFieldValue) => {
    setFieldValue(fieldKey, "");
  };

  // Search, Filter, Sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleCategoryFilterChange = (e) => {
    setSelectedCategoryFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Filter and Sort products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategoryFilter === "All" || prod.category === selectedCategoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "stock-asc") return a.stock - b.stock;
    if (sortBy === "stock-desc") return b.stock - a.stock;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0; // default
  });

  // Pagination based on filtered & sorted list
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product from catalog?")) {
      dispatch(productActions.deleteProduct(id));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setModalOpen(false);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    let finalCategory = values.category;
    if (values.category === "CUSTOM") {
      finalCategory = values.customCategory.trim();
      if (!categories.includes(finalCategory)) {
        setCategories((prev) => [...prev, finalCategory]);
      }
    }

    const colors = values.colors.map((c) => c.hex);
    const colorNames = values.colors.map((c) => c.name);
    const images = [values.imageInput1, values.imageInput2, values.imageInput3, values.imageInput4].filter(Boolean);

    const productData = {
      name: values.name,
      price: parseFloat(values.price),
      category: finalCategory,
      description: values.description,
      stock: parseInt(values.stock, 10),
      sizes: values.sizes,
      colors: colors,
      colorNames: colorNames,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"],
      isFeatured: values.isFeatured,
      video: values.video || "",
    };

    if (editingProduct) {
      // Edit mode
      dispatch(
        productActions.editProduct({
          ...productData,
          id: editingProduct.id,
        })
      );
    } else {
      // Add mode
      dispatch(productActions.addProduct(productData));
    }

    handleCloseModal();
    resetForm();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
            Catalog Management
          </h1>
          <p className="text-xs text-gray-500 tracking-wider">
            Edit stock levels, add new apparel items, or delete discontinued garments
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold uppercase tracking-widest text-black bg-[#C5A880] hover:bg-[#111111] hover:text-white transition-colors"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Add Product
        </button>
      </div>

      {/* Search and Filters Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-gray-200 shadow-xs justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, desc, or ID..."
            className="w-full pl-9 pr-3 py-2 border border-gray-250 text-xs focus:outline-none focus:border-black rounded-none bg-white"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={handleCategoryFilterChange}
            className="border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-none w-full sm:w-40"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-none w-full sm:w-40"
          >
            <option value="default">Default Sort</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="stock-asc">Stock (Low to High)</option>
            <option value="stock-desc">Stock (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Mobile Responsive Grid List (Hidden on Desktop) */}
      <div className="block md:hidden space-y-4">
        {paginatedProducts.map((prod) => (
          <div key={prod.id} className="bg-white border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="h-14 w-11 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative shadow-2xs">
                  {prod.images && prod.images[0] ? (
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  ) : (
                    <span className="h-full w-full block" style={{ backgroundColor: prod.colors[0] }} />
                  )}
                </div>
                <div>
                  <p className="font-serif font-bold text-black text-sm">{prod.name}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">{prod.id}</p>
                </div>
              </div>
              <span className="font-bold text-black text-xs">Rs. {prod.price.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[10px] tracking-wide text-gray-600 pt-3 border-t border-gray-100 bg-gray-50/50 p-2.5">
              <div>
                <span className="font-bold uppercase text-[8px] block tracking-widest text-gray-400">Category</span>
                <span className="font-semibold text-gray-700">{prod.category}</span>
              </div>
              <div>
                <span className="font-bold uppercase text-[8px] block tracking-widest text-gray-400">Stock</span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-gray-800">{prod.stock}</span>
                  {prod.stock === 0 ? (
                    <span className="px-1.5 py-0.5 text-[7px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
                      Out Of Stock
                    </span>
                  ) : prod.stock <= 15 ? (
                    <span className="px-1.5 py-0.5 text-[7px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                      Low Stock
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 text-[7px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                      In Stock
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              {/* Colors preview */}
              <div className="flex gap-1">
                {prod.colors.map((col, idx) => (
                  <span
                    key={col}
                    className="h-4 w-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: col }}
                    title={prod.colorNames[idx]}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditClick(prod)}
                  className="text-gray-500 hover:text-black border border-gray-200 bg-white p-2 hover:bg-gray-50 transition-colors"
                  title="Edit garment"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="text-gray-500 hover:text-rose-600 border border-gray-200 bg-white p-2 hover:bg-gray-50 transition-colors"
                  title="Delete garment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Catalog Table (Hidden on Mobile) */}
      <div className="hidden md:block bg-white border border-gray-200 shadow-xs overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
          <thead className="bg-gray-50">
            <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">
              <th className="px-6 py-4">Apparel Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-center">Sizes</th>
              <th className="px-6 py-4 text-center">Colors</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
            {paginatedProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {/* Render standard image thumbnail preview */}
                    <div className="h-10 w-8 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative shadow-2xs">
                      {prod.images && prod.images[0] ? (
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                      ) : (
                        <span className="h-full w-full block animate-pulse" style={{ backgroundColor: prod.colors[0] }} />
                      )}
                    </div>
                    <div>
                      <p className="font-serif font-medium text-black text-sm">{prod.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{prod.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold">{prod.category}</td>
                <td className="px-6 py-4 text-right font-bold text-black">Rs. {prod.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-wrap gap-1 justify-center max-w-[120px] mx-auto">
                    {prod.sizes.map((sz) => (
                      <span key={sz} className="bg-gray-100 px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-600">
                        {sz}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-1 justify-center">
                    {prod.colors.map((col, idx) => (
                      <span
                        key={col}
                        className="h-4.5 w-4.5 rounded-full border border-gray-200 shadow-2xs"
                        style={{ backgroundColor: col }}
                        title={prod.colorNames[idx]}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className="font-bold text-gray-800 text-xs">{prod.stock}</span>
                    {prod.stock === 0 ? (
                      <span className="px-2 py-0.5 text-[8px] uppercase tracking-wider font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                        Out Of Stock
                      </span>
                    ) : prod.stock <= 15 ? (
                      <span className="px-2 py-0.5 text-[8px] uppercase tracking-wider font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[8px] uppercase tracking-wider font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Stock
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleEditClick(prod)}
                      className="text-gray-400 hover:text-black p-1.5 transition-colors mr-2"
                      title="Edit product"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="text-gray-400 hover:text-rose-600 p-1.5 transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="relative ml-3 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-700">
                Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, products.length)}</span> of{" "}
                <span className="font-semibold">{products.length}</span> apparel items
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px bg-white" aria-label="Pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-xs font-semibold ${
                        isActive
                          ? "z-10 bg-black text-white"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal Overlay Animated with Framer Motion */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Form Content Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -25 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col border border-gray-200 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="font-serif text-lg uppercase tracking-wider text-black">
                  {editingProduct ? `Edit Garment: ${editingProduct.name}` : "Add New Garment"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Formik Form */}
              <Formik
               initialValues={{
                  name: editingProduct ? editingProduct.name : "",
                  price: editingProduct ? editingProduct.price : "",
                  category: editingProduct ? editingProduct.category : "Women's Kotis",
                  customCategory: "",
                  description: editingProduct ? editingProduct.description : "",
                  stock: editingProduct ? editingProduct.stock : "",
                  sizes: editingProduct ? editingProduct.sizes : ["S", "M", "L"],
                  imageInput1: editingProduct && editingProduct.images && editingProduct.images[0] ? editingProduct.images[0] : "",
                  imageInput2: editingProduct && editingProduct.images && editingProduct.images[1] ? editingProduct.images[1] : "",
                  imageInput3: editingProduct && editingProduct.images && editingProduct.images[2] ? editingProduct.images[2] : "",
                  imageInput4: editingProduct && editingProduct.images && editingProduct.images[3] ? editingProduct.images[3] : "",
                  colors: editingProduct
                    ? editingProduct.colors.map((hex, idx) => ({ hex, name: editingProduct.colorNames[idx] || "" }))
                    : [
                        { hex: "#FAF6F0", name: "Cream" },
                        { hex: "#1E1E24", name: "Charcoal" }
                      ],
                  video: editingProduct && editingProduct.video ? editingProduct.video : "",
                  isFeatured: editingProduct ? editingProduct.isFeatured : false,
                }}
                validationSchema={ProductSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue, errors }) => (
                  <Form className="space-y-5 pt-4">
                    {/* Name and Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Product Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="e.g. Zaman Knit Polo"
                          className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                        <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="name" /></div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Price (Rs.)
                        </label>
                        <Field
                          type="number"
                          name="price"
                          placeholder="e.g. 4990"
                          className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                        <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="price" /></div>
                      </div>
                    </div>

                    {/* Category and Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Category
                        </label>
                        <Field
                          as="select"
                          name="category"
                          className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                          <option value="CUSTOM">+ Add Custom Category...</option>
                        </Field>
                        {values.category === "CUSTOM" && (
                          <div className="mt-2 space-y-1 animate-fade-in">
                            <Field
                              type="text"
                              name="customCategory"
                              placeholder="Enter custom category name"
                              className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black"
                            />
                            <div className="text-[10px] font-bold text-[#7D1D2B]">
                              <ErrorMessage name="customCategory" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Stock level
                        </label>
                        <Field
                          type="number"
                          name="stock"
                          placeholder="e.g. 20"
                          className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                        <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="stock" /></div>
                      </div>
                    </div>

                    {/* Multiple Image Upload Zones */}
                    <div className="space-y-4 border border-gray-100 p-4 bg-gray-50/40">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Product Images (Upload up to 4 files)
                        </label>
                        <span className="text-[9px] text-[#C5A880] font-semibold uppercase tracking-wider">
                          Visual Gallery Setup
                        </span>
                      </div>

                      {/* 4 Image Upload Zones */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: "imageInput1", label: "Image 1 (Main Product View)", req: true },
                          { key: "imageInput2", label: "Image 2 (Secondary View)", req: false },
                          { key: "imageInput3", label: "Image 3 (Detail/Side View)", req: false },
                          { key: "imageInput4", label: "Image 4 (Fabric/Color/Back)", req: false }
                        ].map((fieldObj) => {
                          const val = values[fieldObj.key];
                          const inputId = `file-${fieldObj.key}`;
                          return (
                            <div key={fieldObj.key} className="space-y-1">
                              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 flex justify-between">
                                <span>{fieldObj.label}</span>
                                {fieldObj.req && <span className="text-[#7D1D2B] font-extrabold">* Required</span>}
                              </label>
                              
                              <div
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, fieldObj.key, setFieldValue)}
                                onClick={() => {
                                  if (!val && uploadingField !== fieldObj.key) {
                                    document.getElementById(inputId)?.click();
                                  }
                                }}
                                className={`relative h-32 border-2 border-dashed rounded-xs flex flex-col items-center justify-center overflow-hidden transition-all duration-250 bg-white ${
                                  val
                                    ? "border-gray-200"
                                    : "border-gray-200 hover:border-black hover:bg-gray-50/50 cursor-pointer"
                                }`}
                              >
                                {uploadingField === fieldObj.key ? (
                                  <div className="text-center p-4 flex flex-col items-center justify-center space-y-2 animate-pulse">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                                      Compressing & Uploading...
                                    </span>
                                  </div>
                                ) : val ? (
                                  <>
                                    <img
                                      src={val}
                                      alt="Product preview"
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                    {/* Action overlay */}
                                    <div className="absolute inset-0 bg-black/45 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          document.getElementById(inputId)?.click();
                                        }}
                                        className="p-2 bg-white text-black rounded-full hover:bg-gray-100 shadow-md transition-colors"
                                        title="Change image"
                                      >
                                        <Upload className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveImage(fieldObj.key, setFieldValue);
                                        }}
                                        className="p-2 bg-[#7D1D2B] text-white rounded-full hover:bg-red-700 shadow-md transition-colors"
                                        title="Remove image"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-center p-4 flex flex-col items-center justify-center">
                                    <Upload className="w-6 h-6 text-gray-400 mb-1.5" />
                                    <span className="text-[10px] font-semibold text-gray-600 block">
                                      Click or drag image here
                                    </span>
                                    <span className="text-[8px] text-gray-400 block mt-0.5">
                                      PNG, JPG up to 5MB
                                    </span>
                                  </div>
                                )}
                                
                                <input
                                  type="file"
                                  id={inputId}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, fieldObj.key, setFieldValue)}
                                />
                              </div>
                              <div className="text-[9px] font-bold text-[#7D1D2B] mt-0.5">
                                <ErrorMessage name={fieldObj.key} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sizes Checkboxes */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                        Available Sizes
                      </label>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-700">
                        {["S", "M", "L", "XL", "30", "32", "34", "36", "One Size"].map((sz) => (
                          <label key={sz} className="flex items-center space-x-1.5 cursor-pointer select-none">
                            <Field type="checkbox" name="sizes" value={sz} className="accent-[#C5A880]" />
                            <span>{sz}</span>
                          </label>
                        ))}
                      </div>
                      <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="sizes" /></div>
                    </div>

                    {/* Colors Selector */}
                    <div className="space-y-3 border border-gray-100 p-4 bg-gray-50/40">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Product Colors
                        </label>
                        <span className="text-[9px] text-[#C5A880] font-semibold uppercase tracking-wider">
                          Visual Palette Editor
                        </span>
                      </div>

                      {/* Presets */}
                      <div className="bg-white p-3 border border-gray-100 space-y-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">
                          Click a preset color to add instantly:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { hex: "#FAF6F0", name: "Cream" },
                            { hex: "#1E1E24", name: "Charcoal" },
                            { hex: "#C2B280", name: "Sand" },
                            { hex: "#8A9A86", name: "Sage" },
                            { hex: "#B8A390", name: "Warm Taupe" },
                            { hex: "#C87A53", name: "Terracotta" },
                            { hex: "#FFFFFF", name: "White" },
                            { hex: "#3F2E27", name: "Espresso" }
                          ].map((preset) => (
                            <button
                              key={preset.hex}
                              type="button"
                              onClick={() => {
                                const exists = values.colors.some(c => c.hex.toLowerCase() === preset.hex.toLowerCase());
                                if (!exists) {
                                  setFieldValue("colors", [...values.colors, preset]);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] border border-gray-200 hover:border-black rounded-sm bg-white transition-all text-gray-600 font-medium"
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-gray-300 block shadow-3xs"
                                style={{ backgroundColor: preset.hex }}
                              />
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color List */}
                      <div className="space-y-2">
                        {values.colors && values.colors.map((colorItem, index) => (
                          <div key={index} className="flex items-center gap-3 bg-white p-2.5 border border-gray-100 shadow-3xs">
                            {/* Color Picker Circle wrapper */}
                            <div className="relative w-8 h-8 rounded-full border border-gray-200 shadow-2xs flex-shrink-0 animate-fade-in" style={{ backgroundColor: colorItem.hex }}>
                              <input
                                type="color"
                                value={colorItem.hex}
                                onChange={(e) => {
                                  const newColors = [...values.colors];
                                  newColors[index] = { ...newColors[index], hex: e.target.value };
                                  setFieldValue("colors", newColors);
                                }}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                title="Click to choose custom color"
                              />
                            </div>
                            
                            {/* Hex Input */}
                            <div className="w-24">
                              <input
                                type="text"
                                value={colorItem.hex}
                                placeholder="#000000"
                                onChange={(e) => {
                                  const newColors = [...values.colors];
                                  newColors[index] = { ...newColors[index], hex: e.target.value };
                                  setFieldValue("colors", newColors);
                                }}
                                className="w-full border border-gray-200 px-2 py-1 text-[11px] focus:outline-none focus:border-black uppercase font-mono"
                              />
                            </div>

                            {/* Color Name Input */}
                            <div className="flex-1">
                              <input
                                type="text"
                                value={colorItem.name}
                                placeholder="Color Name (e.g. Charcoal)"
                                onChange={(e) => {
                                  const newColors = [...values.colors];
                                  newColors[index] = { ...newColors[index], name: e.target.value };
                                  setFieldValue("colors", newColors);
                                }}
                                className="w-full border border-gray-200 px-2 py-1 text-[11px] focus:outline-none focus:border-black"
                              />
                            </div>

                            {/* Delete Button */}
                            {values.colors.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newColors = values.colors.filter((_, idx) => idx !== index);
                                  setFieldValue("colors", newColors);
                                }}
                                className="text-gray-400 hover:text-rose-600 p-1.5 transition-colors"
                                title="Remove color"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Custom Color button */}
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("colors", [...values.colors, { hex: "#000000", name: "Black" }]);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-dashed border-gray-300 text-[10px] font-semibold uppercase tracking-wider text-gray-600 hover:border-black hover:text-black bg-white transition-colors w-full justify-center"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Custom Color
                      </button>
                      
                      {/* Global errors for colors array */}
                      {typeof errors.colors === "string" && (
                        <div className="text-[10px] font-bold text-[#7D1D2B] mt-1">{errors.colors}</div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Product Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows="3"
                        placeholder="Crafted from fine cotton, this knit polo offers..."
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black resize-none"
                      />
                      <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="description" /></div>
                    </div>

                    {/* Marketing & Media Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-100 p-4 bg-gray-50/40">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex justify-between">
                          <span>Product Showcase Video (Optional URL)</span>
                        </label>
                        <Field
                          type="text"
                          name="video"
                          placeholder="https://player.vimeo.com/external/..."
                          className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white"
                        />
                        <div className="text-[10px] font-bold text-[#7D1D2B]"><ErrorMessage name="video" /></div>
                      </div>

                      <div className="flex items-center pt-5 sm:pt-6">
                        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                          <Field
                            type="checkbox"
                            name="isFeatured"
                            className="accent-[#C5A880] w-4 h-4"
                          />
                          <div className="leading-tight">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block">
                              Featured Product
                            </span>
                            <span className="text-[8px] text-gray-400">
                              Display this item on the homepage featured carousel/grid
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-black hover:bg-[#C5A880] hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? "Saving..." : editingProduct ? "Save Changes" : "Add Product to Catalog"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
