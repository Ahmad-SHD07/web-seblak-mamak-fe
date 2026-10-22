import { formatRupiah } from '../utils/formatCurrency';

export default function HeroBanner({ bestsellerItem, onOrderNow }) {
  const defaultBestseller = {
    id: 4,
    nama: 'Seblak Kerupuk Istimewa',
    harga: 15000,
    deskripsi: 'Hidangan khas kami yang menyajikan perpaduan sempurna antara kerupuk basah kenyal, kuah pedas kencur gurih berempah, dengan kuah merah merona khas Mak Eunin.',
    gambar: '/image/Seblak/seblak2.webp'
  };

  const item = bestsellerItem || defaultBestseller;

  const handleCtaClick = () => {
    if (onOrderNow) {
      onOrderNow(item);
    } else {
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-[360px] md:h-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-soft-spice group cursor-pointer mb-8 md:mb-12 border border-surface-container-high transition-all">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={item.gambar || '/image/Seblak/seblak2.webp'}
        alt={item.nama}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20 sm:to-transparent"></div>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 md:p-12 lg:p-16 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-secondary text-white text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            Menu Terlaris Minggu Ini
          </span>
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full hidden sm:inline-block">
            Racikan Asli Mak Eunin
          </span>
        </div>

        <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-md">
          {item.nama}
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-6 line-clamp-3 leading-relaxed max-w-xl">
          {item.deskripsi}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleCtaClick}
            className="bg-primary text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 rounded-full hover:bg-red-700 active:scale-95 transition-all shadow-lg flex items-center gap-2 group/btn"
          >
            <span>Pesan Sekarang - {formatRupiah(item.harga)}</span>
            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          <a
            href="#menu-section"
            className="text-white/90 hover:text-white text-xs md:text-sm font-semibold underline underline-offset-4 hover:no-underline py-2 px-3 rounded-lg hover:bg-white/10 transition"
          >
            Lihat Semua Menu
          </a>
        </div>
      </div>
    </section>
  );
}
