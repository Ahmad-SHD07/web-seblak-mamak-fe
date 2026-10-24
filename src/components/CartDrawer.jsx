import { useState } from 'react';
import { formatRupiah } from '../utils/formatCurrency';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Bungkus (Takeaway)');
  const [spicyLevel, setSpicyLevel] = useState(2);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalItems = cartItems.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const extraSpicyFee = (Number(spicyLevel) === 4 || Number(spicyLevel) === 5) ? 2000 : 0;
  const totalPrice = subtotalItems + extraSpicyFee;

  const orderTypeOptions = [
    { label: 'Bungkus (Takeaway)', icon: 'takeout_dining' },
    { label: 'Makan di Tempat', icon: 'table_restaurant' },
    { label: 'Diantar (Delivery)', icon: 'delivery_dining' },
  ];

  const spicyLevels = [
    { level: 0, label: 'Lv 0 (Tidak Pedas - Bumbu gurih kencur & kaldu)', shortLabel: 'Tidak Pedas' },
    { level: 1, label: 'Lv 1 (Pedas Santai - Cabai rawit ringan)', shortLabel: 'Pedas Santai' },
    { level: 2, label: 'Lv 2 (Pedas Sedang - Standar khas Mak Eunin)', shortLabel: 'Pedas Sedang' },
    { level: 3, label: 'Lv 3 (Pedas Mantap - Penikmat pedas sejati)', shortLabel: 'Pedas Mantap' },
    { level: 4, label: 'Lv 4 (Pedas Nampol +Rp 2.000)', shortLabel: 'Pedas Nampol' },
    { level: 5, label: 'Lv 5 (Sangat Pedas / Level Dewa +Rp 2.000)', shortLabel: 'Sangat Pedas / Level Dewa' },
  ];

  // Fungsi pengiriman pesanan langsung ke WhatsApp (Pure Frontend)
  const handleCheckout = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setErrorMessage('');

    // Validasi input pemesan
    if (!customerName.trim()) {
      setErrorMessage('Silakan isi Nama Pemesan terlebih dahulu.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Keranjang belanja Anda masih kosong.');
      return;
    }

    // Detail level pedas terpilih
    const selectedSpicy = spicyLevels.find((s) => s.level === Number(spicyLevel));
    const spicyLabel = selectedSpicy ? selectedSpicy.shortLabel : `Level ${spicyLevel}`;

    // Filter daftar topping jika ada
    const toppingItems = cartItems
      .filter((i) => i.kategori === 'Pilih Topping' || String(i.id).startsWith('T'))
      .map((i) => `${i.qty}x ${i.nama}`);
    const toppingText = toppingItems.length > 0 ? toppingItems.join(', ') : '-';

    // Rincian menu pesanan
    const menuLines = cartItems.map(
      (i) => `- ${i.nama} (x${i.qty}) : ${formatRupiah(i.harga * i.qty)}`
    );
    if (extraSpicyFee > 0) {
      menuLines.push(`- Biaya Ekstra Pedas (Lv ${spicyLevel}) : ${formatRupiah(extraSpicyFee)}`);
    }

    // Susun format pesan WhatsApp rapi
    const waText = [
      '*PESANAN BARU - SEBLAK MAK EUNIN*',
      '----------------------------------------',
      `*Nama Pemesan:* ${customerName.trim()}`,
      `*Tipe Pesanan:* ${orderType}`,
      `*Level Pedas:* Lv ${spicyLevel} (${spicyLabel})`,
      `*Tambahan Topping:* ${toppingText}`,
      `*Catatan Khusus:* ${notes.trim() || '-'}`,
      '',
      '*Rincian Menu:*',
      ...menuLines,
      '',
      '----------------------------------------',
      `*Total Pembayaran:* ${formatRupiah(totalPrice)}`,
      '----------------------------------------',
      'Mohon ditunggu, pesanan sedang diproses ya! 🙏'
    ].join('\n');

    // Nomor WhatsApp tujuan
    const waPhone = import.meta.env.VITE_WA_NUMBER || '6283824468119';
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

    // Buka WhatsApp
    try {
      const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = waUrl;
      }
    } catch {
      window.location.href = waUrl;
    }
  };


  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-surface shadow-2xl flex flex-col h-full border-l border-surface-container-high">
          {/* Header Drawer */}
          <div className="p-4 sm:p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-lg font-bold text-dark">Keranjang Belanja</h2>
                <p className="text-xs text-gray-500">{totalQuantity} item terpilih</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-dark hover:bg-surface-container transition-colors focus:outline-none"
              title="Tutup Keranjang"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Body Konten */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Pesan Kesalahan Validasi */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* List Item Keranjang */}
            {cartItems.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-3xl text-gray-400">
                    shopping_bag
                  </span>
                </div>
                <h3 className="font-bold text-dark text-base mb-1">Keranjang masih kosong</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-4">
                  Pilih menu seblak atau aneka camilan lezat Mak Eunin dan tambahkan ke sini.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
                >
                  Mulai Pilih Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Daftar Pesanan ({cartItems.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 transition"
                  >
                    Kosongkan
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-surface-container-high/60"
                  >
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-14 h-14 object-cover rounded-lg bg-surface-container shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-dark truncate">
                        {item.nama}
                      </h4>
                      <p className="text-xs font-semibold text-primary">
                        {formatRupiah(item.harga)}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Subtotal: {formatRupiah(item.harga * item.qty)}
                      </p>
                    </div>

                    {/* Tombol Pengatur Kuantitas */}
                    <div className="flex items-center gap-1.5 bg-surface rounded-lg p-1 border border-surface-container-high shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-surface-container hover:text-primary transition active:scale-95 text-xs font-bold"
                        title="Kurangi"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-extrabold text-dark">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-surface-container hover:text-primary transition active:scale-95 text-xs font-bold"
                        title="Tambah"
                      >
                        +
                      </button>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded-lg transition"
                      title="Hapus menu ini"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Formulir Detail Pemesan & Kustomisasi */}
            {cartItems.length > 0 && (
              <div className="space-y-4 pt-3 border-t border-surface-container-high">
                {/* Input Nama Pemesan (Wajib) */}
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Nama Pemesan <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                </div>

                {/* Opsi Pengambilan */}
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Opsi Pesanan
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {orderTypeOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => setOrderType(opt.label)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition ${
                          orderType === opt.label
                            ? 'bg-primary/10 border-primary text-primary font-bold'
                            : 'bg-surface border-surface-container-high text-gray-600 hover:bg-surface-container'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            {opt.icon}
                          </span>
                          {opt.label}
                        </span>
                        {orderType === opt.label && (
                          <span className="material-symbols-outlined text-[16px] text-primary">
                            check_circle
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tingkat Kepedasan */}
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Tingkat Kepedasan (Pedas Level)
                  </label>
                  <select
                    value={spicyLevel}
                    onChange={(e) => setSpicyLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface text-xs sm:text-sm text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    {spicyLevels.map((lvl) => (
                      <option key={lvl.level} value={lvl.level}>
                        {lvl.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Catatan Khusus */}
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Catatan Khusus (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: kuah kental, pisahkan kerupuk, tanpa daun bawang"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-surface-container-high bg-surface text-xs sm:text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Footer Drawer (Kalkulasi & Tombol Checkout) */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-surface-container-high bg-surface-container/30 space-y-3">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Subtotal Menu ({totalQuantity} item)</span>
                <span className="font-semibold text-dark">{formatRupiah(subtotalItems)}</span>
              </div>

              {extraSpicyFee > 0 && (
                <div className="flex justify-between items-center text-xs text-primary font-semibold">
                  <span>Biaya Ekstra Pedas (Lv {spicyLevel})</span>
                  <span>+{formatRupiah(extraSpicyFee)}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-surface-container-high">
                <span className="text-sm font-bold text-dark">Total Pembayaran</span>
                <span className="font-price-display text-xl font-extrabold text-primary">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-98 transition"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Pesan via WhatsApp Sekarang</span>
              </button>

              <p className="text-[11px] text-center text-gray-400">
                Pesanan akan langsung diteruskan ke WhatsApp penjual untuk konfirmasi.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
