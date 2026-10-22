import { useState } from 'react';
import { formatRupiah } from '../utils/formatCurrency';

export default function MenuCard({ item, onAddToCart, activeCategory }) {
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const handleAdd = () => {
    setIsAddedAnim(true);
    onAddToCart(item);
    setTimeout(() => {
      setIsAddedAnim(false);
    }, 400);
  };

  const hasSpicyLevel = item.levelPedasDefault !== null && item.levelPedasDefault !== undefined;

  return (
    <article className="bg-surface rounded-2xl overflow-hidden shadow-soft-spice hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group border border-surface-container-high/60 relative">
      {/* Gambar Menu */}
      <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          src={item.gambar}
          alt={item.nama}
          loading="lazy"
        />

        {/* Badges Top Left & Right */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasSpicyLevel && (
            <div className="bg-surface/95 backdrop-blur-md px-2.5 py-1 rounded-full text-primary text-[12px] font-extrabold flex items-center gap-1 shadow-sm border border-primary/20">
              <span className="material-symbols-outlined text-[15px] text-primary">local_fire_department</span>
              <span>Lv {item.levelPedasDefault}</span>
            </div>
          )}

          {item.kategori === 'Pilih Topping' && (
            <div className="bg-secondary/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Topping
            </div>
          )}
        </div>

        {item.isBestseller && (
          <div className="absolute top-3 right-3 bg-primary text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span>Favorit</span>
          </div>
        )}
      </div>

      {/* Informasi Detail Menu */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Kategori label jika sedang di tab 'Semua Menu' */}
        {activeCategory === 'Semua Menu' && item.kategori && (
          <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1">
            {item.kategori}
          </span>
        )}

        <h3 className="font-headline-sm text-base sm:text-[18px] font-bold text-on-surface mb-1.5 group-hover:text-primary transition-colors">
          {item.nama}
        </h3>

        <p className="text-[13px] sm:text-[14px] text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {item.deskripsi}
        </p>

        {/* Harga & Tombol Tambah */}
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-surface-container-high/40">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-400 font-semibold uppercase">Harga</span>
            <span className="font-price-display text-[18px] sm:text-[20px] font-extrabold text-primary">
              {formatRupiah(item.harga)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            title={`Tambah ${item.nama} ke keranjang`}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none ${
              isAddedAnim
                ? 'bg-green-600 text-white scale-110'
                : 'bg-primary text-white hover:bg-red-700 active:scale-90 hover:shadow-lg'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isAddedAnim ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
