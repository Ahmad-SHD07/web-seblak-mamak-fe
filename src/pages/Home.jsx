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
    id: 'M01',
    nama: 'Seblak Best Seller (Paket)',
    kategori: 'Seblak',
    harga: 10000,
    deskripsi: 'Seblak Makaroni, Kerupuk Kemplang, Cikua, Mie Kuning, dan Pilus.',
    levelPedasDefault: 2,
    isBestseller: true,
    gambar: '/image/Seblak/seblak2.webp'
  },
  {
    id: 'M02',
    nama: 'Seblak + Telor',
    kategori: 'Seblak',
    harga: 12000,
    deskripsi: 'Hidangan seblak kuah pedas gurih lengkap dengan campuran telur.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Seblak/seblak.jpg'
  },
  {
    id: 'M03',
    nama: 'Seblak Makaroni',
    kategori: 'Seblak',
    harga: 10000,
    deskripsi: 'Makaroni klasik dengan kuah pedas khas, cocok untuk camilan mengenyangkan.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Seblak/seblak1.webp'
  },
  {
    id: 'M04',
    nama: 'Seblak Kerupuk Basah',
    kategori: 'Seblak',
    harga: 15000,
    deskripsi: 'Kerupuk lembut dan kenyal yang disiram dengan kuah pedas otentik.',
    levelPedasDefault: 2,
    isBestseller: false,
    gambar: '/image/Seblak/seblak2.webp'
  },
  {
    id: 'M05',
    nama: 'Seblak Mie',
    kategori: 'Seblak',
    harga: 18000,
    deskripsi: 'Mie kenyal dicampur dengan bumbu pedas ringan dan kerupuk gurih.',
    levelPedasDefault: 1,
    isBestseller: false,
    gambar: '/image/Seblak/seblak-mie.jpeg'
  },
  {
    id: 'M06',
    nama: 'Seblak Ceker',
    kategori: 'Seblak',
    harga: 25000,
    deskripsi: 'Ceker ayam empuk yang dimasak perlahan dalam saus pedas kaya rempah.',
    levelPedasDefault: 3,
    isBestseller: false,
    gambar: '/image/Seblak/seblak-ceker.webp'
  },
  {
    id: 'T01',
    nama: 'Ceker',
    kategori: 'Pilih Topping',
    harga: 5000,
    deskripsi: 'Ceker ayam empuk dengan bumbu meresap.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/ceker.jpg'
  },
  {
    id: 'T02',
    nama: 'Telur',
    kategori: 'Pilih Topping',
    harga: 4000,
    deskripsi: 'Telur ayam segar, bisa dimasak orak-arik atau rebus.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Telur.jpg'
  },
  {
    id: 'T03',
    nama: 'Tulang',
    kategori: 'Pilih Topping',
    harga: 5000,
    deskripsi: 'Tulang rangu ayam yang gurih dan memberikan tekstur kenyal.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/ceker.jpg'
  },
  {
    id: 'T04',
    nama: 'Mie',
    kategori: 'Pilih Topping',
    harga: 3000,
    deskripsi: 'Mie kuning kenyal sebagai pelengkap karbohidrat.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Mie.jpg'
  },
  {
    id: 'T05',
    nama: 'Sosis',
    kategori: 'Pilih Topping',
    harga: 4000,
    deskripsi: 'Potongan sosis sapi berkualitas rasa gurih.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Topping/Sosis.jpg'
  },
  {
    id: 'T06',
    nama: 'Bakso',
    kategori: 'Pilih Topping',
    harga: 5000,
    deskripsi: 'Bakso sapi kenyal yang lezat, topping wajib seblak.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Basreng.webp'
  },
  {
    id: 'T07',
    nama: 'Kerupuk Kemplang',
    kategori: 'Pilih Topping',
    harga: 2000,
    deskripsi: 'Tambahan kerupuk kemplang renyah atau basah.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Seblak/seblak2.webp'
  },
  {
    id: 'T08',
    nama: 'Cikua',
    kategori: 'Pilih Topping',
    harga: 3000,
    deskripsi: 'Olahan ikan bentuk bunga yang lembut dan gurih.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Cipuk.webp'
  },
  {
    id: 'T09',
    nama: 'Pilus Cikur',
    kategori: 'Pilih Topping',
    harga: 2000,
    deskripsi: 'Taburan pilus kencur renyah pendamping kuah seblak.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Cireng.webp'
  },
  {
    id: 'G01',
    nama: 'Bala-bala / Bakwan',
    kategori: 'Gorengan',
    harga: 2000,
    deskripsi: 'Gorengan sayur hangat dan renyah.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Cipuk.webp'
  },
  {
    id: 'G02',
    nama: 'Tempe Mendoan',
    kategori: 'Gorengan',
    harga: 2000,
    deskripsi: 'Tempe goreng tepung bumbu gurih.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Gorengan/Basreng.webp'
  },
  {
    id: 'G03',
    nama: 'Cireng Bumbu Rujak',
    kategori: 'Gorengan',
    harga: 10000,
    deskripsi: 'Cireng garing dengan cocolan sambal rujak manis pedas.',
    levelPedasDefault: 1,
    isBestseller: false,
    gambar: '/image/Gorengan/Cireng.webp'
  },
  {
    id: 'C01',
    nama: 'Seblak Cobek',
    kategori: 'Cobek',
    harga: 15000,
    deskripsi: 'Seblak ulek bumbu kencur dan cabai rawit segar.',
    levelPedasDefault: 3,
    isBestseller: false,
    gambar: '/image/Cobek/Cobek-sosis.webp'
  },
  {
    id: 'C02',
    nama: 'Basreng Cobek',
    kategori: 'Cobek',
    harga: 12000,
    deskripsi: 'Bakso goreng iris yang diulek bersama sambal cobek pedas.',
    levelPedasDefault: 3,
    isBestseller: false,
    gambar: '/image/Cobek/Cobek-basreng.webp'
  },
  {
    id: 'P01',
    nama: 'Pisang Keju Original',
    kategori: 'Pisang Keju',
    harga: 10000,
    deskripsi: 'Pisang goreng/bakar dengan parutan keju melimpah dan susu.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Pisang-Keju/Pisang-Keju.webp'
  },
  {
    id: 'P02',
    nama: 'Pisang Keju Coklat',
    kategori: 'Pisang Keju',
    harga: 12000,
    deskripsi: 'Pisang manis dengan taburan keju parut dan meses coklat.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Pisang-Keju/Pisang-seres.webp'
  },
  {
    id: 'D01',
    nama: 'Es Teh Manis',
    kategori: 'Minuman',
    harga: 4000,
    deskripsi: 'Teh manis dingin segar penawar rasa pedas seblak.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Pop-Ice-coklat.webp'
  },
  {
    id: 'D02',
    nama: 'Es Jeruk Peras',
    kategori: 'Minuman',
    harga: 6000,
    deskripsi: 'Perasan jeruk murni segar dengan es batu dingin.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Pop-Ice-Avocado.webp'
  },
  {
    id: 'D03',
    nama: 'Air Mineral',
    kategori: 'Minuman',
    harga: 4000,
    deskripsi: 'Air mineral kemasan dingin atau netral.',
    levelPedasDefault: null,
    isBestseller: false,
    gambar: '/image/Minuman/Milo.webp'
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
        const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
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