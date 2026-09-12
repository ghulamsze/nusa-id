import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaStay.js - Enterprise Hotel & Accommodation Booking Module for Nusa Super-App (2026)
 * Features: Natural city variation, batch pagination, specific image routing, clean UI.
 */

const svgIcons = {
  search: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>`,
  star: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`,
  mapPin: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
  chevronDown: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>`,
  close: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`
};

export const NusaStay = {
  cities: ['Semua', 'Makassar', 'Jakarta', 'Bali', 'Surabaya', 'Yogyakarta', 'Bandung', 'Medan'],
  selectedCity: 'Semua',
  selectedDateStr: '',
  stayNights: 1,
  guestName: 'User NUSA',
  searchQuery: '',
  soundEngine: null,
  
  // Kontrol Batching / Pagination UI
  visibleCount: 8,
  defaultBatchSize: 8,

  // Database Hotel dengan Variasi Jumlah per Kota & Gambar Spesifik Asli Sesuai Vibe Real Hotel
  hotelDatabase: [
    // --- MAKASSAR (9 HOTEL - FOTO ASLI LOKASI) ---
    {
      id: 'mks-claro',
      name: 'CLARO Hotel & Convention',
      city: 'Makassar',
      stars: 5,
      rating: 4.8,
      price: 850000,
      type: 'Hotel & Convention',
      area: 'Jl. A.P. Pettarani, Makassar',
      image: 'assets/images/hotels/claro-makassar.jpg', // Menampilkan Fasad Gedung Utama & Ballroom Pettarani
      description: 'Hotel bisnis dan konvensi bintang 5 terbesar di Makassar dengan kolam renang megah, ballroom, dan restoran internasional.'
    },
    {
      id: 'mks-myko',
      name: 'MYKO Hotel & Convention Center',
      city: 'Makassar',
      stars: 4,
      rating: 4.7,
      price: 720000,
      type: 'City Hotel',
      area: 'Mal Panakkukang, Makassar',
      image: 'assets/images/hotels/myko-makassar.jpg', // Menampilkan Menara MYKO terhubung Mall Panakkukang
      description: 'Terhubung langsung dengan Mall Panakkukang dengan sajian ragam kuliner khas Asia dan internasional.'
    },
    {
      id: 'mks-therinra',
      name: 'The Rinra Makassar',
      city: 'Makassar',
      stars: 5,
      rating: 4.9,
      price: 1250000,
      type: 'Luxury Hotel',
      area: 'Jl. Metro Tanjung Bunga, Makassar',
      image: 'assets/images/hotels/the-rinra-makassar.jpg', // Menampilkan Fasad Modern & Infinity Pool Pantai Losari
      description: 'Hotel resor bintang 5 modern dengan pemandangan sunset Pantai Losari dan terhubung ke Phinisi Point Mall.'
    },
    {
      id: 'mks-amaris-pkk',
      name: 'Amaris Hotel Panakkukang',
      city: 'Makassar',
      stars: 2,
      rating: 4.3,
      price: 380000,
      type: 'Smart Hotel',
      area: 'Panakkukang, Makassar',
      image: 'assets/images/hotels/amaris-panakkukang.jpg', // Menampilkan Bangunan Minimalis Khas Warna Panel Amaris
      description: 'Akomodasi praktis dan ekonomis bagi bisnis traveler tepat di pusat kawasan komersial Panakkukang.'
    },
    {
      id: 'mks-gammara',
      name: 'Gammara Hotel Makassar',
      city: 'Makassar',
      stars: 4,
      rating: 4.6,
      price: 680000,
      type: 'Hotel & Cottage',
      area: 'Tanjung Bunga, Makassar',
      image: 'assets/images/hotels/gammara-makassar.jpg', // Menampilkan Area Cottage & Outdoor Pool Tanjung Bunga
      description: 'Menawarkan kamar elegan serta private cottage bernuansa resort di kawasan berkembang Tanjung Bunga.'
    },
    {
      id: 'mks-mercure-pettarani',
      name: 'Mercure Makassar Nexa Pettarani',
      city: 'Makassar',
      stars: 4,
      rating: 4.7,
      price: 630000,
      type: 'Business Hotel',
      area: 'Jl. A.P. Pettarani, Makassar',
      image: 'assets/images/hotels/mercure-pettarani.jpg', // Menampilkan Fasad Modern Arsitektur Accor Pettarani
      description: 'Hotel jaringan Accor dengan desain kontemporer dan ruang pertemuan modern di jalan arteri kota.'
    },
    {
      id: 'mks-swissbel',
      name: 'Swiss-Belhotel Makassar',
      city: 'Makassar',
      stars: 4,
      rating: 4.6,
      price: 750000,
      type: 'Oceanfront Hotel',
      area: 'Ujung Pandang, Losari',
      image: 'assets/images/hotels/swissbel-losari.jpg', // Menampilkan Gedung Menghadap Pesisir Pantai Losari
      description: 'Menyajikan panorama spektakuler Selat Makassar dan akses jalan kaki menuju Anjungan Pantai Losari.'
    },
    {
      id: 'mks-aston',
      name: 'Aston Makassar Hotel & Convention',
      city: 'Makassar',
      stars: 4,
      rating: 4.6,
      price: 690000,
      type: 'Convention Hotel',
      area: 'Jl. Sultan Hasanuddin, Makassar',
      image: 'assets/images/hotels/aston-makassar.jpg', // Menampilkan Menara Tinggi Aston Hasanuddin
      description: 'Terkenal dengan D’Lounge di rooftop yang menawarkan pemandangan panorama kota Makassar 360 derajat.'
    },
    {
      id: 'mks-aryaduta',
      name: 'Aryaduta Makassar',
      city: 'Makassar',
      stars: 5,
      rating: 4.7,
      price: 890000,
      type: 'Heritage Resort',
      area: 'Anjungan Pantai Losari, Makassar',
      image: 'assets/images/hotels/aryaduta-makassar.jpg', // Menampilkan Bangunan Ikonik Depan Anjungan Losari
      description: 'Hotel ikonik tepat menghadap Anjungan Pantai Losari untuk momen matahari terbenam terbaik.'
    },

    // --- JAKARTA (12 HOTEL) ---
    {
      id: 'jkt-kempinski',
      name: 'Hotel Indonesia Kempinski',
      city: 'Jakarta',
      stars: 5,
      rating: 4.9,
      price: 2600000,
      type: 'Luxury Hotel',
      area: 'Bundaran HI, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Kemewahan bersejarah di jantung ibu kota dengan pemandangan ikonik Monumen Bundaran HI.'
    },
    {
      id: 'jkt-ritz-pp',
      name: 'The Ritz-Carlton Pacific Place',
      city: 'Jakarta',
      stars: 5,
      rating: 4.9,
      price: 3200000,
      type: 'Luxury Suites',
      area: 'SCBD, Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      description: 'Terletak di kawasan bisnis SCBD dengan suite megah, club lounge terluas, dan pelayanan profesional.'
    },
    {
      id: 'jkt-stregis',
      name: 'The St. Regis Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.9,
      price: 3500000,
      type: 'Ultra Luxury',
      area: 'Kuningan, Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
      description: 'Kemewahan kelas dunia dengan Butler Service khas St. Regis 24 jam serta arsitektur interior artistik.'
    },
    {
      id: 'jkt-fairmont',
      name: 'Fairmont Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.8,
      price: 2400000,
      type: 'Business Luxury',
      area: 'Senayan, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      description: 'Terhubung langsung melalui terowongan bawah tanah menuju Plaza Senayan dan Sentral Senayan.'
    },
    {
      id: 'jkt-grandhyatt',
      name: 'Grand Hyatt Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.8,
      price: 2800000,
      type: 'Luxury Landmark',
      area: 'Plaza Indonesia, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel bintang 5 klasik modern yang terintegrasi secara eksklusif dengan pusat belanja Plaza Indonesia.'
    },
    {
      id: 'jkt-raffles',
      name: 'Raffles Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.9,
      price: 2950000,
      type: 'Art Luxury Hotel',
      area: 'Ciputra World, Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      description: 'Oase seni dan kemewahan yang terinspirasi dari lukisan-lukisan maestro dunia Hendra Gunawan.'
    },
    {
      id: 'jkt-shangrila',
      name: 'Shangri-La Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.8,
      price: 2100000,
      type: 'City Resort',
      area: 'Sudirman, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      description: 'Dilengkapi taman tropis seluas beberapa hektar dan kolam renang outdoor bernuansa resort di Sudirman.'
    },
    {
      id: 'jkt-pullman',
      name: 'Pullman Jakarta Indonesia',
      city: 'Jakarta',
      stars: 5,
      rating: 4.7,
      price: 1850000,
      type: 'Lifestyle Hotel',
      area: 'Thamrin, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel gaya hidup urban modern dengan pilihan restoran ternama di kawasan Bundaran HI.'
    },
    {
      id: 'jkt-borobudur',
      name: 'Hotel Borobudur Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.6,
      price: 1300000,
      type: 'Heritage Resort',
      area: 'Lap. Banteng, Jakarta Pusat',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      description: 'Terkenal dengan Sop Buntut legendaris serta fasilitas taman lanskap seluas 23 hektar di pusat kota.'
    },
    {
      id: 'jkt-alila-scbd',
      name: 'Alila SCBD Jakarta',
      city: 'Jakarta',
      stars: 5,
      rating: 4.8,
      price: 2700000,
      type: 'Boutique Luxury',
      area: 'SCBD, Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Destinasi menginap berarsitektur fasad unik dengan restoran dan lounge hits papan atas.'
    },
    {
      id: 'jkt-manhattan',
      name: 'Manhattan Hotel Jakarta',
      city: 'Jakarta',
      stars: 4,
      rating: 4.5,
      price: 850000,
      type: 'City Hotel',
      area: 'Casablanca, Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Akomodasi bergaya New York di CBD Kuningan dekat pusat belanja Kota Kasablanka.'
    },
    {
      id: 'jkt-fm7',
      name: 'FM7 Resort Hotel Airport',
      city: 'Jakarta',
      stars: 4,
      rating: 4.5,
      price: 620000,
      type: 'Airport Resort',
      area: 'Cengkareng (Dekat CGK)',
      image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
      description: 'Resort transit lengkap dengan spa dan kolam renang indoor dekat Bandara Internasional Soekarno-Hatta.'
    },

    // --- BALI (13 HOTEL) ---
    {
      id: 'bali-mulia',
      name: 'The Mulia Resort & Villas',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 3800000,
      type: 'Beachfront Resort',
      area: 'Nusa Dua, Bali',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      description: 'Resort mewah tepi pantai Nusa Dua dengan kolam renang infinity berjejer patung patung ikonik.'
    },
    {
      id: 'bali-potato-head',
      name: 'Potato Head Suites & Studios',
      city: 'Bali',
      stars: 5,
      rating: 4.8,
      price: 2750000,
      type: 'Lifestyle Resort',
      area: 'Seminyak, Bali',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      description: 'Destinasi menginap ramah lingkungan di Seminyak yang terhubung langsung dengan Beach Club terkenal.'
    },
    {
      id: 'bali-ayana',
      name: 'AYANA Resort Bali',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 3400000,
      type: 'Cliffside Resort',
      area: 'Jimbaran, Bali',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      description: 'Terkenal dengan Rock Bar di atas tebing karang laut Jimbaran dan 14 kolam renang spektakuler.'
    },
    {
      id: 'bali-w-seminyak',
      name: 'W Bali - Seminyak',
      city: 'Bali',
      stars: 5,
      rating: 4.8,
      price: 3600000,
      type: 'Luxury Resort',
      area: 'Seminyak, Bali',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      description: 'Resort pantai trendi dengan desain glamor, penampilan DJ live di Woobar, dan Away Spa 24 jam.'
    },
    {
      id: 'bali-hard-rock',
      name: 'Hard Rock Hotel Bali',
      city: 'Bali',
      stars: 4,
      rating: 4.6,
      price: 1350000,
      type: 'Family Resort',
      area: 'Pantai Kuta, Bali',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Resort bertema musik rock dengan fasilitas kolam renang area pasir pantai terbesar di Pantai Kuta.'
    },
    {
      id: 'bali-westin-nusadua',
      name: 'The Westin Resort Nusa Dua',
      city: 'Bali',
      stars: 5,
      rating: 4.8,
      price: 2100000,
      type: 'Wellness Resort',
      area: 'Nusa Dua, Bali',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      description: 'Menawarkan konsep Heavenly Spa, pantai pasir putih yang tenang, serta fasilitas lengkap untuk keluarga.'
    },
    {
      id: 'bali-hilton',
      name: 'Hilton Bali Resort',
      city: 'Bali',
      stars: 5,
      rating: 4.7,
      price: 1950000,
      type: 'Ocean View Resort',
      area: 'Sawangan, Nusa Dua',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      description: 'Berada di atas tebing karang setinggi 40 meter dengan pemandangan terbuka Samudra Hindia.'
    },
    {
      id: 'bali-como-ubud',
      name: 'COMO Uma Ubud',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 3100000,
      type: 'Wellness Sanctuary',
      area: 'Ubud, Bali',
      image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=800&q=80',
      description: 'Resort ketenangan jiwa di tengah bukit tropis dan lembah hijau Sungai Tjampuhan Ubud.'
    },
    {
      id: 'bali-padma-legian',
      name: 'Padma Resort Legian',
      city: 'Bali',
      stars: 5,
      rating: 4.8,
      price: 2250000,
      type: 'Tropical Resort',
      area: 'Legian, Bali',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Resort tepi pantai Legian dengan kebun tropis rindang, kolam renang lagoon, dan sunset bar.'
    },
    {
      id: 'bali-alila-uluwatu',
      name: 'Alila Villas Uluwatu',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 7500000,
      type: 'Cliff Luxury Villa',
      area: 'Uluwatu, Bali',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      description: 'Villa tebing spektakuler dengan arsitektur ramah lingkungan dan paviliun gantung di atas lautan.'
    },
    {
      id: 'bali-viceroy',
      name: 'Viceroy Bali',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 4800000,
      type: 'Private Pool Villa',
      area: 'Lembah Petanu, Ubud',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Villa pribadi mewah dengan kolam renang privat menghadap jurang bukit hijau nan magis di Ubud.'
    },
    {
      id: 'bali-maya-sanur',
      name: 'Maya Sanur Resort & Spa',
      city: 'Bali',
      stars: 5,
      rating: 4.7,
      price: 1850000,
      type: 'Beach Resort',
      area: 'Sanur, Bali',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      description: 'Resort bergaya arsitektur hijau modern di pesisir pantai Sanur yang tenang dan nyaman.'
    },
    {
      id: 'bali-sixsenses',
      name: 'Six Senses Uluwatu',
      city: 'Bali',
      stars: 5,
      rating: 4.9,
      price: 6200000,
      type: 'Ultra Cliff Resort',
      area: 'Uluwatu, Bali',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      description: 'Menyajikan kemewahan berkelanjutan di tebing paling selatan Bali dengan pandangan laut tanpa batas.'
    },

    // --- SURABAYA (8 HOTEL) ---
    {
      id: 'sub-jwmarriott',
      name: 'JW Marriott Hotel Surabaya',
      city: 'Surabaya',
      stars: 5,
      rating: 4.8,
      price: 1450000,
      type: 'Luxury Hotel',
      area: 'Tegalsari, Surabaya',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Kemewahan klasik bintang 5 di pusat bisnis kota Surabaya dengan pilihan restoran bintang lima.'
    },
    {
      id: 'sub-vasa',
      name: 'Vasa Hotel Surabaya',
      city: 'Surabaya',
      stars: 5,
      rating: 4.7,
      price: 1150000,
      type: 'Modern Luxury',
      area: 'HR Muhammad, Surabaya Barat',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel modern dengan fasilitas helipad, kolam renang outdoor, dan presidential suite mewah.'
    },
    {
      id: 'sub-majapahit',
      name: 'Hotel Majapahit Surabaya MGallery',
      city: 'Surabaya',
      stars: 5,
      rating: 4.9,
      price: 1350000,
      type: 'Heritage Landmark',
      area: 'Jl. Tunjungan, Surabaya',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel cagar budaya bersejarah bergaya kolonial klasik di kawasan legendaris Jalan Tunjungan.'
    },
    {
      id: 'sub-westin',
      name: 'The Westin Surabaya',
      city: 'Surabaya',
      stars: 5,
      rating: 4.9,
      price: 1750000,
      type: 'Sky Luxury',
      area: 'Pakuwon Mall, Surabaya Barat',
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      description: 'Terhubung langsung dengan Pakuwon Mall dan memiliki Sky Lobby tertinggi di Kota Surabaya.'
    },
    {
      id: 'sub-shangrila',
      name: 'Shangri-La Surabaya',
      city: 'Surabaya',
      stars: 5,
      rating: 4.8,
      price: 1250000,
      type: 'Resort Hotel',
      area: 'Mayjen Sungkono, Surabaya',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      description: 'Fasilitas kolam renang tropis bergaya lagoon serta pilihan tempat bersantap kuliner internasional.'
    },
    {
      id: 'sub-sheraton',
      name: 'Sheraton Surabaya Hotel & Towers',
      city: 'Surabaya',
      stars: 5,
      rating: 4.7,
      price: 1300000,
      type: 'Business Hotel',
      area: 'Embong Malang, Surabaya',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Akses mudah terhubung langsung ke Mal Tunjungan Plaza di pusat pusat perkantoran.'
    },
    {
      id: 'sub-wyndham',
      name: 'Wyndham Surabaya',
      city: 'Surabaya',
      stars: 5,
      rating: 4.6,
      price: 920000,
      type: 'City Hotel',
      area: 'Basuki Rahmat, Surabaya',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      description: 'Akomodasi bisnis nyaman tepat di jalur utama kawasan finansial dan perbankan.'
    },
    {
      id: 'sub-mercure',
      name: 'Mercure Surabaya Grand Mirama',
      city: 'Surabaya',
      stars: 4,
      rating: 4.5,
      price: 650000,
      type: 'Family Hotel',
      area: 'Raya Darmo, Surabaya',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: 'Pilihan favorit perjalanan dinas maupun keluarga di kawasan rindang Jalan Raya Darmo.'
    },

    // --- YOGYAKARTA (9 HOTEL) ---
    {
      id: 'jog-tentrem',
      name: 'Hotel Tentrem Yogyakarta',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.9,
      price: 1550000,
      type: 'Cultural Luxury',
      area: 'Cokrodiningratan, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Kombinasi keramahtamahan budaya Jawa yang hangat dan fasilitas kemewahan bintang lima.'
    },
    {
      id: 'jog-artotel',
      name: 'Artotel Suites Bianti',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.7,
      price: 980000,
      type: 'Art Hotel',
      area: 'Jl. Urip Sumoharjo, Jogja',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      description: 'Desain seni kontemporer dengan galeri seni bergerak dan pilihan resto kasual estetik.'
    },
    {
      id: 'jog-phoenix',
      name: 'The Phoenix Hotel Yogyakarta MGallery',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.8,
      price: 1100000,
      type: 'Heritage Hotel',
      area: 'Tugu, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel bersejarah berarsitektur kolonial klasik abad ke-20 dekat monumen Tugu Jogja.'
    },
    {
      id: 'jog-hyatt',
      name: 'Hyatt Regency Yogyakarta',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.8,
      price: 1350000,
      type: 'Golf Resort',
      area: 'Sleman, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      description: 'Resort seluas 22 hektar dengan lapangan golf 9-hole, kolam renang gaya candi, dan lanskap asri.'
    },
    {
      id: 'jog-melia',
      name: 'Melia Purosani Yogyakarta',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.7,
      price: 1050000,
      type: 'City Resort',
      area: 'Malioboro, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      description: 'Berjarak beberapa langkah dari Jalan Malioboro dan kawasan cagar budaya Keraton.'
    },
    {
      id: 'jog-grand-ambarrukmo',
      name: 'Grand Ambarrukmo Yogyakarta',
      city: 'Yogyakarta',
      stars: 4,
      rating: 4.6,
      price: 750000,
      type: 'City Hotel',
      area: 'Jl. Laksda Adisucipto, Jogja',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      description: 'Terhubung dengan Plaza Ambarrukmo di jalan utama penghubung pusat kota dan bandara.'
    },
    {
      id: 'jog-eastparc',
      name: 'Eastparc Hotel Yogyakarta',
      city: 'Yogyakarta',
      stars: 5,
      rating: 4.9,
      price: 1200000,
      type: 'Family Resort',
      area: 'Seturan, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel ramah keluarga dengan kebun binatang mini, wahana ATV, mini zoo, dan aqua playground.'
    },
    {
      id: 'jog-swissbelboutique',
      name: 'Swiss-Belboutique Yogyakarta',
      city: 'Yogyakarta',
      stars: 4,
      rating: 4.6,
      price: 820000,
      type: 'Boutique Hotel',
      area: 'Jl. Sudirman, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      description: 'Desain elegan kontemporer dengan kolam renang outdoor di rooftop menghadap Gunung Merapi.'
    },
    {
      id: 'jog-novotel-suites',
      name: 'Novotel Suites Yogyakarta Malioboro',
      city: 'Yogyakarta',
      stars: 4,
      rating: 4.7,
      price: 890000,
      type: 'Suites Hotel',
      area: 'Malioboro, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
      description: 'Menyediakan tipe kamar suite modern yang terhubung langsung dengan mal Malioboro.'
    },

    // --- BANDUNG (11 HOTEL) ---
    {
      id: 'bdg-padma',
      name: 'Padma Hotel Bandung',
      city: 'Bandung',
      stars: 5,
      rating: 4.9,
      price: 1850000,
      type: 'Mountain Resort',
      area: 'Ciumbuleuit, Bandung',
      image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=800&q=80',
      description: 'Terletak di lereng lembah hijau Ciumbuleuit dengan udara pegunungan sejuk dan pemandangan hutan.'
    },
    {
      id: 'bdg-trans-luxury',
      name: 'The Trans Luxury Hotel Bandung',
      city: 'Bandung',
      stars: 5,
      rating: 4.9,
      price: 1950000,
      type: 'Luxury Hotel',
      area: 'Gatot Subroto, Bandung',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Terhubung langsung dengan Trans Studio Mall dan kawasan hiburan taman bermain indoor.'
    },
    {
      id: 'bdg-intercontinental',
      name: 'InterContinental Bandung Dago Pakar',
      city: 'Bandung',
      stars: 5,
      rating: 4.8,
      price: 1650000,
      type: 'Resort Hotel',
      area: 'Dago Pakar, Bandung',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Dikelilingi lapangan golf Dago Pakar dengan panorama spektakuler kota Bandung dari ketinggian.'
    },
    {
      id: 'bdg-hilton',
      name: 'Hilton Bandung',
      city: 'Bandung',
      stars: 5,
      rating: 4.7,
      price: 1350000,
      type: 'City Business',
      area: 'Pasirkaliki, Bandung',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Berjarak hanya 5 menit dari Stasiun Kereta Api Bandung dengan konsep arsitektur kontemporer.'
    },
    {
      id: 'bdg-papandayan',
      name: 'The Papandayan Hotel',
      city: 'Bandung',
      stars: 5,
      rating: 4.6,
      price: 950000,
      type: 'Heritage Resort',
      area: 'Gatot Subroto, Bandung',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      description: 'Fasilitas tropical garden, kolam renang outdoor hangat, dan pelayanan khas Sunda yang ramah.'
    },
    {
      id: 'bdg-grandmercure',
      name: 'Grand Mercure Bandung Setiabudi',
      city: 'Bandung',
      stars: 5,
      rating: 4.7,
      price: 1100000,
      type: 'Resort Hotel',
      area: 'Setiabudi, Bandung',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      description: 'Memiliki kolam renang air hangat outdoor bersistem hangat otomatis di jalur wisata Lembang.'
    },
    {
      id: 'bdg-crowne-plaza',
      name: 'Crowne Plaza Bandung',
      city: 'Bandung',
      stars: 5,
      rating: 4.7,
      price: 1050000,
      type: 'Business Hotel',
      area: 'Lembong, Bandung Pusat',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      description: 'Terletak di jantung bisnis kota Bandung dekat jalan bersejarah Asia Afrika dan Braga.'
    },
    {
      id: 'bdg-debraga',
      name: 'de Braga by ARTOTEL',
      city: 'Bandung',
      stars: 4,
      rating: 4.5,
      price: 680000,
      type: 'Art Hotel',
      area: 'Jalan Braga, Bandung',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: 'Terletak di kawasan pedestrian bersejarah Jalan Braga dengan sentuhan karya seni kekinian.'
    },
    {
      id: 'bdg-pullman',
      name: 'Pullman Bandung Grand Central',
      city: 'Bandung',
      stars: 5,
      rating: 4.8,
      price: 1550000,
      type: 'Iconic Hotel',
      area: 'Gedung Sate, Bandung',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      description: 'Menghadap langsung ke landmark ikonik Gedung Sate dengan arsitektur Art Deco yang megah.'
    },
    {
      id: 'bdg-swissbel-dago',
      name: 'Swiss-Belresort Dago Heritage',
      city: 'Bandung',
      stars: 4,
      rating: 4.7,
      price: 880000,
      type: 'Golf Resort',
      area: 'Dago Atas, Bandung',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      description: 'Resort padang golf di Dago Atas dengan kolam renang infinity air hangat berlatar perbukitan.'
    },
    {
      id: 'bdg-moxy',
      name: 'Moxy Bandung',
      city: 'Bandung',
      stars: 3,
      rating: 4.5,
      price: 580000,
      type: 'Boutique Lifestyle',
      area: 'Dago, Bandung',
      image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel gaya hidup anak muda dengan sky bar populer dan konsep kamar industri kreatif.'
    },

    // --- MEDAN (8 HOTEL) ---
    {
      id: 'mdn-jwmarriott',
      name: 'JW Marriott Hotel Medan',
      city: 'Medan',
      stars: 5,
      rating: 4.8,
      price: 1280000,
      type: 'Luxury Hotel',
      area: 'Putri Hijau, Medan',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Hotel bintang 5 internasional mewah pertama di Medan dengan pemandangan cakrawala kota.'
    },
    {
      id: 'mdn-grandcityhall',
      name: 'Grand City Hall Medan',
      city: 'Medan',
      stars: 5,
      rating: 4.7,
      price: 980000,
      type: 'Heritage Residences',
      area: 'Balai Kota, Medan',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      description: 'Berada tepat di pusat kota bersejarah Medan persis di seberang Merdeka Walk.'
    },
    {
      id: 'mdn-cambridge',
      name: 'Cambridge Hotel Medan',
      city: 'Medan',
      stars: 5,
      rating: 4.7,
      price: 920000,
      type: 'City Hotel',
      area: 'S. Parman, Medan',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      description: 'Terhubung dengan mall Cambridge City Square dan terkenal dengan kolam renang lantai kaca transparan.'
    },
    {
      id: 'mdn-santika-dyandra',
      name: 'Santika Premiere Dyandra Hotel',
      city: 'Medan',
      stars: 4,
      rating: 4.6,
      price: 750000,
      type: 'Convention Hotel',
      area: 'Kapten Maulana Lubis, Medan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Pusat konvensi dan pameran terbesar di Medan dengan pilihan menu masakan lokal Nusantara.'
    },
    {
      id: 'mdn-aryaduta',
      name: 'Aryaduta Medan',
      city: 'Medan',
      stars: 5,
      rating: 4.6,
      price: 850000,
      type: 'Business Hotel',
      area: 'Grand Palladium, Medan',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      description: 'Dilengkapi fasilitas kolam renang seluas 35 meter di lantai sembilan menghadap panorama kota.'
    },
    {
      id: 'mdn-radisson',
      name: 'Radisson Serviced Apartments Medan',
      city: 'Medan',
      stars: 4,
      rating: 4.5,
      price: 780000,
      type: 'Apartment Hotel',
      area: 'Adam Malik, Medan',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      description: 'Kamar suite berukuran luas yang dilengkapi fasilitas dapur lengkap untuk masa tinggal panjang.'
    },
    {
      id: 'mdn-mercure',
      name: 'Mercure Medan Barat',
      city: 'Medan',
      stars: 4,
      rating: 4.5,
      price: 620000,
      type: 'Modern Hotel',
      area: 'Sutomo, Medan',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      description: 'Akomodasi nyaman modern dekat stasiun kereta api bandara Railink Medan.'
    },
    {
      id: 'mdn-grandmerdeka',
      name: 'Grand Mercure Medan Angkasa',
      city: 'Medan',
      stars: 5,
      rating: 4.6,
      price: 810000,
      type: 'Business Hotel',
      area: 'Sutomo, Medan Pusat',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Fasilitas bisnis dan spa berkelas di pusat segitiga emas komersial kota Medan.'
    }
  ],

  init(targetContainerId, soundEngine = null) {
    const container = typeof targetContainerId === 'string' 
      ? document.getElementById(targetContainerId) 
      : targetContainerId;
    if (!container) return;

    this.soundEngine = soundEngine || window.NusaSoundEngine;

    container.innerHTML = `
      <div id="nusastay-engine-panel" class="space-y-4">
        <div class="tactile-card p-4 space-y-4">
          
          <!-- Header Title -->
          <div class="flex items-center justify-between">
            <h1 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">Layanan Hotel & Penginapan</h1>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">NUSA Stay 2026</span>
          </div>

          <!-- Pemilihan Kota Destinasi -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-gray-400 block uppercase">Pilih Kota Destinasi</label>
            <div class="relative flex items-center">
              <button id="stay-city-scroll-left" class="absolute left-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -ml-2 hover:scale-110 active:scale-95 transition-transform">‹</button>
              
              <div id="stay-city-carousel" class="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-3 scroll-smooth w-full"></div>
              
              <button id="stay-city-scroll-right" class="absolute right-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -mr-2 hover:scale-110 active:scale-95 transition-transform">›</button>
            </div>
          </div>

          <!-- Input Pencarian Nama Hotel / Area -->
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-400 block uppercase">Cari Nama Hotel / Lokasi</label>
            <div class="relative flex items-center bg-gray-50 dark:bg-[#2A141A] rounded-xl border border-[var(--border-color)] p-2.5">
              <div class="text-gray-400 mr-2 flex-shrink-0">
                ${svgIcons.search(16)}
              </div>
              <input 
                type="text" 
                id="stay-search-input" 
                placeholder="Cari Claro, Kempinski, Mulia, Tentrem..." 
                value="${this.searchQuery}"
                class="w-full bg-transparent font-bold text-xs text-[var(--text-main)] outline-none"
              />
            </div>
          </div>

          <!-- Input Nama Tamu & Durasi Lama Menginap -->
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Nama Pemesan / Tamu</label>
              <input 
                type="text" 
                id="stay-guest-input" 
                value="${this.guestName}" 
                class="bg-transparent font-extrabold text-xs text-[var(--text-main)] outline-none w-full focus:text-[#EB4E70]" 
              />
            </div>

            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Lama Menginap</label>
              <select id="stay-nights-select" class="w-full bg-transparent font-extrabold text-xs text-[#EB4E70] outline-none cursor-pointer">
                <option value="1">1 Malam</option>
                <option value="2">2 Malam</option>
                <option value="3">3 Malam</option>
                <option value="5">5 Malam</option>
                <option value="7">7 Malam</option>
              </select>
            </div>
          </div>

          <!-- Tanggal Check-In Carousel -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Tanggal Check-In</label>
            </div>

            <div class="relative flex items-center">
              <button id="stay-date-scroll-left" class="absolute left-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -ml-2 hover:scale-110 active:scale-95 transition-transform">‹</button>
              
              <div id="stay-calendar-carousel" class="date-carousel-container flex gap-2 overflow-x-auto no-scrollbar pb-1 px-3 scroll-smooth w-full"></div>
              
              <button id="stay-date-scroll-right" class="absolute right-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -mr-2 hover:scale-110 active:scale-95 transition-transform">›</button>
            </div>
          </div>

        </div>

        <!-- Section Rekomendasi Hotel & Penginapan -->
        <div class="flex items-center justify-between px-1">
          <h2 class="text-xs font-bold uppercase text-gray-400 tracking-wide">Rekomendasi Penginapan</h2>
          <span id="stay-count-badge" class="text-xs text-gray-400 font-bold">Memuat...</span>
        </div>

        <section id="stay-results-container" class="space-y-3"></section>
      </div>

      <!-- POP-UP MODAL FIX RESPONSIF -->
      <div id="stay-modal-overlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center hidden p-3 sm:p-4">
        <div id="stay-modal-card" class="bg-[var(--bg-card)] w-full max-w-md rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] my-auto">
          <!-- Inject Content via JavaScript -->
        </div>
      </div>
    `;

    this.initCityCarousel();
    this.initCalendarWindow();
    this.bindEvents();
    this.renderHotels();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  initCityCarousel() {
    const carousel = document.getElementById('stay-city-carousel');
    if (!carousel) return;
    carousel.innerHTML = '';

    this.cities.forEach((city) => {
      const isSelected = city === this.selectedCity;
      const btn = document.createElement('button');
      btn.className = `stay-city-pill flex-shrink-0 py-1.5 px-3.5 rounded-xl border text-xs font-extrabold transition-all ${
        isSelected
          ? 'border-[#EB4E70] bg-[#EB4E70] text-white shadow-sm'
          : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]'
      }`;
      btn.innerText = city;

      btn.onclick = (e) => {
        e.stopPropagation();
        this.playAudio('pop');
        this.selectedCity = city;
        this.visibleCount = this.defaultBatchSize; // Reset limit batching ketika ganti kota
        
        document.querySelectorAll('.stay-city-pill').forEach(p => {
          p.className = 'stay-city-pill flex-shrink-0 py-1.5 px-3.5 rounded-xl border border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] font-extrabold text-xs transition-all hover:border-[#EB4E70]';
        });
        btn.className = 'stay-city-pill flex-shrink-0 py-1.5 px-3.5 rounded-xl border border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold text-xs transition-all shadow-sm';
        this.renderHotels();
      };

      carousel.appendChild(btn);
    });
  },

  initCalendarWindow() {
    const carousel = document.getElementById('stay-calendar-carousel');
    if (!carousel) return;
    carousel.innerHTML = '';
    const today = new Date();

    for (let i = 0; i < 15; i++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);

      const isoDate = dateObj.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Hari Ini' : dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
      const dateNum = dateObj.getDate();
      const monthName = dateObj.toLocaleDateString('id-ID', { month: 'short' });

      if (i === 0) this.selectedDateStr = isoDate;

      const btn = document.createElement('button');
      const isSelected = i === 0;
      btn.className = `stay-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
        isSelected
          ? 'border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold shadow-md'
          : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold hover:border-[#EB4E70]'
      }`;
      btn.innerHTML = `
        <span class="text-[10px] uppercase opacity-80">${dayName}</span>
        <span class="text-sm font-black">${dateNum} ${monthName}</span>
      `;

      btn.onclick = (e) => {
        e.stopPropagation();
        this.playAudio('pop');
        document.querySelectorAll('.stay-date-pill').forEach(p => {
          p.className = 'stay-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold text-center flex flex-col items-center justify-center transition-all hover:border-[#EB4E70]';
        });
        btn.className = 'stay-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold text-center flex flex-col items-center justify-center transition-all shadow-md';
        this.selectedDateStr = isoDate;
      };

      carousel.appendChild(btn);
    }
  },

  bindEvents() {
    const cityCarousel = document.getElementById('stay-city-carousel');
    document.getElementById('stay-city-scroll-left').onclick = (e) => {
      e.stopPropagation();
      this.playAudio('click');
      cityCarousel.scrollBy({ left: -140, behavior: 'smooth' });
    };
    document.getElementById('stay-city-scroll-right').onclick = (e) => {
      e.stopPropagation();
      this.playAudio('click');
      cityCarousel.scrollBy({ left: 140, behavior: 'smooth' });
    };

    const dateCarousel = document.getElementById('stay-calendar-carousel');
    document.getElementById('stay-date-scroll-left').onclick = (e) => {
      e.stopPropagation();
      this.playAudio('click');
      dateCarousel.scrollBy({ left: -140, behavior: 'smooth' });
    };
    document.getElementById('stay-date-scroll-right').onclick = (e) => {
      e.stopPropagation();
      this.playAudio('click');
      dateCarousel.scrollBy({ left: 140, behavior: 'smooth' });
    };

    document.getElementById('stay-search-input').oninput = (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.visibleCount = this.defaultBatchSize; // Reset limit saat pencarian dilakukan
      this.renderHotels();
    };

    document.getElementById('stay-guest-input').oninput = (e) => {
      this.guestName = e.target.value.trim() || 'User NUSA';
    };

    document.getElementById('stay-nights-select').onchange = (e) => {
      this.playAudio('click');
      this.stayNights = parseInt(e.target.value, 10) || 1;
    };
  },

  getFilteredHotels() {
    return this.hotelDatabase.filter(h => {
      const matchCity = this.selectedCity === 'Semua' || h.city.toLowerCase() === this.selectedCity.toLowerCase();
      const matchSearch = !this.searchQuery || 
        h.name.toLowerCase().includes(this.searchQuery) || 
        h.area.toLowerCase().includes(this.searchQuery) || 
        h.type.toLowerCase().includes(this.searchQuery);
      return matchCity && matchSearch;
    });
  },

  renderHotels() {
    const container = document.getElementById('stay-results-container');
    const badge = document.getElementById('stay-count-badge');
    if (!container) return;

    container.innerHTML = '';
    const allHotels = this.getFilteredHotels();

    if (badge) badge.innerText = `${allHotels.length} Penginapan Tersedia`;

    if (allHotels.length === 0) {
      container.innerHTML = `
        <div class="tactile-card p-6 text-center space-y-2 border-2 border-dashed border-[#EB4E70]/40 my-4">
          <h3 class="font-extrabold text-sm text-[var(--text-main)]">Tidak Ada Hotel Ditemukan</h3>
          <p class="text-xs text-gray-400">Coba kata kunci lain atau pilih kota 'Semua'.</p>
        </div>
      `;
      return;
    }

    // Ambil subset sesuai batch limitasi
    const visibleHotels = allHotels.slice(0, this.visibleCount);

    visibleHotels.forEach((hotel) => {
      const starIcons = Array(hotel.stars).fill(svgIcons.star(12)).join('');

      const card = document.createElement('div');
      card.className = 'tactile-card overflow-hidden hover:border-[#EB4E70] transition-all cursor-pointer group';
      card.innerHTML = `
        <div class="relative w-full h-36 overflow-hidden">
          <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <span class="absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase">
            ${hotel.type}
          </span>

          <span class="absolute top-2.5 right-2.5 text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-500 text-white shadow-md">
            ★ ${hotel.rating}
          </span>

          <div class="absolute bottom-2.5 left-3 right-3 text-white">
            <h3 class="font-black text-sm leading-tight">${hotel.name}</h3>
            <div class="flex items-center gap-1 text-[10px] opacity-90 font-semibold">
              ${svgIcons.mapPin(11)}
              <span class="truncate">${hotel.area}</span>
            </div>
          </div>
        </div>

        <div class="p-3 space-y-2">
          <div class="flex items-center justify-between text-[10px] text-gray-400 font-bold">
            <div class="flex items-center gap-1 text-amber-500">${starIcons}</div>
            <span>Sarapan Gratis • Wi-Fi Cepat</span>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
            <div>
              <span class="text-[9px] text-gray-400 block font-bold">Mulai dari</span>
              <span class="text-base font-black text-[#EB4E70]">Rp ${hotel.price.toLocaleString('id-ID')} <span class="text-[10px] text-gray-400 font-normal">/malam</span></span>
            </div>
            <button class="view-detail-btn px-4 py-2 bg-[#EB4E70] text-white text-xs font-extrabold rounded-xl shadow-md btn-tactile active:scale-95">
              Lihat Detail
            </button>
          </div>
        </div>
      `;

      card.onclick = () => {
        this.playAudio('pop');
        this.openHotelModal(hotel);
      };

      container.appendChild(card);
    });

    // Tambahkan Tombol "Tampilkan Lebih Banyak" jika total hotel melebihi limit yang tampil
    if (allHotels.length > this.visibleCount) {
      const remaining = allHotels.length - this.visibleCount;
      const loadMoreBtnContainer = document.createElement('div');
      loadMoreBtnContainer.className = 'pt-2 pb-3 text-center';
      loadMoreBtnContainer.innerHTML = `
        <button id="stay-load-more-btn" class="w-full py-3 bg-white dark:bg-[#140B0D] hover:bg-gray-50 dark:hover:bg-[#1f1013] text-[#EB4E70] border border-[#EB4E70]/30 hover:border-[#EB4E70] font-extrabold text-xs rounded-xl shadow-sm transition-all btn-tactile active:scale-95 flex items-center justify-center gap-1.5">
          <span>Tampilkan Lebih Banyak (${remaining} Hotel)</span>
          ${svgIcons.chevronDown(14)}
        </button>
      `;

      container.appendChild(loadMoreBtnContainer);

      document.getElementById('stay-load-more-btn').onclick = (e) => {
        e.stopPropagation();
        this.playAudio('pop');
        this.visibleCount += this.defaultBatchSize;
        this.renderHotels();
      };
    }
  },

  openHotelModal(hotel) {
    const overlay = document.getElementById('stay-modal-overlay');
    const modalCard = document.getElementById('stay-modal-card');
    if (!overlay || !modalCard) return;

    const totalPrice = hotel.price * this.stayNights;
    const starIcons = Array(hotel.stars).fill(svgIcons.star(12)).join('');

    modalCard.innerHTML = `
      <!-- Modal Header Gambar (Fixed) -->
      <div class="relative w-full h-36 sm:h-44 flex-shrink-0 overflow-hidden">
        <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-full object-cover" />
        <button id="close-modal-btn" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-black transition-colors z-10">
          ${svgIcons.close(16)}
        </button>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-2.5 left-3 right-3 text-white">
          <span class="text-[9px] font-black px-2 py-0.5 rounded bg-[#EB4E70] uppercase">${hotel.type}</span>
          <h2 class="text-sm sm:text-base font-black mt-0.5 leading-tight">${hotel.name}</h2>
        </div>
      </div>

      <!-- Modal Body Content (Scrollable) -->
      <div class="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
        <div class="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
          <div>
            <div class="flex items-center gap-1 text-amber-500 mb-0.5">${starIcons}</div>
            <p class="text-[11px] text-gray-400 font-semibold">${hotel.area}</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-black text-emerald-600 dark:text-emerald-400 block">★ ${hotel.rating} / 5.0</span>
            <span class="text-[9px] text-gray-400 font-bold">Sangat Memuaskan</span>
          </div>
        </div>

        <div class="space-y-1">
          <h4 class="text-[10px] font-black text-gray-400 uppercase">Deskripsi Akomodasi</h4>
          <p class="text-[11px] text-gray-400 leading-relaxed">${hotel.description}</p>
        </div>

        <!-- Detail Rincian Biaya -->
        <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)] space-y-2">
          <div class="flex justify-between font-bold">
            <span class="text-gray-400">Tamu Pemesan</span>
            <span class="text-[var(--text-main)]">${this.guestName}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span class="text-gray-400">Tanggal Check-In</span>
            <span class="text-[var(--text-main)]">${this.selectedDateStr}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span class="text-gray-400">Durasi Menginap</span>
            <span class="text-[#EB4E70] font-black">${this.stayNights} Malam</span>
          </div>
          <div class="flex justify-between font-bold border-t border-gray-200 dark:border-gray-800 pt-2 text-xs sm:text-sm">
            <span>Total Harga (${this.stayNights} Malam)</span>
            <span class="text-[#EB4E70] font-black">Rp ${totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <!-- Modal Footer Button (Fixed) -->
      <div class="p-3 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex-shrink-0">
        <button id="confirm-stay-btn" class="w-full py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-lg btn-tactile active:scale-95">
          Konfirmasi & Pesan Kamar
        </button>
      </div>
    `;

    overlay.classList.remove('hidden');

    document.getElementById('close-modal-btn').onclick = () => {
      this.playAudio('pop');
      overlay.classList.add('hidden');
    };

    document.getElementById('confirm-stay-btn').onclick = (e) => {
      this.playAudio('chime');
      if (window.spawnParticleBurst) {
        const rect = e.target.getBoundingClientRect();
        window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      overlay.classList.add('hidden');
      this.checkoutHotel(hotel, totalPrice);
    };
  },

  checkoutHotel(hotel, totalPrice) {
    showToast(`Memproses reservasi ${hotel.name}...`);

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Layanan</span><span>NusaStay (${hotel.name})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Lokasi</span><span>${hotel.area}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Check-In</span><span>${this.selectedDateStr} (${this.stayNights} Malam)</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Nama Tamu</span><span class="text-[#EB4E70] font-black">${this.guestName}</span></div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-extrabold text-sm">
          <span>Total Pembayaran</span>
          <span class="text-[#EB4E70]">Rp ${totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    if (window.openPaymentDrawerWithAmount) {
      window.openPaymentDrawerWithAmount(totalPrice, summaryHtml);
    }
  }
};

export function renderNusaStay(container, soundEngine = null) {
  NusaStay.init(container, soundEngine);
}