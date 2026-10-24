import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import { formatRupiah } from '../utils/formatCurrency';
import menusData from '../data/menus.json';

export default function Home() {
  // Data menu langsung dari file lokal JSON (Pure Frontend / Static Web App)
  const [menus] = useState(menusData);
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  // Helper menampilkan notifikasi pop-up sementara (2.8 detik)
  const showToast = (toastData) => {
    setToastNotification(toastData);
    setTimeout(() => {
      setToastNotification(null);
    }, 2800);
  };

  // Tambah item ke keranjang
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });

    // Alert hijau saat pesanan berhasil ditambahkan
    showToast({
      type: 'success',
      title: 'Berhasil Ditambahkan!',
      nama: item.nama,
      gambar: item.gambar,
      showCartBtn: true
    });
  };

  // Ubah kuantitas item (+ / -)
  const handleUpdateQty = (itemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Hapus satu item dari keranjang
  const handleRemoveItem = (itemId) => {
    const itemToRemove = cart.find((i) => i.id === itemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

    // Alert merah saat pesanan dihapus
    showToast({
      type: 'remove',
      title: 'Pesanan Dihapus!',
      nama: itemToRemove ? itemToRemove.nama : 'Menu telah dihapus dari keranjang',
      gambar: null,
      showCartBtn: false
    });
  };

  // Kosongkan seluruh keranjang belanja
  const handleClearCart = () => {
    setCart([]);
    showToast({
      type: 'clear',
      title: 'Keranjang Dikosongkan!',
      nama: 'Semua pesanan telah dihapus',
      gambar: null,
      showCartBtn: false
    });
  };

  // Hitung total kuantitas dan harga item di keranjang
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.harga * item.qty, 0);

  // Cari menu terlaris untuk HeroBanner
  const bestsellerItem = useMemo(() => {
    return menus.find((m) => m.isBestseller) || menus[0];
  }, [menus]);

  // Hitung jumlah item per kategori
  const categoryCounts = useMemo(() => {
    const counts = { 'Semua Menu': menus.length };
    menus.forEach((item) => {
      if (item.kategori) {
        counts[item.kategori] = (counts[item.kategori] || 0) + 1;
      }
    });
    return counts;
  }, [menus]);

  // Filter daftar menu berdasarkan Kategori aktif dan Search Query
  const displayedMenus = useMemo(() => {
    return menus.filter((item) => {
      // Filter kategori
      const matchCategory =
        activeCategory === 'Semua Menu' ||
        item.kategori.toLowerCase() === activeCategory.toLowerCase();

      // Filter query pencarian
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.nama.toLowerCase().includes(query) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(query)) ||
        (item.kategori && item.kategori.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [menus, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-body-md text-on-surface">
      {/* Sticky Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Konten Utama */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-6 md:py-10">
        {/* Hero Banner (Menu Terlaris) */}
        {!searchQuery && (
          <HeroBanner
            bestsellerItem={bestsellerItem}
            onOrderNow={(item) => {
              handleAddToCart(item);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* Filter Kategori Interaktif (SPA Tab Switching) */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
          }}
          categoryCounts={categoryCounts}
        />

        {/* Status Pencarian jika aktif */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-surface-container rounded-xl flex items-center justify-between border border-surface-container-high">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">search</span>
              <p className="text-sm">
                Menampilkan hasil untuk: <span className="font-bold text-dark">"{searchQuery}"</span> ({displayedMenus.length} menu ditemukan)
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-primary hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Katalog Menu (Menu Grid) */}
        {displayedMenus.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-16">
            {displayedMenus.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                activeCategory={activeCategory}
              />
            ))}
          </section>
        ) : (
          <div className="col-span-full text-center py-16 px-4 bg-surface rounded-2xl border border-surface-container-high my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center mb-3 text-gray-400">
              <span className="material-symbols-outlined text-3xl">soup_kitchen</span>
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-dark mb-1">
              Menu Tidak Ditemukan
            </h3>
            <p className="text-body-sm text-gray-500 max-w-sm mx-auto mb-4">
              Tidak ada menu yang sesuai dengan kategori atau pencarian Anda saat ini.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Semua Menu');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-red-700 transition"
            >
              Lihat Semua Menu
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Cart Button on Mobile */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-5 inset-x-4 md:hidden z-30 animate-fadeIn">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-xl flex items-center justify-between active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
              <span className="text-sm font-extrabold">{totalCartCount} Item</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-extrabold">
              <span>{formatRupiah(totalCartPrice)}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </button>
        </div>
      )}

      {/* Drawer / Modal Keranjang Belanja & Kustomisasi WhatsApp */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification Alert (Top-Center) */}
      {toastNotification && (
        <aside
          role="status"
          aria-live="polite"
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-white border-2 rounded-2xl shadow-2xl p-3 sm:p-4 flex items-center justify-between gap-3 animate-fadeIn ${
            toastNotification.type === 'success'
              ? 'border-green-500/30'
              : 'border-red-500/30'
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            {/* Gambar menu jika tambah pesanan, atau ikon hapus jika hapus pesanan */}
            {toastNotification.gambar ? (
              <img
                src={toastNotification.gambar}
                alt={toastNotification.nama}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">delete</span>
              </div>
            )}

            {/* Konten Teks Notifikasi */}
            <div className="text-left min-w-0">
              <div
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                  toastNotification.type === 'success'
                    ? 'text-green-700'
                    : 'text-red-600'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {toastNotification.type === 'success' ? 'check_circle' : 'info'}
                </span>
                <span>{toastNotification.title}</span>
              </div>
              <p className="text-sm font-extrabold text-gray-900 truncate mt-0.5">
                {toastNotification.nama}
              </p>
            </div>
          </div>

          {/* Tombol Lihat Keranjang (hanya muncul saat tambah pesanan) */}
          {toastNotification.showCartBtn && (
            <button
              onClick={() => {
                setToastNotification(null);
                setIsCartOpen(true);
              }}
              className="shrink-0 whitespace-nowrap bg-primary hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition shadow-md active:scale-95"
            >
              Lihat Keranjang
            </button>
          )}
        </aside>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}