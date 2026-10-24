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
  const [menus] = useState(menusData);
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  // ==================== STATE SEBLAK PRASMANAN MULTI-PORSI ====================
  // Setiap mangkuk seblak memiliki racikan toping, level pedas, dan bumbu masing-masing
  const [seblakBowls, setSeblakBowls] = useState([
    {
      id: 1,
      name: 'Seblak 1',
      spicyLevel: 2,
      bumbu: 'Gurih', // 'Gurih' atau 'Manis'
      items: []
    }
  ]);
  const [activeBowlId, setActiveBowlId] = useState(1);

  // Item non-seblak (Minuman, Pisang Keju, Gorengan, Cobek)
  const [extraItems, setExtraItems] = useState([]);

  // Notifikasi Toast Helper (2.8 detik)
  const showToast = (toastData) => {
    setToastNotification(toastData);
    setTimeout(() => {
      setToastNotification(null);
    }, 2800);
  };

  // Cek apakah suatu menu adalah toping seblak
  const isToppingItem = (item) => {
    return (
      item.kategori?.toLowerCase() === 'pilih topping' ||
      String(item.id).startsWith('T')
    );
  };

  // Tambah item ke keranjang (Toping ke Mangkuk Aktif / Menu lain ke Ekstra)
  const handleAddToCart = (item) => {
    if (isToppingItem(item)) {
      setSeblakBowls((prev) => {
        return prev.map((bowl) => {
          if (bowl.id !== activeBowlId) return bowl;
          const existing = bowl.items.find((i) => i.id === item.id);
          const updatedItems = existing
            ? bowl.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
            : [...bowl.items, { ...item, qty: 1 }];
          return { ...bowl, items: updatedItems };
        });
      });

      const currentBowl = seblakBowls.find((b) => b.id === activeBowlId);
      const bowlName = currentBowl ? currentBowl.name : 'Seblak 1';
      showToast({
        type: 'success',
        title: 'Toping Ditambahkan!',
        nama: `${item.nama} dimasukkan ke ${bowlName}`,
        gambar: item.gambar,
        showCartBtn: true
      });
    } else {
      setExtraItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { ...item, qty: 1 }];
      });

      showToast({
        type: 'success',
        title: 'Menu Ditambahkan!',
        nama: `${item.nama} dimasukkan ke keranjang`,
        gambar: item.gambar,
        showCartBtn: true
      });
    }
  };

  // Tambah porsi seblak baru (Mangkuk Seblak 2, 3, dst.)
  const handleAddBowl = () => {
    const nextNumber = seblakBowls.length + 1;
    const newBowl = {
      id: Date.now(),
      name: `Seblak ${nextNumber}`,
      spicyLevel: 2,
      bumbu: 'Gurih',
      items: []
    };
    setSeblakBowls((prev) => [...prev, newBowl]);
    setActiveBowlId(newBowl.id);

    showToast({
      type: 'success',
      title: 'Porsi Baru Dibuat!',
      nama: `Mangkuk Seblak ${nextNumber} aktif. Silakan pilih topingnya!`,
      gambar: null,
      showCartBtn: false
    });
  };

  // Hapus porsi seblak
  const handleRemoveBowl = (bowlId) => {
    if (seblakBowls.length <= 1) {
      setSeblakBowls([
        {
          id: 1,
          name: 'Seblak 1',
          spicyLevel: 2,
          bumbu: 'Gurih',
          items: []
        }
      ]);
      setActiveBowlId(1);
    } else {
      const remaining = seblakBowls
        .filter((b) => b.id !== bowlId)
        .map((b, idx) => ({ ...b, name: `Seblak ${idx + 1}` }));
      setSeblakBowls(remaining);
      if (activeBowlId === bowlId) {
        setActiveBowlId(remaining[0].id);
      }
    }
    showToast({
      type: 'remove',
      title: 'Porsi Dihapus!',
      nama: 'Satu porsi mangkuk seblak telah dihapus',
      gambar: null,
      showCartBtn: false
    });
  };

  // Ubah level pedas porsi seblak
  const handleUpdateBowlSpicy = (bowlId, level) => {
    setSeblakBowls((prev) =>
      prev.map((b) => (b.id === bowlId ? { ...b, spicyLevel: Number(level) } : b))
    );
  };

  // Ubah preferensi bumbu (Gurih / Manis) porsi seblak
  const handleUpdateBowlBumbu = (bowlId, bumbu) => {
    setSeblakBowls((prev) =>
      prev.map((b) => (b.id === bowlId ? { ...b, bumbu } : b))
    );
  };

  // Update kuantitas toping di dalam porsi seblak
  const handleUpdateBowlItemQty = (bowlId, itemId, delta) => {
    setSeblakBowls((prev) =>
      prev.map((bowl) => {
        if (bowl.id !== bowlId) return bowl;
        const updatedItems = bowl.items
          .map((item) => {
            if (item.id === itemId) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
          })
          .filter(Boolean);
        return { ...bowl, items: updatedItems };
      })
    );
  };

  // Hapus satu toping dari porsi seblak
  const handleRemoveBowlItem = (bowlId, itemId) => {
    setSeblakBowls((prev) =>
      prev.map((bowl) => {
        if (bowl.id !== bowlId) return bowl;
        return { ...bowl, items: bowl.items.filter((i) => i.id !== itemId) };
      })
    );
  };

  // Update kuantitas menu non-seblak
  const handleUpdateExtraItemQty = (itemId, delta) => {
    setExtraItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Hapus menu non-seblak
  const handleRemoveExtraItem = (itemId) => {
    setExtraItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Kosongkan seluruh keranjang
  const handleClearCart = () => {
    setSeblakBowls([
      {
        id: 1,
        name: 'Seblak 1',
        spicyLevel: 2,
        bumbu: 'Gurih',
        items: []
      }
    ]);
    setActiveBowlId(1);
    setExtraItems([]);
    showToast({
      type: 'clear',
      title: 'Keranjang Dikosongkan!',
      nama: 'Semua pesanan telah dihapus',
      gambar: null,
      showCartBtn: false
    });
  };

  // ==================== KALKULASI TOTAL PESANAN ====================
  const totalSeblakItemsCount = seblakBowls.reduce(
    (acc, b) => acc + b.items.reduce((s, i) => s + i.qty, 0),
    0
  );
  const totalExtraItemsCount = extraItems.reduce((acc, i) => acc + i.qty, 0);
  const totalCartCount = totalSeblakItemsCount + totalExtraItemsCount;

  const totalSeblakPrice = seblakBowls.reduce((acc, b) => {
    const topingTotal = b.items.reduce((s, i) => s + i.harga * i.qty, 0);
    const extraFee =
      topingTotal > 0 && (Number(b.spicyLevel) === 4 || Number(b.spicyLevel) === 5) ? 2000 : 0;
    return acc + (topingTotal > 0 ? topingTotal + extraFee : 0);
  }, 0);
  const totalExtraPrice = extraItems.reduce((acc, i) => acc + i.harga * i.qty, 0);
  const totalCartPrice = totalSeblakPrice + totalExtraPrice;

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
      const matchCategory =
        activeCategory === 'Semua Menu' ||
        item.kategori.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.nama.toLowerCase().includes(query) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(query)) ||
        (item.kategori && item.kategori.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [menus, activeCategory, searchQuery]);

  // Info mangkuk aktif saat ini
  const activeBowlIndex = seblakBowls.findIndex((b) => b.id === activeBowlId);
  const activeBowlName = activeBowlIndex !== -1 ? `Seblak ${activeBowlIndex + 1}` : 'Seblak 1';

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
        {/* Hero Banner Prasmanan */}
        {!searchQuery && <HeroBanner />}

        {/* ==================== SELECTOR PORSI MANGKUK SEBLAK AKTIF ==================== */}
        <section className="mb-6 p-4 sm:p-5 bg-surface rounded-2xl border-2 border-primary/20 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-dark">
                  Mangkuk Seblak Prasmanan Anda
                </h3>
                <p className="text-xs text-gray-500">
                  Toping yang Anda klik akan masuk ke <span className="font-bold text-primary">{activeBowlName}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleAddBowl}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border-2 border-dashed border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Buat Mangkuk Seblak Baru</span>
            </button>
          </div>

          {/* Tab Mangkuk-Mangkuk Seblak */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {seblakBowls.map((bowl, idx) => {
              const isActive = activeBowlId === bowl.id;
              const topingCount = bowl.items.reduce((acc, i) => acc + i.qty, 0);

              return (
                <button
                  key={bowl.id}
                  onClick={() => setActiveBowlId(bowl.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-primary text-white shadow-md ring-2 ring-primary/30 scale-[1.02]'
                      : 'bg-surface-container text-dark hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isActive ? 'check_circle' : 'soup_kitchen'}
                  </span>
                  <span>Seblak #{idx + 1}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-surface-container-high text-gray-700'
                    }`}
                  >
                    {topingCount} toping
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filter Kategori Interaktif */}
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

      {/* Drawer / Modal Keranjang Belanja Prasmanan */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        seblakBowls={seblakBowls}
        onAddBowl={handleAddBowl}
        onRemoveBowl={handleRemoveBowl}
        onUpdateBowlSpicy={handleUpdateBowlSpicy}
        onUpdateBowlBumbu={handleUpdateBowlBumbu}
        onUpdateBowlItemQty={handleUpdateBowlItemQty}
        onRemoveBowlItem={handleRemoveBowlItem}
        extraItems={extraItems}
        onUpdateExtraItemQty={handleUpdateExtraItemQty}
        onRemoveExtraItem={handleRemoveExtraItem}
        onClearCart={handleClearCart}
        totalCartPrice={totalCartPrice}
        totalCartCount={totalCartCount}
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
            {toastNotification.gambar ? (
              <img
                src={toastNotification.gambar}
                alt={toastNotification.nama}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {toastNotification.type === 'success' ? 'soup_kitchen' : 'delete'}
                </span>
              </div>
            )}

            <div className="text-left min-w-0">
              <div
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                  toastNotification.type === 'success' ? 'text-green-700' : 'text-red-600'
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