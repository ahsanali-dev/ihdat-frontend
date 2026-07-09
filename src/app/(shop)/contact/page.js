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
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

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
              <a
                href="https://maps.google.com/?q=Sector+F-7/2,+Islamabad,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-black transition-colors w-full group"
              >
                <MapPin className="h-4.5 w-4.5 text-[#C5A880] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-dotted group-hover:decoration-solid">Sector F-7/2, Islamabad, Pakistan</span>
              </a>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowPhoneOptions(!showPhoneOptions)}
                  className="flex items-center space-x-3 hover:text-black transition-colors text-left focus:outline-none w-full group"
                >
                  <Phone className="h-4.5 w-4.5 text-[#C5A880] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted group-hover:decoration-solid">+92 300 1234567</span>
                </button>
                <AnimatePresence>
                  {showPhoneOptions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-8 flex flex-col gap-2.5 pt-1 overflow-hidden"
                    >
                      <a
                        href="tel:+923001234567"
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-600 hover:text-black transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#C5A880]" />
                        <span>Voice Call</span>
                      </a>
                      <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 1.975 14.113.95 11.483.95c-5.437 0-9.858 4.373-9.863 9.8.001 1.916.527 3.79 1.524 5.43l-.997 3.64 3.738-.973c1.55.847 3.23 1.293 4.935 1.293h.003zM17.487 14.39c-.3-.15-1.774-.875-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.487-.892-.795-1.493-1.777-1.668-2.077-.175-.3-.018-.463.13-.612.134-.133.3-.349.45-.523.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52-.172-.007-.368-.009-.565-.009-.196 0-.518.074-.789.37-.27.295-1.03.107-1.03 2.512s1.75 4.73 1.994 5.06c.244.33 3.4 5.2 8.235 7.285 1.15.496 2.05.792 2.75.995 1.158.369 2.214.316 3.05.19.93-.14 1.774-.72 2.025-1.385.25-.665.25-1.23.175-1.38-.075-.15-.275-.25-.575-.4z"/>
                        </svg>
                        <span>WhatsApp Chat</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="mailto:support@ihdat.com"
                className="flex items-center space-x-3 hover:text-black transition-colors w-full group"
              >
                <Mail className="h-4.5 w-4.5 text-[#C5A880] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-dotted group-hover:decoration-solid">support@ihdat.com</span>
              </a>
            </div>
            
            <div className="border-t border-gray-200/60 pt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest space-y-1">
              <p>Customer Support hours:</p>
              <p className="text-gray-600">Monday - Friday: 10:00 AM - 6:00 PM PST</p>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="md:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 shadow-xs rounded-2xl">
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
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black rounded-lg"
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
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black rounded-lg"
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
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white text-black resize-none rounded-lg"
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
                    className="w-full py-3 bg-black hover:bg-[#C5A880] hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center shadow-xs rounded-lg"
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
                    className="px-6 py-2 border border-black text-[9px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors rounded-lg"
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
