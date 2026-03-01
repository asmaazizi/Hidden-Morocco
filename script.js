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
    title: "Vallée de l’Ourika (Setti Fatma)",
    img: "images/Marrakech/ourika_1.png",
    desc: "Excursion nature à 60 km de Marrakech : vallée verte, villages berbères et cascades de Setti Fatma.",
    duration: "1 jour",
    timing: "Départ 08:30 • Retour ~18:00",
    price: "45€",
    schedule: [
      "08:30 – Prise en charge à Marrakech",
      "10:00 – Route panoramique + arrêt photo",
      "11:00 – Setti Fatma & marche vers les cascades",
      "13:30 – Déjeuner (optionnel)",
      "16:30 – Retour vers Marrakech",
      "18:00 – Arrivée"
    ],
    activities: [
      "Villages berbères",
      "Marche vers les cascades",
      "Photos panoramiques",
      "Déjeuner (optionnel)"
    ]
  },

  ouzoud: {
    title: "Cascades d’Ouzoud",
    img: "images/Ouzoud/ouzoud-falls.jpg",
    desc: "Les plus belles cascades du Maroc : nature, randonnée facile et points de vue magnifiques.",
    duration: "1 jour",
    timing: "Départ 08:00 • Retour ~19:00",
    price: "250 DH",
    schedule: [
      "08:00 – Départ de Marrakech",
      "11:00 – Arrivée + balade",
      "13:00 – Déjeuner (optionnel)",
      "15:00 – Temps libre / barque (optionnel)",
      "16:30 – Retour vers Marrakech",
      "19:00 – Arrivée"
    ],
    activities: [
      "Randonnée facile",
      "Observation des macaques",
      "Barque (optionnel)",
      "Photos panoramiques"
    ]
  },

  agafay: {
    title: "Désert d’Agafay (Quad + Chameau + Dîner)",
    img: "images/Marrakech/agafay.jpg",
    desc: "Aventure en fin d’après-midi : chameau, quad, coucher du soleil et dîner sous tente berbère.",
    duration: "≈ 6 heures",
    timing: "Départ 15:30 • Retour ~21:30",
    price: "190€",
    schedule: [
      "15:30 – Prise en charge à Marrakech",
      "17:00 – Arrivée au camp + briefing",
      "17:30 – Balade en chameau",
      "18:15 – Quad",
      "19:00 – Coucher du soleil",
      "20:00 – Dîner + show",
      "21:30 – Retour"
    ],
    activities: [
      "Balade en chameau",
      "Quad",
      "Sunset",
      "Dîner berbère"
    ]
  },

  imlil: {
    title: "Imlil & Atlas",
    img: "images/Marrakech/imlil_1.jpg",
    desc: "Journée montagne : randonnée, villages amazighs et panoramas sur le Toubkal.",
    duration: "1 jour",
    timing: "Départ 08:00 • Retour ~18:00",
    price: "Sur demande",
    schedule: [
      "08:00 – Départ Marrakech",
      "10:00 – Arrivée Imlil",
      "Randonnée + villages",
      "16:30 – Retour",
      "18:00 – Arrivée"
    ],
    activities: [
      "Randonnée",
      "Villages amazighs",
      "Panoramas Atlas"
    ]
  },

  takerkoust: {
    title: "Lac Lalla Takerkoust",
    img: "images/Marrakech/lac-lala-takerkoust.webp",
    desc: "Sortie détente : lac, nature et activités outdoor selon la formule.",
    duration: "Demi-journée",
    timing: "Matin ou après-midi",
    price: "Sur demande",
    schedule: [
      "Option matin ou après-midi",
      "Temps libre au lac",
      "Activités selon la formule"
    ],
    activities: [
      "Balade au bord du lac",
      "Détente",
      "Quad (optionnel)"
    ]
  },

  ballon: {
    title: "Montgolfière au lever du soleil",
    img: "images/Marrakech/montgolfiere.webp",
    desc: "Vol sunrise + petit-déjeuner berbère après l’atterrissage.",
    duration: "≈ 4–5 heures",
    timing: "Départ ~2h avant sunrise",
    price: "177€",
    schedule: [
      "Pick-up (2h avant sunrise)",
      "Préparation du ballon",
      "Vol 40–60 min (météo)",
      "Petit-déjeuner berbère",
      "Retour hôtel"
    ],
    activities: [
      "Vol",
      "Lever du soleil",
      "Petit-déjeuner",
      "Certificat (selon formule)"
    ]
  }
};

/* ---------- Swiper: Experiences Marrakech ---------- */
function initExpSwiperMarrakech() {
  const el = document.querySelector(".expSwiper-marrakech");
  if (!el) return;

  if (expSwiperMarrakech) {
    expSwiperMarrakech.update();
    return;
  }

  expSwiperMarrakech = new Swiper(".expSwiper-marrakech", {
    slidesPerView: "auto",
    spaceBetween: 16,
    freeMode: true,
    navigation: {
      nextEl: ".marr-exp-next",
      prevEl: ".marr-exp-prev"
    },
    pagination: {
      el: ".marr-exp-pagination",
      clickable: true
    }
  });
}

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

  if (city === "marrakech") {
    setTimeout(initExpSwiperMarrakech, 80);
  }
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
  const name = document.querySelector('input[placeholder="Nom complet"]')?.value || "";
  const email = document.querySelector('input[placeholder="Adresse email"]')?.value || "";
  const phone = document.querySelector('input[placeholder="Téléphone / WhatsApp"]')?.value || "";
  const date = document.querySelector(".travel-form input[type='date']")?.value || "";

  const selects = document.querySelectorAll(".travel-form select");
  const adults = selects[0]?.value || "";
  const children = selects[1]?.value || "";
  const message = document.querySelector(".travel-form textarea")?.value || "";

  const whatsappMessage = `Bonjour 👋

Nouvelle demande de voyage – Hidden Morocco 🌍

👤 Nom : ${name}
📧 Email : ${email}
📱 Téléphone : ${phone}

📅 Date : ${date}
👨‍👩‍👧 Adultes : ${adults}
🧒 Enfants : ${children}

📝 Message :
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

  const text = `Bonjour 👋
Je souhaite réserver :

✅ Expérience : ${exp.title}
📅 Date : ${date}
🕒 Heure : ${time}
👤 Adultes : ${adults}
🧒 Enfants : ${children}

Merci !`;

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

/* ---------- Close modals with ESC ---------- */
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

/* ---------- On load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMap(); // يرجّع الخريطة تبان
});

document.addEventListener("DOMContentLoaded", () => {
  // طيّ الصورة فالمودال ملي كنscrolli
  const sheet = document.querySelector(".exp-sheet");
  const body = document.querySelector(".exp-body");

  if (sheet && body) {
    body.addEventListener("scroll", () => {
      if (body.scrollTop > 40) sheet.classList.add("is-scrolled");
      else sheet.classList.remove("is-scrolled");
    });
  }

});

