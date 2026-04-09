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
    title: "Agafay Desert (Quad, Camel & Dinner)",
    img: "images/Marrakech/agafay.jpg",
    desc: `<strong>The Ultimate Agafay Desert Escape: Quad Biking, Camel Trek & Dinner Show</strong><br><br>
Leave the bustling streets of Marrakech behind for an unforgettable, action-packed getaway in the mesmerizing Agafay Desert. Experience the perfect blend of high-octane adventure, relaxing pool time, and authentic Moroccan hospitality, culminating in a magical evening under the stars.
<br><br>
<strong>Essential Tour Details:</strong><br>
• The Route : Direct transfer from your Marrakech accommodation to the heart of the Agafay Desert.<br>
• Pick-up Time: 03:30 PM (Afternoon departure)<br>
• Total Duration: Approximately 6 Hours<br><br>

<strong>What’s Included in Your Package:</strong><br>
✔️ Round-trip, door-to-door transfers in a climate-controlled 4x4 or minivan.<br>
✔️ Accompaniment by a friendly, English-speaking guide/driver.<br>
✔️ Fully equipped and guided ATV/Quad biking session.<br>
✔️ Traditional camel trekking experience in nomadic attire.<br>
✔️ Authentic Moroccan dinner accompanied by live entertainment.<br>
✔️ Complimentary access to our refreshing desert swimming pool.<br><br>

<strong>What’s Not Included:</strong><br>
❌ Personal purchases, extra beverages, or optional gratuities.<br><br>

<strong>What to Expect on Your Journey:</strong><br>
Your adventure begins with a convenient hotel pickup at 3:30 PM, whisking you away to our desert base camp. After meeting your experienced crew and gearing up, your desert story unfolds:<br><br>

<strong>The Pool & Camel Trek</strong> : Take a dip in our refreshing swimming pool to cool off. Then, embrace the rhythm of the desert with a peaceful camel ride. Feel the gentle sway of your camel as you soak in the panoramic views of the golden landscape dressed in traditional nomadic attire.<br><br>

<strong>The Quad Adventure:</strong> Kick things into high gear! Hop on a robust ATV and race through Agafay’s rugged, rocky terrain. Feel the adrenaline rush as you find the ultimate vantage point to watch the sun dip below the horizon.<br><br>

<strong>The Sunset & Dinner Show:</strong> As the sky lights up with vibrant sunset hues, relax around a warm fire. Finish your night seated under a traditional Berber tent, enjoying a feast of aromatic Moroccan cuisine—succulent grilled meats and rich spices—while soaking in the tranquil desert ambiance.<br><br>

<strong>Tour Highlights:</strong><br>
🏜️ Off-Road Thrills: Zoom through stunning, untamed desert landscapes on an exhilarating quad bike ride.<br>
🐪 Cultural Immersion : Step into Moroccan culture with a memorable camel ride.<br>
🌅 Golden Hour Magic: Witness a breathtaking desert sunset, watching the sky paint itself in vibrant colors far away from city lights.<br>
🍲 Authentic Berber Feast: Indulge in mouthwatering traditional dishes and aromatic spices under a beautiful Berber tent.<br>
✨ Starlit Serenity: Escape the hustle of Marrakech and find true peace in the vast, tranquil beauty of the Agafay wilderness.<br><br>

<strong>Frequently Asked Questions (FAQs):</strong><br>
<strong>Q: Do I need to be an experienced driver to ride the quads?</strong><br>
A: Not at all! Our expert instructors will give you a full safety briefing and ensure you're totally confident on the ATV before hitting the desert trails.<br><br>
<strong>Q: Is this excursion kid-friendly?</strong><br>
A: Absolutely. Children are more than welcome to join the camel trek and can ride safely as passengers on the quad bikes alongside a responsible adult.<br><br>
<strong>Q: What is the best dress code for this desert trip?</strong><br>
A: Opt for comfortable, casual clothes and closed-toe shoes for the rides. We also highly recommend bringing sunglasses, sun protection, and a light jacket or sweater since the desert cools down quickly after sunset.<br><br>
<strong>Q: Do I need to pay extra for the meal?</strong><br>
A: No, your mouthwatering Berber dinner and the evening entertainment are completely covered in your booking price.<br><br>
<strong>Q: Do you cater to vegetarians or people with specific food allergies?</strong><br>
A: Yes, we happily accommodate special dietary needs. Just inform us when booking, and our chefs will prepare a customized, delicious menu for you.<br><br>
<strong>Q: What is the total duration of the trip?</strong><br>
A: Expect the entire adventure to last around 6 hours. This covers your transport, pool time, all the riding activities, and the dinner experience.<br><br>
<strong>Q: Will there be a huge crowd on the tour?</strong><br>
A: We deliberately keep our groups small and intimate. This ensures you get a personalized, safe, and premium experience without feeling rushed.<br><br>
<strong>Q: How do we get to the Agafay Desert?</strong><br>
A: We take care of all the driving! You’ll be picked up and dropped off right at your hotel or riad in a modern, comfortable vehicle.<br><br>
<strong>Q: Do I need to be highly physically fit for this?</strong><br>
A: This excursion is easygoing and crafted to be accessible for almost everyone. If you have any specific physical limitations, just drop us a message beforehand so we can ensure your comfort!`,
    duration: "≈ 6 hours",
    timing: "Departure 15:30",
    price: "195 EUR",
    schedule: [],
    activities: []
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
    title: "Hot Air Balloon Flight",
    img: "images/Marrakech/montgolfiere.webp",
    desc: `<strong>Majestic Sunrise Flight: Marrakech Hot Air Balloon & Atlas Mountains Adventure</strong><br><br>
Elevate your Marrakech experience—literally. Rise before the sun and take to the skies for a breathtaking hot air balloon flight over the region's stunning landscapes. Float peacefully above crimson desert terrain, lush palm groves, and traditional villages, all set against the awe-inspiring backdrop of the majestic High Atlas Mountains.
<br><br>
<strong>Essential Tour Details:</strong><br>
• The Route: Marrakech to the skies above the High Atlas foothills.<br>
• Pick-up Time: Approximately 2 hours before sunrise (Exact time will be confirmed prior to your flight).<br>
• Experience Type: Small group, premium guided flight.<br><br>

<strong>What’s Included in Your Package:</strong><br>
✔️ Seamless round-trip transportation (hotel pick-up and drop-off).<br>
✔️ A serene, small-group hot air balloon flight with a seasoned pilot.<br>
✔️ Live, engaging commentary during the flight.<br>
✔️ Traditional Berber breakfast served in an authentic Moroccan tent.<br>
✔️ Hot beverages (coffee, tea) and soft drinks.<br>
✔️ Personalized commemorative flight certificate.<br>
✔️ Comprehensive insurance for all passengers and their belongings.<br><br>

<strong>What to Expect on Your Journey:</strong><br>
Your morning begins with a hassle-free pickup from your accommodation in the early hours. We handle all the logistics so you can focus on the experience. Upon arriving at the launch site, watch the balloons inflate before stepping into the basket.<br><br>
As you gently ascend, the sun will begin to rise, painting the sky in vibrant morning hues. You'll enjoy a serene, guided flight with panoramic views that showcase the striking contrast between the dusty red plains, green oases, and the towering High Atlas peaks. After a smooth landing, celebrate your adventure with a freshly prepared, traditional Berber breakfast under a nomadic tent before heading back to the city.<br><br>

<strong>Tour Highlights:</strong><br>
🎈 Sunrise Magic: Watch the world wake up from the best vantage point possible as you float gracefully into the dawn.<br>
⛰️ Unrivaled Panoramas: Marvel at unobstructed, birds-eye views of the sprawling Marrakech landscapes and the majestic High Atlas Mountains.<br>
🥞 Cultural Breakfast: Refuel after your flight with a delicious, authentic Berber breakfast in a traditional setting.<br>
📜 Commemorative Keepsake: Take home a personalized flight certificate to remember your time in the Moroccan skies.<br>
🚐 VIP Convenience : Enjoy effortless booking and comfortable, door-to-door transfers.<br><br>

<strong>Logistics & Frequently Asked Questions (FAQs):</strong><br>
<strong>Q: How do I arrange my pick-up?</strong><br>
A: It’s effortless! Simply provide the name of your Marrakech hotel or riad when booking. If your accommodation is located in a pedestrian-only zone (like deep in the Medina), we will coordinate the nearest accessible meeting point for you.<br><br>
<strong>Q: When exactly will I be picked up?</strong><br>
A: Since sunrise times change throughout the year, our starting time shifts accordingly. We will contact you directly with your exact pick-up time (generally about 2 hours before dawn).<br><br>
<strong>Q: Is it cold up there? What should I wear?</strong><br>
A: The early morning air can be quite crisp, especially before the sun comes up. We highly recommend dressing in layers so you can stay warm before the flight and comfortably take off a jacket once the sun is shining. Closed-toe shoes are also recommended for the launch and landing sites.<br><br>
<strong>Q: Is it scary or turbulent?</strong><br>
A: Not at all! Hot air ballooning is incredibly peaceful and smooth. Because you move with the wind, there is virtually no sensation of movement or turbulence, making it a very serene experience.<br><br>
<strong>Q: Are my belongings safe?</strong><br>
A: Yes, your package includes comprehensive insurance for both you and your personal belongings, though we recommend bringing only the essentials (like your camera or phone) for the flight!`,
    duration: "Sunrise",
    timing: "Early Morning (2h before sunrise)",
    price: "178 EUR",
    schedule: [],
    activities: []
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
  const adults = document.getElementById("qtyAdults")?.value || "1";
  const children = document.getElementById("qtyChildren")?.value || "0";

  const text = `Hello 👋
I would like to book:

✅ Experience: ${exp.title}
📅 Date: ${date}
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
  document.getElementById("expDesc").innerHTML = exp.desc;

  const img = document.getElementById("expImg");
  img.src = exp.img;
  img.alt = exp.title;

  document.getElementById("expDuration").textContent = "⏱ " + exp.duration;

  const expSchedule = document.getElementById("expSchedule");
  if (exp.schedule && exp.schedule.length > 0) {
    expSchedule.parentElement.style.display = "block";
    expSchedule.innerHTML = exp.schedule.map((s) => `<li>${s}</li>`).join("");
  } else {
    expSchedule.parentElement.style.display = "none";
  }

  const expList = document.getElementById("expList");
  if (exp.activities && exp.activities.length > 0) {
    expList.parentElement.style.display = "block";
    expList.innerHTML = exp.activities.map((a) => `<li>${a}</li>`).join("");
  } else {
    expList.parentElement.style.display = "none";
  }
  document.getElementById("expTiming").textContent = "🕒 " + exp.timing;
  document.getElementById("expPrice").textContent = "💰 " + exp.price;

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
  if (bd) bd.value = "";

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

