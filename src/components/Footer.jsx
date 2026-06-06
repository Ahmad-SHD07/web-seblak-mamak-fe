export default function Footer() {
    return (
        <footer className="bg-surface-container-high mt-auto w-full border-t border-outline-variant">
            <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* kolom kiri */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-headline-sm text-xl font-black text-on-surface">Seblak Mak Eunin</h2>
                        <p className="text-sm text-on-surface-variant mt-1 md:w-3/4">© 2026 Seblak Mak Eunin. Hak cipta dilindungi undang-undang.</p>
                    </div>

                    {/* kolom kanan (menu navigasi) */}
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:justify-end">
                        <div className="flex flex-col gap-3">
                            <a href="" className="text-sm text-on-surface-variant hover:text-primary transition-colors w-max">Tentang Kami</a>
                            <a href="" className="text-sm text-on-surface-variant hover:text-primary transition-colors w-max">Ketentuan Layanannn</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a href="" className="text-sm text-on-surface-variant hover:text-primary transition-colors w-max">Kebijakan privasi</a>
                            <a href="" className="text-sm text-on-surface-variant hover:text-primary transition-colors w-max">Hubungi Dukungan</a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}