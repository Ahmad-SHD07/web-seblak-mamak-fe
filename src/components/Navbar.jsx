export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-surface border-b border-outline-variant shadow-sm w-full">
            <div className="flex justify-between items-center px-container-margin-mobile md:px-container-margin desktop py-4 max-w-[1280px] mx-auto">

                {/* logo */}
                <div className="font-headline-md text-headline-md font-bold text-primary">
                    Seblak Mak Eunin
                </div>

                {/* Menu Navigasi */}
                <div className="hidden md:flex gap-6 lg:gap-8 items-center">
                    <a className="text-sm lg:text-base font-semibold text-dark hover:text-primary transition-colors" href="#">Seblak</a>
                    <a className="text-sm lg:text-base font-semibold text-dark hover:text-primary transition-colors" href="#">Minuman</a>
                    <a className="text-sm lg:text-base font-semibold text-dark hover:text-primary transition-colors" href="#">Gorengan</a>
                    <a className="text-sm lg:text-base font-semibold text-dark hover:text-primary transition-colors" href="#">Pisang Keju</a>
                    <a className="text-sm lg:text-base font-semibold text-dark hover:text-primary transition-colors" href="#">Cobek</a>
                </div>

                {/* ikon keranjang */}
                <div className="flex items-center gap-sm">
                    <button className="p-2 text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined">search</span>
                    </button>

                    <div className="relative inline-flex items-center justify-center">
                        <button className="p-2 text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined" data-icon="shooping_cart">shopping_cart</span>
                        </button>
                        {/* badge angka*/}
                        <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-surface">0</span>
                    </div>
                </div>

            </div>
        </nav>
    );
}