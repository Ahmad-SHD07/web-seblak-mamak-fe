import {useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const kategoriMenu = ["Semua Menu", "Pilih Topping", "Gorengan", "Cobek", "Pisang Keju", "Minuman"]

const dataSeblak = [
    {id: 1, nama: "Seblak Makaroni", harga: "Rp 10.000", desc: "Makaroni klasik dengan kuah pedas khas kami.", lv: 2, img: "./image/Seblak/seblak1.webp"},
    {id: 2, nama: "Seblak Ceker", harga: "Rp 15.000", desc: "Ceker ayam empuk yang dimasak perlahan dalam saus pedas.", lv: 3, img: "./image/Seblak/seblak-ceker.webp"},
    {id: 3, nama: "Seblak Mie", harga: "Rp 13.000", desc: "Mie kenyal dicampur dengan bumbu pedas ringan dan kerupuk.", lv: 1, img: "./image/Seblak/seblak-mie.jpeg"},
    {id: 4, nama: "Seblak Kerupuk", harga: "Rp 15.000" , desc: "Pengalaman seblak asli. Kerupuk lembut disiram kuah pedas.", lv: 1, img: "./image/Seblak/seblak2.webp"}
];

const dataTopping = [
    {id: 5, nama: "Ceker", harga: "Rp 2.000", desc:"Ceker ayam empuk dengan bumbu meresap.", lv: null, img: "./image/Topping/ceker.jpg" },
    {id: 6, nama: "Telur", harga: "Rp 3.500", desc:"Telur ayam segar, bisa orak-arik atau rebus.", lv: null, img: "./image/Topping/Telur.jpg" },
    {id: 7, nama: "Sosis", harga: "Rp 1.000", desc:"Potongan sosis sapi berkualitas.", lv: null, img: "./image/Topping/Sosis.jpg" },
    {id: 8, nama: "Mie", harga: "Rp 1.000", desc:"Mie kuning kenyal pelengkap karbohidrat.", lv: null, img: "./image/Topping/Mie.jpg" }
];

const dataGorengan = [
    {id: 9, nama: "Basreng", harga: "Rp 5.000", desc: "Basreng Goreng yang nikmat untuk ngemil.", lv: null, img: "./image/Gorengan/Basreng.webp"},
    {id: 10, nama: "Cireng", harga: "Rp 5.000", desc: "Cireng Goreng yang nikmat dicampur dengan bumbu keju dan pedas.", lv: null, img: "./image/Gorengan/Cireng.webp"},
    {id: 11, nama: "Sosis", harga: "Rp 5.000", desc: "Sosis Goreng yang enak dan nikmat untuk ngemil dengan bumbu asin, keju, pedas.", lv: null, img: "./image/Gorengan/Sosis.webp"},
    {id: 12, nama: "Cipuk", harga: "Rp 5.000", desc: "cipuk Goreng yang nikmat untuk mengganjal rasa lapar.", lv: null, img: "./image/Gorengan/Cipuk.webp"}
]

const dataPisangKeju = [
    {id: 13, nama: "Pisang Keju", harga: "Rp 5.000", desc: "Pisang + Keju + Susu", lv: null, img: "./image/Pisang-Keju/Pisang-Keju.webp"},
    {id: 14, nama: "Pisang + Keju + Seres", harga: "Rp 5.000", desc: "Pisang + Keju + Seres + Susu", lv: null, img: "./image/Pisang-Keju/Pisang-seres.webp"},
    {id: 15, nama: "Pisang Keju + Seres Warna Warni", harga: "Rp 5.000", desc: "Pisang + Keju + Seres Pelangi +Susu", lv: null, img: "./image/Pisang-Keju/pisang-Seres-Warni.webp"}
];

const dataMinuman = [
    {id: 16, nama: "Pop Ice Coklat", harga: "Rp 3.000", desc: "Bisa pakai toping Susu, Keju, Oreo, Seres Coklat, Seres Warna-warni", lv: null, img: "./image/Minuman/Pop-Ice-coklat.webp"},
    {id: 17, nama: "Pop Ice Avocado", harga: "Rp 3.000", desc: "Bisa pakai toping Susu, Keju, Oreo, Seres Coklat, Seres Warna-warni", lv: null, img: "./image/Minuman/Pop-Ice-Avocado.webp"},
    {id: 18, nama: "Pop Ice Milo", harga: "Rp 3.000", desc: "Bisa pakai toping Susu, Keju, Oreo, Seres Coklat, Seres Warna-warni", lv: null, img: "./image/Minuman/Milo.webp"}
]

const dataCobek = [
    {id: 19, nama: "Cobek Basreng", harga: "Rp 5.000", desc: "Basreng Cobek yang nikmat untuk teman makan nasi.", lv: null, img: "./image/Cobek/Cobek-basreng.webp"},
    {id: 20, nama: "Cireng", harga: "Rp 5.000", desc: "Cireng Cobek yang nikmat untuk teman makan nasi.", lv: null, img: "./image/Cobek/Cobek-sosis.webp"},
];


export default function Home() {
    const [activeCategory, setActiveCategory] = useState("Semua Menu");

    let dataYangDitampilkan;
    switch (activeCategory) {
        case "Semua Menu":
            dataYangDitampilkan = dataSeblak;
            break;
        case "Pilih Topping":
            dataYangDitampilkan = dataTopping;
            break;
        case "Gorengan":
            dataYangDitampilkan = dataGorengan;
            break;
        case "Cobek":
            dataYangDitampilkan = dataCobek;
            break;
        case "Pisang Keju":
            dataYangDitampilkan = dataPisangKeju;
            break;
        case "Minuman":
            dataYangDitampilkan = dataMinuman;
            break;
        default:
            dataYangDitampilkan = [];
    }

    return (
        <div className="min-h-screen bg-background flex flex-col font-body-md">
            {/* Memanggil komponen navbar */}
            <Navbar />

            <main className="flex-grow w-full max-w-[1280] mx-auto px-container-margin-mobile md:px-container-margin-desktopp py-md md:py-lg">
                {/* Banner  */}
                <section className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-soft-spice group cursor-pointer mb-8 md:mb-12">
                        <img
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="./image/Seblak/seblak2.webp" 
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
                        {kategoriMenu.map((kategori) => (
                        <button
                            key={kategori}
                            onClick={() => setActiveCategory(kategori)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm ${
                                activeCategory === kategori
                                ? "bg-primary text-white"
                                : "bg-surface-container text-dark hover:bg-gray-200"
                            }`}
                            >
                            {kategori}
                        </button>
                        ))}
                    </div>
                </section>

                {/* daftar menu */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {dataYangDitampilkan.length > 0 ? (
                        dataYangDitampilkan.map((item) => (
                            <article key={item.id} className="bg-surface rounded-xl overflow-hidden shadow-soft-spice hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-surface-container-low">
                                <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.nama} />
                                    {/* hanya menampilkan badge api jika ada data levelnya */}
                                    {item.lv && (
                                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary text-[12px] font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Lv {item.lv}
                                    </div>
                                    )}
                                </div>
                                
                                <div className="p-4 flex flex-col flex-grow">
                                    {/* supaya pelanggan tahu ini kategori apa */}
                                    {activeCategory !== "Semua Menu" && (
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{activeCategory}</span>
                                    )}
                                    <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-1">{item.nama}</h3>
                                    <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4 flex-grow">{item.desc}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="font-price-display text-[20px] font-bold text-primary">{item.harga}</span>
                                        <button className="bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md active:scale-95 w-10 h-10">
                                            <span className="material-symbols-outlined">add</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        // Pesan kosong jika kategori yang diklik belum ada datanya
                        <div className="col-span-full text-center py-12 text-gray-500 font-semibold">
                            <span className="material-symbols-outlined text-4xl block mb-2 opacity-50">fastfood</span> 
                            Menu untuk kategori "{activeCategory}" belum ditambahkan.
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}