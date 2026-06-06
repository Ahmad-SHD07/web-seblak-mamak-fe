import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Home() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Memanggil komponen navbar */}
            <Navbar />

            <main className="flex-grow w-full max-w-[1280] mx-auto px-container-margin-mobile md:px-container-margin-desktopp py-md md:py-lg">
                {/* Banner  */}
                <section className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-soft-spice group cursor-pointer mb-8 md:mb-12">
                        <img
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="./image/seblak2.webp" 
                            alt="" 
                        />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 md:p-12">
                        <span className="bg-primary text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full w-max mb-4 uppercase tracking-wider">Menu Terlaris</span>
                        <h1 className="font-headline-xl text-3xl md:text-5xl font-extrabold text-white mb-3 w-full md:w-2/3 leading-tight">SeblaK Kerupuk</h1>
                        <p className="text-sm md:text-base text-gray-200 w-full md:w-1/2 mb-6 line-clamp-3">Hidangan khas kami yang menyajikan perpaduan sempurna antara kuah pedas gurih dengan topping yang melimpah. Pengalaman pedas yang akan membuat Anda ketagihan.</p>
                        <button className="bg-primary text-white font-bold px-6 py-3 rounded-full w-max hover:bg-red-800 transition-colors shadow-lg active:scale-95">Pesan Sekarang - Rp 15.000</button>
                    </div>
                    
                </section>

                {/* filter kkategori */}
                <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4\">
                    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-primary text-white font-semibold text-sm transition-colors shadow-sm">Semua Menu</button>
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-surface-container text-dark font-semibold text-sm hover:bg-gray-200 transition-colors">Pilih Topping</button>
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-surface-container text-dark font-semibold text-sm hover:bg-gray-200 transition-colors">Gorengan</button>
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-surface-container text-dark font-semibold text-sm hover:bg-gray-200 transition-colors">Cobek</button>
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-surface-container text-dark font-semibold text-sm hover:bg-gray-200 transition-colors">Pisang Keju</button>
                        <button className="whitespace-nowrap px-5 py2.5 rounded-lg bg-surface-container text-dark font-semibold text-sm hover:bg-gray-200 transition-colors">Minuman</button>
                    </div>
                </section>

                {/* daftar menu */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {/* Menu 1 */}
                    <article className="bg-surface rounded-xl overflow-hidden shadow-soft-spice hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-surface-container-low">
                        <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="./image/seblak1.webp" alt="" />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary text-[12px] font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Lv 2
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-1">Seblak Makaroni</h3>
                            <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4 flex-grow">Makaroni klasik dengan kuah pedas khas kami, cocok untuk camilan cepat dan mengenyangkan.</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-price-display text-[20px] font-bold text-primary">Rp 10.000</span>
                                <button className="bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md active:scale-95 w-10 h-10">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    {/* Menu 2 */}
                    <article className="bg-surface rounded-xl overflow-hidden shadow-soft-spice hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-surface-container-low">
                        <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="./image/seblak1.webp" alt="" />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary text-[12px] font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Lv 2
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-1">Seblak Makaroni</h3>
                            <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4 flex-grow">Makaroni klasik dengan kuah pedas khas kami, cocok untuk camilan cepat dan mengenyangkan.</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-price-display text-[20px] font-bold text-primary">Rp 10.000</span>
                                <button className="bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md active:scale-95 w-10 h-10">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    {/* Menu 3 */}
                    <article className="bg-surface rounded-xl overflow-hidden shadow-soft-spice hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-surface-container-low">
                        <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="./image/seblak1.webp" alt="" />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary text-[12px] font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Lv 2
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-1">Seblak Makaroni</h3>
                            <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4 flex-grow">Makaroni klasik dengan kuah pedas khas kami, cocok untuk camilan cepat dan mengenyangkan.</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-price-display text-[20px] font-bold text-primary">Rp 10.000</span>
                                <button className="bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md active:scale-95 w-10 h-10">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    {/* Menu 4 */}
                    <article className="bg-surface rounded-xl overflow-hidden shadow-soft-spice hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-surface-container-low">
                        <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="./image/seblak1.webp" alt="" />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary text-[12px] font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Lv 2
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-1">Seblak Makaroni</h3>
                            <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4 flex-grow">Makaroni klasik dengan kuah pedas khas kami, cocok untuk camilan cepat dan mengenyangkan.</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-price-display text-[20px] font-bold text-primary">Rp 10.000</span>
                                <button className="bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md active:scale-95 w-10 h-10">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </article>
                </section>

            </main>
            <Footer />
        </div>

        
    )
    
}