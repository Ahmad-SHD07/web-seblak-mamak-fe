import { useState } from 'react';
import { formatRupiah } from '../utils/formatCurrency';

export default function CartDrawer({
  isOpen,
  onClose,
  seblakBowls = [],
  onAddBowl,
  onRemoveBowl,
  onUpdateBowlSpicy,
  onUpdateBowlBumbu,
  onUpdateBowlItemQty,
  onRemoveBowlItem,
  extraItems = [],
  onUpdateExtraItemQty,
  onRemoveExtraItem,
  onClearCart,
  totalCartPrice = 0,
  totalCartCount = 0
}) {
  const [customerName, setCustomerName] = useState('');
  const orderType = 'Bungkus (Takeaway)';
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const spicyLevels = [
    { level: 0, label: 'Lv 0 (Tidak Pedas)', shortLabel: 'Tidak Pedas' },
    { level: 1, label: 'Lv 1 (Pedas Santai)', shortLabel: 'Pedas Santai' },
    { level: 2, label: 'Lv 2 (Pedas Sedang)', shortLabel: 'Pedas Sedang' },
    { level: 3, label: 'Lv 3 (Pedas Mantap)', shortLabel: 'Pedas Mantap' },
    { level: 4, label: 'Lv 4 (Pedas Nampol +Rp 2.000)', shortLabel: 'Pedas Nampol' },
    { level: 5, label: 'Lv 5 (Level Dewa +Rp 2.000)', shortLabel: 'Level Dewa' },
  ];

  // Porsi seblak yang sudah memiliki toping
  const bowlsWithItems = seblakBowls.filter((b) => b.items && b.items.length > 0);
  const hasSeblak = bowlsWithItems.length > 0;
  const hasAnyItems = hasSeblak || extraItems.length > 0;
  // Catatan khusus hanya WAJIB jika memesan minuman atau pisang keju (karena ada varian/toping)
  const isNotesRequired = extraItems.length > 0;

  // Checkout Pesanan ke WhatsApp
  const handleCheckout = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Silakan isi Nama Pemesan terlebih dahulu.');
      return;
    }

    if (!hasAnyItems) {
      setErrorMessage('Keranjang belanja Anda masih kosong.');
      return;
    }

    if (isNotesRequired && !notes.trim()) {
      setErrorMessage('Silakan isi Catatan Khusus untuk keterangan varian/toping minuman atau pisang keju.');
      return;
    }

    let waText;

    if (hasSeblak) {
      // ==================== FORMAT 1: ADA PESANAN SEBLAK MULTI-PORSI ====================
      const seblakBlocks = bowlsWithItems.map((bowl, idx) => {
        const topingLines = bowl.items
          .map((item, i) => {
            const itemText = `${i + 1}. ${item.nama}${item.qty > 1 ? ` (${item.qty}x)` : ''}`;
            return i === 0 ? `*Seblak ${idx + 1}:* ${itemText}` : `            ${itemText}`;
          })
          .join('\n');

        const spicyInfo = spicyLevels.find((s) => s.level === Number(bowl.spicyLevel)) || spicyLevels[2];
        const spicyText = `Lv ${spicyInfo.level} (${spicyInfo.shortLabel})`;
        const bumbuText = `Bumbu ${bowl.bumbu || 'Gurih'}${notes.trim() ? ` - ${notes.trim()}` : ''}`;

        return [
          topingLines,
          `*Level Pedas:* ${spicyText}`,
          `*Catatan khusus:* ${bumbuText}`
        ].join('\n');
      }).join('\n\n');

      // Rincian Menu
      const nonSeblakLines = extraItems.map(
        (i) => `- ${i.nama} (x${i.qty}) : ${formatRupiah(i.harga * i.qty)}`
      );

      const seblakSummaryLines = [];
      bowlsWithItems.forEach((bowl, idx) => {
        const bowlTopingPrice = bowl.items.reduce((acc, i) => acc + i.harga * i.qty, 0);
        seblakSummaryLines.push(`- Seblak ke-${idx + 1} : ${formatRupiah(bowlTopingPrice)}`);
        if (Number(bowl.spicyLevel) === 4 || Number(bowl.spicyLevel) === 5) {
          seblakSummaryLines.push(
            bowlsWithItems.length > 1
              ? `- Biaya Ekstra Pedas (Lv ${bowl.spicyLevel} Seblak ${idx + 1}) : Rp 2.000`
              : `- Biaya Ekstra Pedas (Lv ${bowl.spicyLevel}) : Rp 2.000`
          );
        }
      });

      const rincianMenu = [...nonSeblakLines, ...seblakSummaryLines];

      waText = [
        '*PESANAN BARU - SEBLAK MAK EUNIN*',
        '',
        `*Nama Pemesan:* ${customerName.trim()}`,
        `*Tipe Pesanan:* ${orderType}`,
        '',
        seblakBlocks,
        '',
        '*Rincian Menu:*',
        ...rincianMenu,
        '',
        `*Total Pembayaran:* ${formatRupiah(totalCartPrice)}`,
        '',
        'Mohon ditunggu, pesanan sedang diproses ya!'
      ].join('\n');

    } else {
      // ==================== FORMAT 2: HANYA MINUMAN / PISANG KEJU (TANPA SEBLAK) ====================
      const menuLines = extraItems.map(
        (i) => `- ${i.nama} (x${i.qty}) : ${formatRupiah(i.harga * i.qty)}`
      );

      waText = [
        '*PESANAN BARU - SEBLAK MAK EUNIN*',
        '',
        `*Nama Pemesan:* ${customerName.trim()}`,
        `*Tipe Pesanan:* ${orderType}`,
        `*Catatan khusus:* ${notes.trim()}`,
        '',
        '*Rincian Menu:*',
        ...menuLines,
        '',
        `*Total Pembayaran:* ${formatRupiah(totalCartPrice)}`,
        '',
        'Mohon ditunggu, pesanan sedang diproses ya!'
      ].join('\n');
    }

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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-lg bg-surface shadow-2xl flex flex-col h-full border-l border-surface-container-high">
          {/* Header Drawer */}
          <div className="p-4 sm:p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-lg font-bold text-dark">Keranjang Belanja</h2>
                <p className="text-xs text-gray-500">{totalCartCount} item terpilih</p>
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

            {/* Jika Keranjang Kosong */}
            {!hasAnyItems ? (
              <div className="py-16 flex flex-col items-center justify-center text-center text-gray-400">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-3xl text-gray-400">
                    soup_kitchen
                  </span>
                </div>
                <h3 className="font-bold text-dark text-base mb-1">Keranjang masih kosong</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-4">
                  Pilih toping seblak prasmanan atau aneka minuman lezat untuk memulai pesanan.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
                >
                  Mulai Pilih Toping
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Header Action: Kosongkan */}
                <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/60">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Daftar Mangkuk & Menu
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 transition"
                  >
                    Kosongkan Semua
                  </button>
                </div>

                {/* ==================== DAFTAR PORSI MANGKUK SEBLAK ==================== */}
                {seblakBowls.map((bowl, idx) => {
                  const bowlTopingPrice = bowl.items.reduce((acc, i) => acc + i.harga * i.qty, 0);
                  const isSpicyExtra = Number(bowl.spicyLevel) === 4 || Number(bowl.spicyLevel) === 5;

                  return (
                    <div
                      key={bowl.id}
                      className="p-4 bg-surface-container-low rounded-2xl border-2 border-primary/20 shadow-sm space-y-3"
                    >
                      {/* Header Mangkuk */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-extrabold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-extrabold text-dark">
                              Seblak Porsi {idx + 1}
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              {bowl.items.length} jenis toping ({formatRupiah(bowlTopingPrice)})
                            </p>
                          </div>
                        </div>

                        {seblakBowls.length > 1 && (
                          <button
                            onClick={() => onRemoveBowl(bowl.id)}
                            className="text-gray-400 hover:text-red-600 p-1 text-xs flex items-center gap-1 transition"
                            title="Hapus porsi seblak ini"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span>Hapus Porsi</span>
                          </button>
                        )}
                      </div>

                      {/* Kontrol Pedas & Bumbu Mangkuk Ini */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-surface-container-high/60">
                        {/* Level Pedas */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Level Pedas
                          </label>
                          <select
                            value={bowl.spicyLevel}
                            onChange={(e) => onUpdateBowlSpicy(bowl.id, e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-surface-container-high bg-surface text-xs font-semibold text-dark focus:outline-none focus:border-primary"
                          >
                            {spicyLevels.map((lvl) => (
                              <option key={lvl.level} value={lvl.level}>
                                {lvl.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Preferensi Bumbu */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Preferensi Bumbu
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {['Gurih', 'Manis', 'Gurih Manis'].map((bumbuOpt) => (
                              <button
                                key={bumbuOpt}
                                type="button"
                                onClick={() => onUpdateBowlBumbu(bowl.id, bumbuOpt)}
                                className={`py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-bold transition text-center ${
                                  bowl.bumbu === bumbuOpt
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-surface text-gray-600 border border-surface-container-high hover:bg-surface-container'
                                }`}
                              >
                                {bumbuOpt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {isSpicyExtra && (
                        <p className="text-[11px] text-primary font-bold">
                          *Ekstra pedas Lv {bowl.spicyLevel} (+Rp 2.000)
                        </p>
                      )}

                      {/* List Toping di Mangkuk Ini */}
                      {bowl.items.length === 0 ? (
                        <p className="text-xs text-gray-400 italic py-2">
                          Belum ada toping di mangkuk ini. Pilih toping di katalog untuk mengisi.
                        </p>
                      ) : (
                        <div className="space-y-2 pt-1">
                          {bowl.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2.5 p-2 bg-surface rounded-xl border border-surface-container-high/70"
                            >
                              <img
                                src={item.gambar}
                                alt={item.nama}
                                className="w-10 h-10 object-cover rounded-lg bg-surface-container shrink-0"
                              />

                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-dark truncate">{item.nama}</h5>
                                <p className="text-[11px] text-primary font-semibold">
                                  {formatRupiah(item.harga * item.qty)}
                                </p>
                              </div>

                              {/* Stepper Qty */}
                              <div className="flex items-center gap-1 bg-surface-container rounded-lg p-0.5 shrink-0">
                                <button
                                  onClick={() => onUpdateBowlItemQty(bowl.id, item.id, -1)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:text-primary text-xs font-bold"
                                >
                                  -
                                </button>
                                <span className="w-4 text-center text-xs font-bold text-dark">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => onUpdateBowlItemQty(bowl.id, item.id, 1)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:text-primary text-xs font-bold"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveBowlItem(bowl.id, item.id)}
                                className="text-gray-400 hover:text-red-600 p-1 transition"
                                title="Hapus toping"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Tombol Tambah Mangkuk Seblak di Drawer */}
                <button
                  onClick={onAddBowl}
                  className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-primary text-primary hover:bg-primary/10 transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Tambah Porsi Mangkuk Seblak Lainnya</span>
                </button>

                {/* ==================== MENU LAINNYA (MINUMAN / PISANG KEJU) ==================== */}
                {extraItems.length > 0 && (
                  <div className="pt-3 border-t border-surface-container-high space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Minuman & Menu Tambahan ({extraItems.length})
                    </span>

                    {extraItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-surface-container-high/70"
                      >
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-12 h-12 object-cover rounded-lg bg-surface-container shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs sm:text-sm font-bold text-dark truncate">
                            {item.nama}
                          </h5>
                          <p className="text-xs font-semibold text-primary">
                            {formatRupiah(item.harga * item.qty)}
                          </p>
                        </div>

                        {/* Stepper Qty */}
                        <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1 shrink-0">
                          <button
                            onClick={() => onUpdateExtraItemQty(item.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:text-primary text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-dark">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateExtraItemQty(item.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:text-primary text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveExtraItem(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 transition"
                          title="Hapus menu"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ==================== FORM DATA PEMESAN ==================== */}
                <div className="space-y-4 pt-3 border-t border-surface-container-high">
                  {/* Nama Pemesan */}
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      Nama Pemesan <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ahmad"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  {/* Opsi Pesanan */}
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      Tipe Pesanan
                    </label>
                    <div className="p-3 rounded-xl text-xs font-bold flex items-center justify-between border bg-primary/10 border-primary text-primary shadow-sm">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">
                          takeout_dining
                        </span>
                        <span>Bungkus / Ambil di Warung (Takeaway)</span>
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        check_circle
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Pesanan disiapkan untuk Anda ambil langsung di Warung Seblak Mak Eunin.
                    </p>
                  </div>

                  {/* Catatan Khusus */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider">
                        Catatan Khusus {isNotesRequired ? (
                          <span className="text-primary">*</span>
                        ) : (
                          <span className="text-gray-400 font-normal text-[11px] lowercase">(opsional)</span>
                        )}
                      </label>
                      {isNotesRequired && (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Wajib untuk minuman / pisang keju
                        </span>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      placeholder={
                        isNotesRequired
                          ? 'Contoh: Pop Ice manis, Pisang Keju parutan keju banyakin...'
                          : 'Contoh: Kuah kental, sedikit kencur (opsional)...'
                      }
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-surface-container-high bg-surface text-xs sm:text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                    ></textarea>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {isNotesRequired
                        ? 'Wajib diisi: Keterangan rasa atau pilihan toping untuk Minuman / Pisang Keju.'
                        : 'Opsional: Level pedas & bumbu sudah dipilih di atas. Isi jika ada permintaan khusus lainnya.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Drawer (Kalkulasi & Tombol Checkout) */}
          {hasAnyItems && (
            <div className="p-4 sm:p-5 border-t border-surface-container-high bg-surface-container/30 space-y-3">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Total Item</span>
                <span className="font-semibold text-dark">{totalCartCount} item</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-surface-container-high">
                <span className="text-sm font-bold text-dark">Total Pembayaran</span>
                <span className="font-price-display text-xl font-extrabold text-primary">
                  {formatRupiah(totalCartPrice)}
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
