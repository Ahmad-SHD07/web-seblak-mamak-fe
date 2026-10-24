export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  categoryCounts = {}
}) {
  const categories = [
    { label: 'Semua Menu', value: 'Semua Menu', icon: 'restaurant_menu' },
    { label: 'Toping Seblak', value: 'Pilih Topping', icon: 'ramen_dining' },
    { label: 'Pisang Keju', value: 'Pisang Keju', icon: 'cake' },
    { label: 'Minuman', value: 'Minuman', icon: 'local_drink' },
    { label: 'Gorengan', value: 'Gorengan', icon: 'lunch_dining' },
    { label: 'Cobek', value: 'Cobek', icon: 'flatware' },
  ];

  return (
    <section className="mb-6 md:mb-8" id="menu-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-dark tracking-tight">
            Pilihan Menu Favorit
          </h2>
          <p className="text-body-sm text-gray-500 mt-0.5">
            Jelajahi kelezatan seblak gurih pedas dan aneka camilan khas kami.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          const count = categoryCounts[cat.value];

          return (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 focus:outline-none shrink-0 ${
                isActive
                  ? 'bg-primary text-white font-bold shadow-md ring-2 ring-primary/20 scale-[1.02]'
                  : 'bg-surface-container text-dark hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-primary'}`}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-surface-container-high text-gray-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
