/* js/utils/i18n.js */
export const translations = {
  id: {
    brandName: "NUSA",
    greetingMorning: "Selamat Pagi",
    greetingAfternoon: "Selamat Siang",
    greetingEvening: "Selamat Sore",
    greetingNight: "Selamat Malam",
    userTitle: "User NUSA",
    balanceTitle: "Saldo NUSA",
    topUp: "Isi Saldo",
    pay: "Bayar",
    more: "Lainnya",
    less: "Sembunyikan",
    scanQrisTitle: "Pindai QRIS Pembayaran",
    scanQrisHint: "Arahkan kamera ke QR Code / QRIS Merchant",
    simulateQris: "Simulasi Scan QRIS (Rp 25.000)",
    topUpTitle: "Isi Saldo NUSA",
    topUpSub: "Top-up Wallet Instan",
    selectAmount: "Pilih Nominal",
    customAmountPlaceholder: "Atau nominal manual (Rp)",
    confirmPayment: "Konfirmasi Pembayaran",
    payNowDrawer: "Bayar Sekarang (Potong Saldo NUSA)",
    paymentConfirmation: "Konfirmasi Pembayaran",

    // Services & Forms
    flightServiceTitle: "Layanan Penerbangan Domestik",
    railServiceTitle: "Layanan Kereta Api KAI",
    fromOrigin: "Dari (Origin)",
    toDestination: "Ke (Destination)",
    originStation: "Stasiun Asal",
    destStation: "Stasiun Tujuan",
    passengerName: "Nama Penumpang",
    departureDate: "Tanggal Keberangkatan",
    trainDepartureDate: "Tanggal Keberangkatan Kereta",
    routeMap: "Peta Visual Rute & Hub",
    availableFlights: "Penerbangan Tersedia",
    availableTrains: "Jadwal Kereta Tersedia",
    loading: "Memuat...",
    swapRoute: "Tukar Rute",
    swapStation: "Tukar Stasiun",
    distance: "Jarak",
    directFlight: "Langsung (Direct)",
    transitFlight: "Transit",
    pricePerPerson: "Harga per orang",
    pricePerPassenger: "Harga per penumpang",
    bookNow: "Pesan",
    bookTrain: "Pesan Kereta",
    noFlightsFound: "Tidak ada penerbangan sesuai pilihanmu.",
    noFlightsSub: "Jadwal penerbangan untuk hari ini sudah berlalu.",
    noTrainsFound: "Tidak ada jadwal kereta tersedia.",
    noTrainsSub: "Seluruh keberangkatan kereta hari ini sudah berlalu.",
    changeSearch: "Ubah Pencarian",
    selectTomorrow: "Pilih Tanggal Besok",

    // Toasts & Alerts
    langChanged: "Bahasa diubah ke Bahasa Indonesia",
    themeDark: "Mode Gelap (Dark) diaktifkan",
    themeLight: "Mode Terang (Light) diaktifkan",
    sameRouteErr: "Asal dan tujuan tidak boleh sama!",
    sameStationErr: "Stasiun asal dan tujuan tidak boleh sama!",
    routeSwapped: "Rute Ditukar",
    stationSwapped: "Rute Kereta Ditukar",
    topupSuccess: "Top-Up Berhasil! Saldo bertambah",
    topupInvalid: "Masukkan nominal isi saldo yang valid.",
    paySuccess: "Pembayaran Berhasil!",
    insufficientBalance: "Gagal: Saldo NUSA tidak mencukupi. Silakan isi saldo!",
    camNotFound: "Kamera tidak terdeteksi. Gunakan tombol simulasi.",
    processingTicket: "Memproses Tiket",

    // Summary Labels
    serviceLabel: "Layanan",
    flightRouteLabel: "Rute Flight",
    trainRouteLabel: "Rute Kereta",
    trainClassLabel: "Kelas Kereta",
    scheduleLabel: "Jadwal",
    baggageLabel: "Fasilitas Bagasi",
    cabinBaggage: "Kabin",
    checkedBaggage: "Bagasi",
    totalPay: "Total Bayar",

    labels: {
      origin: "DARI (ASAL)",
      destination: "KE (TUJUAN)",
      customer: "NAMA PEMESAN",
      summary: "Ringkasan Pesanan",
      total: "Total Tagihan",
      paymentMethod: "Metode Pembayaran",
      status: "Status",
      success: "Pesanan Berhasil!",
      refCode: "Kode Referensi",
      backHome: "Kembali ke Beranda",
      foodQty: "Pilihan Menu Makanan",
      hotelRoom: "Pilihan Kamar Hotel"
    }
  },
  en: {
    brandName: "NUSA",
    greetingMorning: "Good Morning",
    greetingAfternoon: "Good Afternoon",
    greetingEvening: "Good Evening",
    greetingNight: "Good Night",
    userTitle: "NUSA User",
    balanceTitle: "NUSA Balance",
    topUp: "Top Up",
    pay: "Pay",
    more: "More",
    less: "Hide",
    scanQrisTitle: "Scan QRIS Payment",
    scanQrisHint: "Point camera at QR Code / Merchant QRIS",
    simulateQris: "Simulate Scan QRIS (Rp 25,000)",
    topUpTitle: "NUSA Top Up",
    topUpSub: "Instant Wallet Top-up",
    selectAmount: "Select Amount",
    customAmountPlaceholder: "Or manual amount (Rp)",
    confirmPayment: "Confirm Payment",
    payNowDrawer: "Pay Now (Deduct NUSA Balance)",
    paymentConfirmation: "Payment Confirmation",

    // Services & Forms
    flightServiceTitle: "Domestic Flight Service",
    railServiceTitle: "KAI Train Service",
    fromOrigin: "From (Origin)",
    toDestination: "To (Destination)",
    originStation: "Origin Station",
    destStation: "Destination Station",
    passengerName: "Passenger Name",
    departureDate: "Departure Date",
    trainDepartureDate: "Train Departure Date",
    routeMap: "Route & Hub Visual Map",
    availableFlights: "Available Flights",
    availableTrains: "Available Train Schedules",
    loading: "Loading...",
    swapRoute: "Swap Route",
    swapStation: "Swap Station",
    distance: "Distance",
    directFlight: "Direct",
    transitFlight: "Transit",
    pricePerPerson: "Price per person",
    pricePerPassenger: "Price per passenger",
    bookNow: "Book",
    bookTrain: "Book Train",
    noFlightsFound: "No flights available for your selection.",
    noFlightsSub: "Flight schedules for today have already passed.",
    noTrainsFound: "No train schedules available.",
    noTrainsSub: "All train departures for today have passed.",
    changeSearch: "Change Search",
    selectTomorrow: "Select Tomorrow's Date",

    // Toasts & Alerts
    langChanged: "Language switched to English",
    themeDark: "Dark mode activated",
    themeLight: "Light mode activated",
    sameRouteErr: "Origin and destination cannot be the same!",
    sameStationErr: "Origin and destination stations cannot be the same!",
    routeSwapped: "Route Swapped",
    stationSwapped: "Train Route Swapped",
    topupSuccess: "Top-Up Successful! Balance increased by",
    topupInvalid: "Please enter a valid top-up amount.",
    paySuccess: "Payment Successful!",
    insufficientBalance: "Failed: Insufficient NUSA Balance. Please top up!",
    camNotFound: "Camera not detected. Use simulation button.",
    processingTicket: "Processing Ticket",

    // Summary Labels
    serviceLabel: "Service",
    flightRouteLabel: "Flight Route",
    trainRouteLabel: "Train Route",
    trainClassLabel: "Train Class",
    scheduleLabel: "Schedule",
    baggageLabel: "Baggage Allowance",
    cabinBaggage: "Cabin",
    checkedBaggage: "Checked",
    totalPay: "Total Payment",

    labels: {
      origin: "FROM (ORIGIN)",
      destination: "TO (DESTINATION)",
      customer: "CUSTOMER NAME",
      summary: "Order Summary",
      total: "Total Amount",
      paymentMethod: "Payment Method",
      status: "Status",
      success: "Order Successful!",
      refCode: "Reference Code",
      backHome: "Back to Home",
      foodQty: "Food Menu Selection",
      hotelRoom: "Hotel Room Selection"
    }
  }
};

export function getCurrentLang() {
  return (localStorage.getItem('nusa_lang') || 'id').toLowerCase();
}

export function t(key, lang = getCurrentLang()) {
  const dict = translations[lang.toLowerCase()] || translations.id;
  const keys = key.split('.');
  let val = dict;
  for (const k of keys) {
    val = val ? val[k] : null;
  }
  return val || key;
}

export function setLanguage(lang) {
  const normalizedLang = lang.toLowerCase();
  localStorage.setItem('nusa_lang', normalizedLang);
  document.documentElement.setAttribute('lang', normalizedLang);
  updateDOMTranslations(normalizedLang);
}

export function updateDOMTranslations(lang = getCurrentLang()) {
  const normalizedLang = lang.toLowerCase();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translatedText = t(key, normalizedLang);
    if (translatedText) el.innerText = translatedText;
  });
}