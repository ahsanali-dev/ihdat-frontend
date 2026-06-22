import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlideCartDrawer from "@/components/layout/SlideCartDrawer";
import QuickViewModal from "@/components/QuickViewModal";

export default function ShopLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6F0]">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <SlideCartDrawer />
      <QuickViewModal />
    </div>
  );
}
