import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import { formatRupiah } from '../utils/formatCurrency';

// Master data cadangan lokal (Fallback data jika backend sedang proses start)
const fallbackMenus = [
  {
    id: 1,
    nama: 'Seblak Makaroni',
    kategori: 'Seblak',
    harga: 10000,
    deskripsi: 'Makaroni klasik kenyal dengan kuah bumbu kencur pedas gurih khas Mak Eunin.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Seblak/seblak1.webp'
  },
  {
    id: 2,
    nama: 'Seblak Ceker',
    kategori: 'Seblak',
    harga: 15000,
    deskripsi: 'Ceker ayam empuk yang dimasak perlahan dalam balutan saus pedas merona.',
    levelPedasDefault: 3,
    isBestseller: false,
    gambar: '/image/Seblak/seblak-ceker.webp'
  },
  {
    id: 3,
    nama: 'Seblak Mie',
    kategori: 'Seblak',
    harga: 13000,
    deskripsi: 'Mie kenyal berpadu bumbu pedas rempah kencur segar dan kerupuk basah gurih.',
    levelPedasDefault: 1,
    isBestseller: false,
    gambar: '/image/Seblak/seblak-mie.jpeg'
  },
  {
    id: 4,
    nama: 'Seblak Kerupuk',
    kategori: 'Seblak',
    harga: 15000,
    deskripsi: 'Pengalaman seblak asli Bandung! Kerupuk basah lembut disiram kuah pedas rempah istimewa.',
    levelPedasDefault: 2,
    isBestseller: true,
    gambar: '/image/Seblak/seblak2.webp'
  },
  {
    id: 5,
    nama: 'Ceker Ayam',
    kategori: 'Pilih Topping',
    harga: 2000,
    deskripsi: 'Ceker ayam empuk dengan bumbu kencur gurih meresap.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/ceker.jpg'
  },
  {
    id: 6,
    nama: 'Telur Ayam',
    kategori: 'Pilih Topping',
    harga: 3500,
    deskripsi: 'Telur ayam segar, bisa dimasak orak-arik dalam kuah atau direbus utuh.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Telur.jpg'
  },
  {
    id: 7,
    nama: 'Sosis Sapi',
    kategori: 'Pilih Topping',
    harga: 1000,
    deskripsi: 'Potongan sosis sapi berkualitas penambah kelezatan seblak.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Sosis.jpg'
  },
  {
    id: 8,
    nama: 'Mie Kuning',
    kategori: 'Pilih Topping',
    harga: 1000,
    deskripsi: 'Mie kuning kenyal pelengkap porsi karbohidrat mantap.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Mie.jpg'
  },
  {
    id: 9,
    nama: 'Basreng Goreng',
    kategori: 'Gorengan',
    harga: 5000,
    deskripsi: 'Baso goreng renyah dan gurih, cocok untuk camilan santai teman seblak.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Basreng.webp'
  },
  {
    id: 10,
    nama: 'Cireng Goreng',
    kategori: 'Gorengan',
    harga: 5000,
    deskripsi: 'Cireng garing di luar kenyal di dalam, ditaburi bumbu keju dan cabai pedas.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Cireng.webp'
  },
  {
    id: 11,
    nama: 'Sosis Goreng',
    kategori: 'Gorengan',
    harga: 5000,
    deskripsi: 'Sosis goreng lezat dengan bumbu tabur asin gurih pedas nikmat.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Sosis.webp'
  },
  {
    id: 12,
    nama: 'Cipuk Goreng',
    kategori: 'Gorengan',
    harga: 5000,
    deskripsi: 'Aci kerupuk goreng tradisional renyah gurih pengganjal lapar.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Cipuk.webp'
  },
  {
    id: 13,
    nama: 'Pisang Keju',
    kategori: 'Pisang Keju',
    harga: 5000,
    deskripsi: 'Pisang goreng manis empuk ditaburi keju cheddar parut melimpah dan susu kental manis.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Pisang-Keju/Pisang-Keju.webp'
  },
  {
    id: 14,
    nama: 'Pisang Keju Seres',
    kategori: 'Pisang Keju',
    harga: 5000,
    deskripsi: 'Perpaduan klasik pisang goreng manis dengan keju parut gurih dan meses coklat manis.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Pisang-Keju/Pisang-seres.webp'
  },
  {
    id: 15,
    nama: 'Pisang Keju Seres Pelangi',
    kategori: 'Pisang Keju',
    harga: 5000,
    deskripsi: 'Pisang manis bertabur keju gurih dan butiran meses pelangi warna-warni yang ceria.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Pisang-Keju/pisang-Seres-Warni.webp'
  },
  {
    id: 16,
    nama: 'Pop Ice Coklat',
    kategori: 'Minuman',
    harga: 3000,
    deskripsi: 'Minuman es blender rasa coklat segar. Pilihan topping: Susu, Keju, Oreo, atau Seres.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Pop-Ice-coklat.webp'
  },
  {
    id: 17,
    nama: 'Pop Ice Avocado',
    kategori: 'Minuman',
    harga: 3000,
    deskripsi: 'Es blender rasa alpukat nikmat dan dingin pelega tenggorokan saat makan pedas.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Pop-Ice-Avocado.webp'
  },
  {
    id: 18,
    nama: 'Pop Ice Milo',
    kategori: 'Minuman',
    harga: 3000,
    deskripsi: 'Pop Ice rasa coklat malt Milo dingin berenergi dengan pilihan topping favorit.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Milo.webp'
  },
  {
    id: 19,
    nama: 'Cobek Basreng',
    kategori: 'Cobek',
    harga: 5000,
    deskripsi: 'Basreng kenyal disiram racikan bumbu cobek sambal kencur pedas nampol.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Cobek/Cobek-basreng.webp'
  },
  {
    id: 20,
    nama: 'Cobek Cireng',
    kategori: 'Cobek',
    harga: 5000,
    deskripsi: 'Cireng renyah kenyal disiram sambal cobek cikur pedas segar mantap.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Cobek/Cobek-sosis.webp'
  }
];

export default function Home() {
  const [menus, setMenus] = useState(fallbackMenus);
  const [isLoadingMenus, setIsLoadingMenus] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Ambil data menu dari Backend API saat pertama kali load
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoadingMenus(true);
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/menus`, { timeout: 3000 });
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setMenus(res.data.data);
        }
      } catch (err) {
        console.info('Menggunakan menu lokal (Backend API offline atau belum dijalankan).', err.message);
      } finally {
        setIsLoadingMenus(false);
      }
    };

    fetchMenus();
  }, []);

  // Notifikasi Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // State Management Keranjang Belanja
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

    showToast(`${item.nama} dimasukkan ke keranjang`);
  };

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

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    showToast('Menu dihapus dari keranjang');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Keranjang telah dikosongkan');
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
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
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
        {isLoadingMenus ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-4 border border-surface-container-high animate-pulse"
              >
                <div className="w-full aspect-square bg-surface-container rounded-xl mb-4"></div>
                <div className="h-5 bg-surface-container rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-surface-container rounded w-full mb-1"></div>
                <div className="h-3 bg-surface-container rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-surface-container rounded w-1/3"></div>
                  <div className="w-10 h-10 rounded-full bg-surface-container"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedMenus.length > 0 ? (
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

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark/95 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fadeIn">
          <span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}