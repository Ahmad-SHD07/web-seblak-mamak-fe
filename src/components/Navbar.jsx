import { useState } from 'react';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  searchQuery,
  onSearchChange
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container-high shadow-sm w-full transition-all">
      <div className="flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop py-3.5 max-w-[1280px] mx-auto gap-4">
        {/* Logo & Identitas Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
          </div>
          <div>
            <span className="font-headline-md text-xl md:text-2xl font-extrabold text-primary tracking-tight leading-none block">
              Seblak Mak Eunin
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant tracking-wider uppercase hidden sm:block">
              Spicy Heat & Hearth
            </span>
          </div>
        </button>
        

        {/* Aksi Kanan (Pencarian & Keranjang) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Input Pencarian Desktop & Mobile Toggle */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-surface-container rounded-full px-3 py-1.5 shadow-inner border border-surface-container-high transition-all w-48 sm:w-64 animate-fadeIn">
                <span className="material-symbols-outlined text-[18px] text-gray-500 mr-2">search</span>
                <input
                  type="text"
                  placeholder="Cari menu lezat..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface w-full placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none ml-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-xs font-semibold text-gray-500 hover:text-primary"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                title="Cari Menu"
                className="p-2 text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center justify-center focus:outline-none"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
            )}
          </div>

          {/* Tombol Keranjang Belanja dengan Badge */}
          <button
            onClick={onOpenCart}
            title="Buka Keranjang"
            className="relative p-2.5 text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center justify-center focus:outline-none group active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px] text-dark group-hover:text-primary transition-colors">
              shopping_cart
            </span>
            {cartCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-surface shadow-md animate-bounce">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            ) : (
              <span className="absolute -top-0.5 -right-0.5 bg-surface-container text-gray-500 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-surface">
                0
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}