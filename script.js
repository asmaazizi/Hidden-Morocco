/* =========================
   Hidden Morocco - app.js
   ========================= */

/* ---------- Helpers ---------- */
const WHATSAPP_NUMBER = "212771663435";
let CURRENT_EXP_KEY = null;
let expSwiperMarrakech = null;

// استخراج رقم من "45€" أو "250 DH"
function getPriceNumber(priceStr) {
  const m = (priceStr || "").match(/(\d+(?:[.,]\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
}

function getCurrency(priceStr) {
  if (!priceStr) return "";
  if (priceStr.includes("€")) return "€";
  if (priceStr.toUpperCase().includes("DH")) return "DH";
  return "";
}

function formatTotal(value, currency) {
  if (value == null) return "—";
  if (currency === "€") return `${value.toFixed(0)}€`;
  if (currency === "DH") return `${value.toFixed(0)} DH`;
  return `${value.toFixed(0)}`;
}

function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

/* ---------- Experiences data ---------- */
const EXPERIENCES = {
  ourika: {
    title: "Ourika Valley (Setti Fatma)",
    img: "images/Marrakech/ourika_1.png",
    desc: "Nature excursion 60 km from Marrakech: green valley, Berber villages and Setti Fatma waterfalls.",
    duration: "1 day",
    timing: "Departure 08:30 • Return ~18:00",
    price: "45€",
    schedule: [
      "08:30 – Pick up in Marrakech",
      "10:00 – Scenic drive + photo stop",
      "11:00 – Setti Fatma & walk to waterfalls",
      "13:30 – Lunch (optional)",
      "16:30 – Return to Marrakech",
      "18:00 – Arrival"
    ],
    activities: [
      "Berber villages",
      "Walk to waterfalls",
      "Panoramic photos",
      "Lunch (optional)"
    ]
  },

  ouzoud: {
    title: "Ouzoud Waterfalls",
    img: "images/Ouzoud/ouzoud-falls.jpg",
    desc: "The most beautiful waterfalls in Morocco: nature, easy hike and magnificent views.",
    duration: "1 day",
    timing: "Departure 08:00 • Return ~19:00",
    price: "250 DH",
    schedule: [
      "08:00 – Departure from Marrakech",
      "11:00 – Arrival + walk",
      "13:00 – Lunch (optional)",
      "15:00 – Free time / boat ride (optional)",
      "16:30 – Return to Marrakech",
      "19:00 – Arrival"
    ],
    activities: [
      "Easy hike",
      "Macaque monkeys observation",
      "Boat ride (optional)",
      "Panoramic photos"
    ]
  },

  agafay: {
    title: "Agafay Desert (Quad + Camel + Dinner)",
    img: "images/Marrakech/agafay.jpg",
    desc: "Late afternoon adventure: camel, quad, sunset and dinner in a Berber tent.",
    duration: "≈ 6 hours",
    timing: "Departure 15:30 • Return ~21:30",
    price: "190€",
    schedule: [
      "15:30 – Pick up in Marrakech",
      "17:00 – Arrival at camp + briefing",
      "17:30 – Camel ride",
      "18:15 – Quad biking",
      "19:00 – Sunset",
      "20:00 – Dinner + show",
      "21:30 – Return"
    ],
    activities: [
      "Camel ride",
      "Quad biking",
      "Sunset",
      "Berber dinner"
    ]
  },

  imlil: {
    title: "Imlil & Atlas",
    img: "images/Marrakech/imlil_1.jpg",
    desc: "Mountain day: hiking, Amazigh villages and panoramas of Toubkal.",
    duration: "1 day",
    timing: "Departure 08:00 • Return ~18:00",
    price: "On request",
    schedule: [
      "08:00 – Departure from Marrakech",
      "10:00 – Arrival in Imlil",
      "Hike + villages",
      "16:30 – Return",
      "18:00 – Arrival"
    ],
    activities: [
      "Hiking",
      "Amazigh villages",
      "Atlas Panoramas"
    ]
  },

  takerkoust: {
    title: "Lalla Takerkoust Lake",
    img: "images/Marrakech/lac-lala-takerkoust.webp",
    desc: "Relaxing outing: lake, nature and outdoor activities depending on the package.",
    duration: "Half-day",
    timing: "Morning or afternoon",
    price: "On request",
    schedule: [
      "Morning or afternoon option",
      "Free time at the lake",
      "Activities depending on package"
    ],
    activities: [
      "Walk by the lake",
      "Relaxation",
      "Quad (optional)"
    ]
  },

  ballon: {
    title: "Sunrise Hot Air Balloon",
    img: "images/Marrakech/montgolfiere.webp",
    desc: "Sunrise flight + Berber breakfast after landing.",
    duration: "≈ 4–5 hours",
    timing: "Departure ~2h before sunrise",
    price: "177€",
    schedule: [
      "Pick-up (2h before sunrise)",
      "Balloon preparation",
      "Flight 40–60 min (weather)",
      "Berber breakfast",
      "Return to hotel"
    ],
    activities: [
      "Flight",
      "Sunrise",
      "Breakfast",
      "Certificate (depending on package)"
    ]
  },

  souks: {
    title: "Jemaa el-Fnaa & Medina Souks Tour",
    img: "images/Marrakech/souk-of-Marrakech.webp",
    desc: "Guided street food exploration through Jemaa el-Fnaa square, ancient spice souks, and hidden artisan workshops inside the Medina.",
    duration: "3 hours",
    timing: "Evening • 17:30 to 20:30",
    price: "35€",
    schedule: [
      "17:30 – Meet guide at Medina entrance gate",
      "18:00 – Spice market & artisan workshops walk",
      "19:30 – Jemaa el-Fnaa food stalls tasting (Tanjia, Pastilla, Mint Tea)",
      "20:30 – Rooftop sunset tea overlooking the square"
    ],
    activities: ["Street Food Tasting", "Spice Market Walk", "Artisan Workshops", "Rooftop Sunset Tea"]
  },

  palaces: {
    title: "Bahia Palace & Le Jardin Secret",
    img: "images/Marrakech/marrakech_11.jpg",
    desc: "Discover the architectural wonders of 19th-century Grand Viziers, ornate zellij tilework, Saadian Tombs, and quiet Islamic botanical gardens.",
    duration: "Half-day",
    timing: "Morning • 09:30 to 13:00",
    price: "45€",
    schedule: [
      "09:30 – Guided walking tour of Bahia Palace",
      "11:00 – Saadian Tombs & Jewish Quarter (Mellah)",
      "12:30 – Le Jardin Secret botanical garden & tea lunch"
    ],
    activities: ["Zellij Tilework", "Royal Palaces", "Botanical Gardens", "Historical Guide"]
  },

  hammam: {
    title: "Traditional Royal Hammam & Spa",
    img: "images/Marrakech/marrakech_4.webp",
    desc: "Indulge in an authentic Moroccan wellness ritual: black soap scrub with eucalyptus, natural rhassoul clay mask, and argan oil massage inside a luxury Riad.",
    duration: "2 hours",
    timing: "Flexible daily timeslots",
    price: "60€",
    schedule: [
      "Welcome herbal tea at historic Riad Spa",
      "Eucalyptus black soap steam room",
      "Exfoliating glove scrub & rhassoul clay body wrap",
      "Full body argan oil massage in relaxation patio"
    ],
    activities: ["Eucalyptus Steam", "Black Soap Scrub", "Argan Oil Massage", "Riad Relaxation"]
  },

  palmeraie: {
    title: "Palmeraie Sunset Quad & Camel Walk",
    img: "images/Marrakech/agafay.jpg",
    desc: "Ride through thousands of historic palm trees in the Marrakech Palmeraie on quad bikes and camels during golden hour sunset.",
    duration: "3 hours",
    timing: "Late Afternoon • 16:30 to 19:30",
    price: "55€",
    schedule: [
      "16:30 – Pick up from your Medina Riad or Hotel",
      "17:00 – Quad bike adventure through palm groves & villages",
      "18:00 – Sunset camel walk in traditional Berber dress",
      "19:00 – Fresh mint tea break at palm bivouac"
    ],
    activities: ["Quad Biking", "Sunset Camel Walk", "Palmeraie Groves", "Berber Tea"]
  },

  cooking: {
    title: "Moroccan Tagine Culinary Masterclass",
    img: "images/Marrakech/marrakech_1.jpg",
    desc: "Shop for fresh herbs and spices in the local market, then learn to cook authentic lamb tagine and pastilla with a master chef in an open-air Riad patio.",
    duration: "Half-day",
    timing: "Morning • 09:30 to 13:30",
    price: "50€",
    schedule: [
      "09:30 – Souk market shopping for fresh herbs & spices",
      "10:30 – Hands-on cooking workshop in open-air Riad patio",
      "12:30 – Enjoy your self-cooked 3-course Moroccan lunch"
    ],
    activities: ["Market Shopping", "Tagine Masterclass", "Spices Workshop", "3-Course Lunch"]
  },

  majorelle: {
    title: "Majorelle Garden & YSL Museum",
    img: "images/Marrakech/marrakech_12.jpg",
    desc: "Walk through Jacques Majorelle’s iconic cobalt blue botanical haven, Berber Museum artifacts, and high-fashion exhibits at the Yves Saint Laurent Museum.",
    duration: "Half-day",
    timing: "Morning or Afternoon",
    price: "40€",
    schedule: [
      "Skip-the-line priority entry to Jardin Majorelle",
      "Guided walk through Pierre Bergé Museum of Berber Arts",
      "Yves Saint Laurent Fashion Museum exhibition gallery",
      "Refreshments at the garden courtyard café"
    ],
    activities: ["Cobalt Blue Villa", "Botanical Palms", "Berber Art Collection", "YSL Couture Exhibit"]
  }
};

/* ---------- CSS Accordion Experience Marrakech (No JS required) ---------- */

/* ---------- Destination Modals ---------- */
window.openModal = function (city) {
  const modal = document.getElementById("modal-" + city);
  if (!modal) return;

  modal.style.display = "block";
  lockBodyScroll(true);

  // init swiper in this modal
  const selector = "#modal-" + city + " .mySwiper-" + city;
  const swiperEl = document.querySelector(selector);

  if (swiperEl) {
    new Swiper(selector, {
      loop: true,
      navigation: {
        nextEl: "#modal-" + city + " .swiper-button-next",
        prevEl: "#modal-" + city + " .swiper-button-prev"
      },
      pagination: {
        el: "#modal-" + city + " .swiper-pagination",
        clickable: true
      }
    });
  }

  // removed marrakech swiper override
};

window.closeModal = function (city) {
  const modal = document.getElementById("modal-" + city);
  if (!modal) return;
  modal.style.display = "none";
  lockBodyScroll(false);
};

/* ---------- Leaflet Map ---------- */
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  // إذا كان map كيتعاود يتحمل، منع duplicate
  if (mapEl.dataset.ready === "1") return;
  mapEl.dataset.ready = "1";

  // مهم: leaflet خاصو height فـ CSS (عندك 550px، مزيان)
  const map = L.map("map").setView([31.7917, -7.0926], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const cities = [
    { name: "Marrakech", coords: [31.6295, -7.9811] },
    { name: "Fès", coords: [34.0333, -5.0] },
    { name: "Chefchaouen", coords: [35.1688, -5.2636] },
    { name: "Essaouira", coords: [31.5085, -9.7595] },
    { name: "Merzouga", coords: [31.0994, -4.0127] },
    { name: "Ouzoud", coords: [32.0167, -6.7167] }
  ];

  cities.forEach((c) => {
    L.marker(c.coords)
      .addTo(map)
      .bindPopup(`<strong>${c.name}</strong>`);
  });

  // في بعض الحالات الخريطة كتجي صغيرة حتى كتعمل invalidateSize
  setTimeout(() => map.invalidateSize(), 300);
}

/* ---------- Travel form => WhatsApp ---------- */
window.sendWhatsApp = function () {
  const name = document.querySelector('input[placeholder="Full Name"]')?.value || "";
  const email = document.querySelector('input[placeholder="Email Address"]')?.value || "";
  const phone = document.querySelector('input[placeholder="Phone / WhatsApp"]')?.value || "";
  const date = document.querySelector(".travel-form input[type='date']")?.value || "";

  const selects = document.querySelectorAll(".travel-form select");
  const adults = selects[0]?.value || "";
  const children = selects[1]?.value || "";
  const message = document.querySelector(".travel-form textarea")?.value || "";

  const whatsappMessage = `Hello 👋

New travel request – Hidden Morocco 🌍

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

📅 Date: ${date}
👨‍👩‍👧 Adults: ${adults}
🧒 Children: ${children}

📝 Message:
${message}`;

  window.open(
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(whatsappMessage),
    "_blank"
  );
};

/* ---------- Experience Modal + Booking ---------- */
function calcTotal() {
  if (!CURRENT_EXP_KEY) return;

  const exp = EXPERIENCES[CURRENT_EXP_KEY];
  const adults = Number(document.getElementById("qtyAdults")?.value || 1);
  const children = Number(document.getElementById("qtyChildren")?.value || 0);

  const base = getPriceNumber(exp.price);
  const currency = getCurrency(exp.price);

  // الأطفال بنصف الثمن (قدري تبدليه)
  const total = base == null ? null : adults * base + children * base * 0.5;

  const totalEl = document.getElementById("bookTotal");
  if (totalEl) totalEl.textContent = formatTotal(total, currency);
}

window.qtyChange = function (type, delta) {
  const input = document.getElementById(type === "adults" ? "qtyAdults" : "qtyChildren");
  if (!input) return;

  let v = Number(input.value || 0) + delta;

  if (type === "adults") v = Math.max(1, v);
  if (type === "children") v = Math.max(0, v);

  input.value = v;
  calcTotal();
};

window.bookNow = function () {
  if (!CURRENT_EXP_KEY) return;
  const exp = EXPERIENCES[CURRENT_EXP_KEY];

  const date = document.getElementById("bookDate")?.value || "—";
  const time = document.getElementById("bookTime")?.value || "—";
  const adults = document.getElementById("qtyAdults")?.value || "1";
  const children = document.getElementById("qtyChildren")?.value || "0";

  const text = `Hello 👋
I would like to book:

✅ Experience: ${exp.title}
📅 Date: ${date}
🕒 Time: ${time}
👤 Adults: ${adults}
🧒 Children: ${children}

Thank you!`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};

window.openExp = function (key) {
  const exp = EXPERIENCES[key];
  if (!exp) return;

  CURRENT_EXP_KEY = key;

  // Fill hero
  document.getElementById("expTitle").textContent = exp.title;
  document.getElementById("expDesc").textContent = exp.desc;

  const img = document.getElementById("expImg");
  img.src = exp.img;
  img.alt = exp.title;

  document.getElementById("expDuration").textContent = "⏱ " + exp.duration;
  document.getElementById("expTiming").textContent = "🕒 " + exp.timing;
  document.getElementById("expPrice").textContent = "💰 " + exp.price;

  // Programme
  const sch = document.getElementById("expSchedule");
  sch.innerHTML = "";
  exp.schedule.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    sch.appendChild(li);
  });

  // Activités
  const ul = document.getElementById("expList");
  ul.innerHTML = "";
  exp.activities.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    ul.appendChild(li);
  });

  // Booking card
  const basePriceEl = document.getElementById("bookBasePrice");
  const titleMiniEl = document.getElementById("bookTitleMini");
  if (basePriceEl) basePriceEl.textContent = exp.price || "—";
  if (titleMiniEl) titleMiniEl.textContent = exp.title || "—";

  // reset booking inputs
  const qa = document.getElementById("qtyAdults");
  const qc = document.getElementById("qtyChildren");
  if (qa) qa.value = 1;
  if (qc) qc.value = 0;

  const bd = document.getElementById("bookDate");
  const bt = document.getElementById("bookTime");
  if (bd) bd.value = "";
  if (bt) bt.value = "";

  calcTotal();

  // open modal
  const modal = document.getElementById("expModal");
  modal.style.display = "flex";
  lockBodyScroll(true);
};

window.closeExp = function () {
  const modal = document.getElementById("expModal");
  if (!modal) return;
  modal.style.display = "none";
  lockBodyScroll(false);
};

/* ---------- Close modals with ESC & Outside Click ---------- */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  // close exp modal if open
  const expModal = document.getElementById("expModal");
  if (expModal && expModal.style.display === "flex") {
    window.closeExp();
    return;
  }

  // close any city modal open
  document.querySelectorAll(".modal").forEach((m) => {
    if (getComputedStyle(m).display !== "none") {
      m.style.display = "none";
      lockBodyScroll(false);
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    lockBodyScroll(false);
  }
});


/* ---------- On load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMap(); 
});

