"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Scissors, Upload, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/utils/api";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";

const CustomOrderSchema = Yup.object().shape({
  customerName: Yup.string().required("Full name is required").min(3, "Name too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required").min(10, "Invalid phone"),
  targetAudience: Yup.string().required("Please select Women or Kids"),
  fabric: Yup.string().required("Please select fabric type"),
  embroidery: Yup.string().required("Please select embroidery work"),
  chest: Yup.number().required("Chest measurement is required").positive(),
  shoulder: Yup.number().required("Shoulder width is required").positive(),
  length: Yup.number().required("Koti length is required").positive(),
  waist: Yup.number().nullable(),
  referencePhoto: Yup.string().nullable(),
  specialInstructions: Yup.string().nullable(),
});

export default function CustomOrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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

          const webpBase64 = canvas.toDataURL("image/webp", 0.8);

          api.post(API_ENDPOINTS.UPLOAD, {
            file: webpBase64,
            fileName: `custom-suit-ref-${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`,
          })
            .then((res) => resolve(res.data.url))
            .catch((err) => reject(err.response?.data?.message || err.message || "Upload failed"));
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleCustomSubmit = async (values, { setSubmitting }) => {
    setErrorMsg(null);
    try {
      const payload = {
        name: values.customerName,
        email: values.email,
        phone: values.phone,
        targetAudience: values.targetAudience,
        fabric: values.fabric,
        embroidery: values.embroidery,
        chest: values.chest,
        shoulder: values.shoulder,
        length: values.length,
        waist: values.waist || null,
        referencePhoto: values.referencePhoto || null,
        specialInstructions: values.specialInstructions || null,
      };

      await api.post(API_ENDPOINTS.CUSTOM_ORDERS, payload);
      setSubmitted(true);
    } catch (err) {
      console.error("Custom order submission error:", err);
      setErrorMsg(err.response?.data?.message || err.message || "Failed to submit custom order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880] flex items-center justify-center gap-1.5">
            <Scissors className="h-4 w-4 text-[#C5A880]" /> Bespoke Tailoring Studio
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-[#1E1E24]">
            Custom Measurement Order
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
          <p className="text-xs text-[#71717A] leading-relaxed tracking-wider max-w-lg mx-auto">
            Order a tailored Koti or Waistcoat designed to your exact measurements and suit color scheme.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 sm:p-12 border border-[#E4E4E7] shadow-sm rounded-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <Formik
                initialValues={{
                  customerName: "",
                  email: "",
                  phone: "",
                  targetAudience: "Women's Koti",
                  fabric: "Plush Velvet",
                  embroidery: "Gold Zari Threadwork",
                  chest: "",
                  shoulder: "",
                  length: "",
                  waist: "",
                  referencePhoto: "",
                  specialInstructions: "",
                }}
                validationSchema={CustomOrderSchema}
                onSubmit={handleCustomSubmit}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form className="space-y-8">
                    {errorMsg && (
                      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Section 1: Client Contact */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
                        1. Client Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Full Name</label>
                          <Field
                            name="customerName"
                            placeholder="Your Name"
                            className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg"
                          />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="customerName" /></div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Email Address</label>
                          <Field
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg"
                          />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="email" /></div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Phone / WhatsApp</label>
                          <Field
                            name="phone"
                            placeholder="+92 300 1234567"
                            className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg"
                          />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="phone" /></div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Garment & Fabric Setup */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
                        2. Garment & Embroidery Selection
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Target Audience</label>
                          <Field as="select" name="targetAudience" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg">
                            <option value="Women's Koti">Women's Koti</option>
                            <option value="Kids' Waistcoat">Kids' Waistcoat</option>
                          </Field>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Fabric Choice</label>
                          <Field as="select" name="fabric" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg">
                            <option value="Plush Velvet">Plush Velvet</option>
                            <option value="Banarsi Brocade">Banarsi Brocade</option>
                            <option value="Pure Raw Silk">Pure Raw Silk</option>
                            <option value="Chanderi Silk">Chanderi Silk</option>
                          </Field>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Embroidery Type</label>
                          <Field as="select" name="embroidery" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg">
                            <option value="Gold Zari Threadwork">Gold Zari Threadwork</option>
                            <option value="Antique Tilla Work">Antique Tilla Work</option>
                            <option value="Handmade Mirror Work">Handmade Mirror Work</option>
                            <option value="Pearl & Gota Detailing">Pearl & Gota Detailing</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Body Measurements */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
                        3. Measurements (Inches)
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Chest / Bust (in)</label>
                          <Field name="chest" type="number" step="0.5" placeholder="e.g. 36" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg" />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="chest" /></div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Shoulder Width (in)</label>
                          <Field name="shoulder" type="number" step="0.5" placeholder="e.g. 14.5" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg" />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="shoulder" /></div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Koti Length (in)</label>
                          <Field name="length" type="number" step="0.5" placeholder="e.g. 18" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg" />
                          <div className="text-[10px] text-rose-600 font-bold"><ErrorMessage name="length" /></div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Waist (in, optional)</label>
                          <Field name="waist" type="number" step="0.5" placeholder="e.g. 32" className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white rounded-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Suit Picture Reference Upload */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
                        4. Suit Photo Reference (Optional)
                      </h3>
                      <p className="text-xs text-gray-500">Upload a picture of the suit/kurti you want to match this koti with:</p>

                      <div className="border-2 border-dashed border-gray-200 p-6 text-center bg-gray-50/50 hover:bg-white transition-colors cursor-pointer relative rounded-lg">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploading(true);
                              try {
                                const url = await compressAndUploadImage(file);
                                setFieldValue("referencePhoto", url);
                              } catch (err) {
                                alert("Failed to upload image: " + err);
                              } finally {
                                setUploading(false);
                              }
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <Upload className="h-8 w-8 text-[#C5A880] mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-700">
                          {uploading ? "Compressing & Uploading Image..." : values.referencePhoto ? "Photo Uploaded Successfully!" : "Click or Drag & Drop Suit Reference Photo"}
                        </p>
                        {values.referencePhoto && (
                          <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate max-w-md mx-auto">{values.referencePhoto}</p>
                        )}
                      </div>
                    </div>

                    {/* Section 5: Special Notes */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">Special Instructions / Color Preferences</label>
                      <Field
                        as="textarea"
                        rows="3"
                        name="specialInstructions"
                        placeholder="Specify any additional customization requirements..."
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-black bg-white resize-none rounded-lg"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || uploading}
                      className="w-full py-4 bg-[#1E1E24] hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      {isSubmitting || uploading ? (
                        <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      <span>
                        {isSubmitting
                          ? "Submitting Request..."
                          : uploading
                          ? "Uploading Photo..."
                          : "Submit Bespoke Custom Order"}
                      </span>
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <CheckCircle className="h-14 w-14 text-[#C5A880] animate-pulse" />
                <h2 className="font-serif text-2xl font-semibold uppercase tracking-wider text-[#1E1E24]">
                  Bespoke Order Submitted!
                </h2>
                <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                  Thank you for your custom request. Our master tailor concierge will review your measurements and contact you via Phone/WhatsApp shortly with final confirmation & lead time.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 border border-[#1E1E24] text-xs font-bold uppercase tracking-widest text-[#1E1E24] hover:bg-[#1E1E24] hover:text-white transition-colors mt-4"
                >
                  Submit Another Custom Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
