"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/utils/api";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post(API_ENDPOINTS.CONTACT, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send contact inquiry:", err);
      setError(err.response?.data?.message || err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto space-y-16 mt-8">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880]">
            get in touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-black">
            Contact Us
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
        </div>

        {/* Contact info & form split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Info */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold text-black uppercase tracking-wider">ihdat Head Office</h3>
              <p className="text-xs text-gray-500 leading-relaxed tracking-wider">
                Our support team is here to assist you with order inquiries, shipping guidelines, sizing support, or return approvals.
              </p>
            </div>

            <div className="space-y-4 text-xs text-gray-700 tracking-wider">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4.5 w-4.5 text-[#C5A880] shrink-0" />
                <span>Sector F-7/2, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-[#C5A880] shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-[#C5A880] shrink-0" />
                <span>support@ihdat.com</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200/60 pt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest space-y-1">
              <p>Customer Support hours:</p>
              <p className="text-gray-600">Monday - Friday: 10:00 AM - 6:00 PM PST</p>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="md:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 shadow-xs">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                      Message / Inquiry
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black resize-none"
                    />
                  </div>

                  {error && (
                    <div className="text-[10px] font-bold text-[#7D1D2B] bg-rose-50 border border-rose-200 p-3 text-center uppercase tracking-wider">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black hover:bg-[#C5A880] hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center shadow-xs"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <CheckCircle className="h-12 w-12 text-[#C5A880] animate-pulse" />
                  <h3 className="font-serif text-lg font-semibold text-black uppercase tracking-wider">
                    Message Sent
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Thank you for reaching out. An ihdat concierge representative will respond to your inquiry via email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 border border-black text-[9px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
