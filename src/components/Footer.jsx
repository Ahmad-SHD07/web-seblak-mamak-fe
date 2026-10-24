export default function Footer() {
  return (
    <footer className="bg-surface-container-high mt-auto w-full border-t border-surface-container-highest">
      <div className="w-full max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Brand & Deskripsi */}
          <div className="md:col-span-6 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
              </div>
              <h2 className="font-headline-sm text-xl font-black text-on-surface">
                Seblak Mak Eunin
              </h2>
            </div>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              Sensasi pedas gurih khas rempah kencur asli Jawa Barat. Dibuat dari bahan segar berkualitas dengan resep otentik turun-temurun Mak Eunin.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                Buka: 08.00 - 17.00 WIB
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                Bandung, Jawa Barat
              </span>
            </div>
          </div>

          {/* Kolom Kanan: Navigasi & Tautan */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-6 md:justify-items-end">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-dark uppercase tracking-wider">
                Informasi
              </span>
              <a
                href="#menu-section"
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max"
              >
                Katalog Menu
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Seblak Mak Eunin menyajikan aneka seblak dan camilan pedas nikmat khas Sunda.');
                }}
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max"
              >
                Tentang Kami
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Pemesanan diproses langsung melalui WhatsApp penjual setelah Anda memilih menu.');
                }}
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max"
              >
                Cara Pemesanan
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-dark uppercase tracking-wider">
                Bantuan & Privasi
              </span>
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Pesanan yang sudah dikonfirmasi ke WhatsApp penjual akan segera disiapkan.');
                }}
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max"
              >
                Ketentuan Layanan
              </a>
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Data pemesan hanya digunakan untuk keperluan konfirmasi pesanan WhatsApp.');
                }}
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max"
              >
                Kebijakan Privasi
              </a>
              <a
                href="https://wa.me/6283824468119"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors w-max flex items-center gap-1"
              >
                <span>WhatsApp Owner</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="border-t border-surface-container-highest/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 Seblak Mak Eunin. Hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <span className="text-primary font-bold">♥</span> rasa pedas asli nusantara
          </p>
        </div>
      </div>
    </footer>
  );
}