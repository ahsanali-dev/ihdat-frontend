import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "ihdat | Premium Clothing Brand",
  description: "Modern, minimalist organic cotton clothing designed for comfort and aesthetics.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-[#FAF6F0] text-[#1E1E24] flex flex-col font-sans"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
