"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#FAF6F0] mt-auto border-t border-[#FAF6F0]/10">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <span className="font-serif text-3xl font-extralight tracking-[0.25em] text-[#FAF6F0]">
              ihdat
            </span>
            <p className="text-xs text-[#71717A] tracking-wider leading-relaxed">
              Crafting bespoke handcrafted Kotis, Waistcoats & Ethnic Overlay Jackets for Women & Children. Designed to layer gracefully over Eastern suits, with custom measurement options.
            </p>
            {/* Social Icon Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com/ihdat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#71717A] hover:text-[#C5A880] transition-colors"
                title="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.71.124 3.997 1.413 4.122 4.122.044.968.052 1.322.052 3.752c0 2.43-.008 2.784-.052 3.752-.124 2.71-1.414 3.997-4.122 4.122-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.71-.124-3.997-1.414-4.122-4.122-.044-.968-.052-1.322-.052-3.752 0-2.43.008-2.784.052-3.752.124-2.71 1.41-3.997 4.122-4.122.968-.044 1.322-.052 3.752-.052zm0-2c-2.48 0-2.79.01-3.766.054-3.64.166-5.672 2.2-5.838 5.838-.044.976-.054 1.286-.054 3.766 0 2.48.01 2.79.054 3.766.166 3.637 2.2 5.672 5.838 5.838.976.044 1.286.054 3.766.054 2.48 0 2.79-.01 3.766-.054 3.637-.166 5.672-2.2 5.838-5.838.044-.976.054-1.286.054-3.766 0-2.48-.01-2.79-.054-3.766-.167-3.637-2.2-5.672-5.838-5.838C15.105.01 14.795 0 12.315 0zm0 5.902a6.098 6.098 0 100 12.196 6.098 6.098 0 000-12.196zm0 10.196a4.098 4.098 0 110-8.196 4.098 4.098 0 010 8.196zm6.44-11.536a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://facebook.com/ihdat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#71717A] hover:text-[#C5A880] transition-colors"
                title="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://pinterest.com/ihdat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#71717A] hover:text-[#C5A880] transition-colors"
                title="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.175-.105-.945-.199-2.4 0-3.443.18-.947 1.162-4.93 1.162-4.93s-.297-.59-.297-1.46c0-1.37.796-2.39 1.785-2.39.84 0 1.25.63 1.25 1.387 0 .848-.54 2.115-.82 3.292-.23.978.49 1.77 1.45 1.77 1.74 0 3.08-1.84 3.08-4.49 0-2.35-1.69-3.99-4.1-3.99-2.8 0-4.44 2.1-4.44 4.26 0 .847.325 1.758.73 2.253.08.1.09.187.067.29a2.44 2.44 0 01-.19-.77c-.03-.12-.13-.197-.26-.145-1.07-.497-1.74-2.067-1.74-3.327 0-2.71 1.97-5.2 5.68-5.2 2.98 0 5.3 2.12 5.3 4.96 0 2.96-1.87 5.35-4.47 5.35-.87 0-1.7-.45-1.98-.99l-.54 2.06c-.2.76-.73 1.71-1.09 2.29A12.037 12.037 0 0012 24c6.62 0 12-5.373 12-12S18.62 0 12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880]">Collections</h4>
            <ul className="space-y-2 text-xs text-[#71717A] tracking-wider">
              <li><Link href="/products" className="hover:text-[#FAF6F0] transition-colors">Shop All</Link></li>
              <li><Link href="/products?category=Women%27s%20Kotis" className="hover:text-[#FAF6F0] transition-colors">Women's Kotis</Link></li>
              <li><Link href="/products?category=Kids%27%20Waistcoats" className="hover:text-[#FAF6F0] transition-colors">Kids' Waistcoats</Link></li>
              <li><Link href="/products?category=Custom%20Jackets" className="hover:text-[#FAF6F0] transition-colors">Custom Jackets</Link></li>
              <li><Link href="/products?category=Apparel%20%26%20Suits" className="hover:text-[#FAF6F0] transition-colors">Pret & Suits</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880]">Assistance</h4>
            <ul className="space-y-2 text-xs text-[#71717A] tracking-wider">
              <li><Link href="/custom-order" className="hover:text-[#FAF6F0] transition-colors">Bespoke Custom Studio</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#FAF6F0] transition-colors">Size Guide & Care</Link></li>
              <li><Link href="/about" className="hover:text-[#FAF6F0] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#FAF6F0] transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-[#FAF6F0] transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880]">Join Us</h4>
            <p className="text-xs text-[#71717A] tracking-wider leading-relaxed">
              Subscribe to receive exclusive launches, collections previews, and styling journals.
            </p>
            <form className="flex max-w-md gap-x-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                className="min-w-0 flex-auto rounded-none border border-[#FAF6F0]/20 bg-transparent px-3 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#C5A880]"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none bg-[#C5A880] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#FAF6F0] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-[#FAF6F0]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#71717A] tracking-widest uppercase">
          <p>© 2026 ihdat inc. all rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">privacy policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
