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
    desc: "Leave the bustling streets of Marrakech behind for an unforgettable, action-packed getaway in the mesmerizing Agafay Desert. Experience the perfect blend of high-octane adventure, relaxing pool time, and authentic Moroccan hospitality, culminating in a magical evening under the stars.",
    duration: "≈ 6 hours",
    timing: "Departure 15:30",
    price: "195 EUR",
    gallery: [
      "images/Marrakech/agafay.jpg",
      "images/Marrakech/marrakech_4.webp",
      "images/Marrakech/marrakrch_9.jpg"
    ],
    route: { departure: "Marrakech", arrival: "Agafay Desert" },
    highlights: [
      { icon: "fa-solid fa-mountain-sun", title: "Off-Road Thrills", desc: "Zoom through stunning, untamed desert landscapes on an exhilarating quad bike ride." },
      { icon: "fa-solid fa-camel", title: "Cultural Immersion", desc: "Step into Moroccan culture with a memorable camel ride across the golden dunes." },
      { icon: "fa-solid fa-sun", title: "Golden Hour Magic", desc: "Witness a breathtaking desert sunset, watching the sky paint itself in vibrant colors far away from city lights." },
      { icon: "fa-solid fa-bowl-food", title: "Authentic Berber Feast", desc: "Indulge in mouthwatering traditional dishes and aromatic spices under a beautiful Berber tent." },
      { icon: "fa-solid fa-star", title: "Starlit Serenity", desc: "Escape the hustle of Marrakech and find true peace in the vast, tranquil beauty of the Agafay wilderness." }
    ],
    timeline: [
      {
        dot: 1,
        title: "The Pool & Camel Trek",
        img: "images/Marrakech/agafay.jpg",
        items: ["Take a dip in our refreshing swimming pool to cool off", "Embrace the rhythm of the desert with a peaceful camel ride", "Feel the gentle sway of your camel in nomadic attire"]
      },
      {
        dot: 2,
        title: "The Quad Adventure",
        img: "images/Marrakech/marrakech_4.webp",
        items: ["Kick things into high gear on a robust ATV", "Race through Agafay’s rugged, rocky terrain", "Find the ultimate vantage point to watch the sunset"]
      },
      {
        dot: 3,
        title: "The Sunset & Dinner Show",
        img: "images/Marrakech/marrakrch_9.jpg",
        items: ["Relax around a warm fire as the sky lights up with vibrant hues", "Enjoy a feast of aromatic Moroccan cuisine under a Berber tent", "Soak in the tranquil desert ambiance with live entertainment"]
      }
    ],
    included: [
      "Round-trip, door-to-door transfers in a climate-controlled 4x4 or minivan",
      "Accompaniment by a friendly, English-speaking guide/driver",
      "Fully equipped and guided ATV/Quad biking session",
      "Traditional camel trekking experience in nomadic attire",
      "Authentic Moroccan dinner accompanied by live entertainment",
      "Complimentary access to our refreshing desert swimming pool"
    ],
    excluded: [
      "Personal purchases",
      "Extra beverages",
      "Optional gratuities"
    ],
    faqs: [
      { q: "Do I need to be an experienced driver to ride the quads?", a: "Not at all! Our expert instructors will give you a full safety briefing and ensure you're totally confident before hitting the trails." },
      { q: "Is this excursion kid-friendly?", a: "Absolutely. Children are more than welcome to join the camel trek and can ride safely as passengers on the quad bikes." },
      { q: "What is the best dress code?", a: "Opt for comfortable, casual clothes and closed-toe shoes. Bring a light jacket as the desert cools down quickly after sunset." },
      { q: "Do I need to pay extra for the meal?", a: "No, your mouthwatering Berber dinner and the evening entertainment are completely covered in your booking price." },
      { q: "Do you cater to vegetarians or food allergies?", a: "Yes, we happily accommodate special dietary needs. Just inform us when booking, and our chefs will prepare a customized menu for you." },
      { q: "What is the total duration of the trip?", a: "Expect the entire adventure to last around 6 hours. This covers your transport, activities, and the dinner experience." },
      { q: "Will there be a huge crowd on the tour?", a: "We deliberately keep our groups small and intimate to ensure a personalized, safe, and premium experience." },
      { q: "How do we get to the Agafay Desert?", a: "We take care of all the driving! You’ll be picked up and dropped off right at your hotel or riad in a modern, comfortable vehicle." },
      { q: "Do I need to be highly physically fit?", a: "This excursion is easygoing and crafted to be accessible for almost everyone. If you have specific limitations, just let us know beforehand." }
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
    title: "Hot Air Balloon Flight",
    img: "images/Marrakech/montgolfiere.webp",
    desc: "Elevate your Marrakech experience—literally. Rise before the sun and take to the skies for a breathtaking hot air balloon flight over the region's stunning landscapes. Float peacefully above crimson desert terrain, lush palm groves, and traditional villages, all set against the backdrop of the High Atlas Mountains.",
    duration: "Sunrise",
    timing: "Early Morning (2h before sunrise)",
    price: "178 EUR",
    gallery: [
      "images/Marrakech/montgolfiere.webp",
      "images/Marrakech/marrakech_15.jpg",
      "images/Marrakech/marrkech_13.jpg"
    ],
    route: { departure: "Marrakech", arrival: "Atlas Sky" },
    highlights: [
      { icon: "fa-solid fa-cloud", title: "Sunrise Magic", desc: "Watch the world wake up from the best vantage point possible as you float gracefully into the dawn." },
      { icon: "fa-solid fa-mountain", title: "Unrivaled Panoramas", desc: "Marvel at unobstructed, birds-eye views of the sprawling Marrakech landscapes and the High Atlas Mountains." },
      { icon: "fa-solid fa-mug-hot", title: "Cultural Breakfast", desc: "Refuel after your flight with a delicious, authentic Berber breakfast in a traditional setting." },
      { icon: "fa-solid fa-certificate", title: "Commemorative Keepsake", desc: "Take home a personalized flight certificate to remember your time in the Moroccan skies." }
    ],
    timeline: [
      {
        dot: 1,
        title: "The Pickup & Preparation",
        img: "images/Marrakech/montgolfiere.webp",
        items: ["Hassle-free pickup from your accommodation in the early hours", "Watch the balloons inflate at the launch site", "Safety briefing from your seasoned pilot"]
      },
      {
        dot: 2,
        title: "The Golden Flight",
        img: "images/Marrakech/marrakech_15.jpg",
        items: ["Ascend as the sun begins to rise over the horizon", "Unobstructed bird's-eye views of red plains and oases", "Enjoy live commentary during the flight"]
      },
      {
        dot: 3,
        title: "Landing & Breakfast",
        img: "images/Marrakech/marrkech_13.jpg",
        items: ["Smooth landing followed by a traditional Berber breakfast", "Personalized certificate ceremony", "Comfortable return transfer to your hotel"]
      }
    ],
    included: [
      "Seamless round-trip transportation (hotel pick-up and drop-off)",
      "Serene, small-group hot air balloon flight with seasoned pilot",
      "Live, engaging commentary during the flight",
      "Traditional Berber breakfast in an authentic nomadic tent",
      "Personalized commemorative flight certificate",
      "Comprehensive insurance for all passengers"
    ],
    excluded: [
      "Optional gratuities",
      "Professional photo packages"
    ],
    faqs: [
      { q: "When exactly will I be picked up?", a: "Since sunrise times change, we confirm the exact time (generally 2h before dawn) prior to your flight." },
      { q: "Is it cold up there?", a: "The early morning air is crisp. We recommend dressing in layers so you can stay warm before the flight." },
      { q: "Is it scary or turbulent?", a: "Not at all! Ballooning is incredibly peaceful and smooth as you move with the wind." }
    ]
  },

  fes_sahara: {
    title: "Grand Moroccan Traverse: 4-Day Fes to Marrakech",
    img: "images/Merzouga/merzouga_1.jpg",
    desc: "Transform your transit between Morocco's most iconic imperial cities into the adventure of a lifetime. Instead of a simple transfer, embark on a captivating 4-day overland journey from Fes to Marrakech, taking you deep into the heart of the Sahara Desert. This carefully curated private tour blends dramatic landscapes, ancient cultures, and spectacular off-the-beaten-path sightseeing.",
    duration: "4 Days / 3 Nights",
    timing: "Departure 07:30 AM",
    price: "On request",
    gallery: [
      "images/Merzouga/merzouga_1.jpg",
      "images/Fes/fes_3.jpg",
      "images/rourge.jpg",
      "images/dads_vally.jpg",
      "images/merzouga_desert.jpg"
    ],
    route: { departure: "Fes", arrival: "Marrakech" },
    highlights: [
      { icon: "fa-solid fa-mountain-sun", title: "Alpine Escapes", desc: "Explore Ifrane, the 'Switzerland of Morocco,' and encounter wild macaques in the ancient cedar forests of Azrou." },
      { icon: "fa-solid fa-sun", title: "Sahara Immersion", desc: "Trek across the golden dunes of Erg Chebbi on camelback during a breathtaking desert sunset." },
      { icon: "fa-solid fa-star", title: "Night Under the Stars", desc: "Sleep in a traditional Berber desert camp nestled in the tranquil Saharan dunes." },
      { icon: "fa-solid fa-water", title: "Canyon Wonders", desc: "Walk through the towering, 600-foot-high rock walls of the Todra Gorges." },
      { icon: "fa-solid fa-landmark", title: "Cinematic History", desc: "Wander through the ancient, mud-brick alleys of Kasbah Ait Benhaddou, a UNESCO World Heritage site famous for Gladiator and Lawrence of Arabia." },
      { icon: "fa-solid fa-road", title: "Mountain Passes", desc: "Traverse the winding, panoramic roads of the High Atlas Mountains via the famous Tizi N'Tichka pass." }
    ],
    timeline: [
      {
        dot: 1,
        title: "Day 1: Fes › Ifrane › Azrou › Midelt › Erfoud › Merzouga",
        img: "images/Fes/fes_3.jpg",
        items: [
          "8:00 AM pickup from your Fes accommodation, heading south into the Middle Atlas Mountains",
          "Stop in Ifrane, the 'Switzerland of Morocco,' and the cedar forests of Azrou to see Barbary macaques",
          "Descend through Midelt, then cruise the spectacular Ziz Valley with its palm groves and ancient kasbahs",
          "Arrive in Merzouga by late afternoon — hotel check-in, relaxing dinner and overnight stay"
        ]
      },
      {
        dot: 2,
        title: "Day 2: Merzouga › Rissani › Khamlia › Erg Chebbi Dunes",
        img: "images/Merzouga/merzouga_1.jpg",
        items: [
          "Visit the historic city of Rissani, birthplace of the Alawite dynasty, with its traditional markets",
          "Experience hypnotic Gnaoua music in the village of Khamlia",
          "Meet your camel caravan and ride across the golden waves of Erg Chebbi at sunset",
          "Arrive at your nomad desert camp for Berber drumming, dinner, and stargazing"
        ]
      },
      {
        dot: 3,
        title: "Day 3: Erg Chebbi › Merzouga › Todra Gorges › Dades Valley",
        img: "images/rourge.jpg",
        items: [
          "Wake early for a majestic desert sunrise painting the dunes in vibrant colors",
          "Trek back to Merzouga edge on camelback, then depart toward Erfoud",
          "Walk through the spectacular Todra Gorges, flanked by massive 600-foot canyon walls",
          "Continue to Dades Valley, passing the 'Monkey Fingers' rock formations — overnight with dinner & breakfast"
        ]
      },
      {
        dot: 4,
        title: "Day 4: Dades Valley › Skoura › Ouarzazate › Ait Benhaddou › Marrakech",
        img: "images/dads_vally.jpg",
        items: [
          "Drive through the Valley of the Roses and Skoura Oasis to Ouarzazate",
          "Explore the magnificent Kasbah Ait Benhaddou — UNESCO site and Hollywood filming location",
          "Scenic ascent over the High Atlas via the famous Tizi N'Tichka pass",
          "Descend into Marrakech, drop-off at your Riad or Hotel"
        ]
      }
    ],
    included: [
      "Private, comfortable, air-conditioned 4x4 or minivan with an English-speaking driver/guide",
      "Door-to-door pick-up from your Fes hotel/Riad and drop-off at your Marrakech hotel/Riad",
      "3 Nights of accommodation (Hotel in Merzouga, Desert Camp in Erg Chebbi, Hotel in Dades Valley)",
      "Half-board meals: 3 Dinners and 3 Breakfasts",
      "Guided sunset and sunrise camel treks in the Erg Chebbi dunes",
      "Sandboarding activity in the desert"
    ],
    excluded: [
      "Mid-day lunches along the route",
      "Additional beverages",
      "Monument or museum entrance fees (if applicable)"
    ],
    pricing: [
      { group: "2", price: "680€" },
      { group: "3", price: "580€" },
      { group: "4", price: "490€" },
      { group: "5", price: "450€" },
      { group: "6", price: "390€" },
      { group: "7", price: "380€" },
      { group: "8 – 10", price: "370€" },
      { group: "11 – 13", price: "320€" },
      { group: "14 – 17", price: "310€" }
    ],
    pricingUpgrade: "✨ Optional Upgrade: Elevate your Sahara experience to a Deluxe Desert Camp (ensuite tent with private bathroom) for an additional €50 per adult.",
    faqs: [
      { q: "Is this a private or shared tour?", a: "This is a fully private tour. Your 4x4 or minivan and driver/guide are exclusively yours for the entire 4-day journey." },
      { q: "What time does the tour depart?", a: "The tour departs at 07:30 AM with a pick-up directly from your Fes accommodation." },
      { q: "Can I upgrade the desert camp?", a: "Yes! You can elevate your Sahara experience to a Deluxe Desert Camp (featuring an ensuite tent with a private bathroom) for an additional €50 per adult." },
      { q: "How long is the camel ride?", a: "The camel trek usually lasts about 1 to 1.5 hours (depending on the season and camp location)." },
      { q: "Can I skip the camel ride?", a: "Yes, a 4x4 transfer to the camp can be arranged if preferred." },
      { q: "Is sandboarding included?", a: "Yes, sandboarding is available at the camp and included in the experience." },
      { q: "Are the bathrooms private at the camp?", a: "Depending on the camp category (standard or luxury), bathrooms may be shared or private." },
      { q: "What should I bring?", a: "Comfortable clothes, sunglasses, sunscreen, scarf for the desert wind, comfortable shoes, and a small overnight bag." }
    ]
  },

  casa_chefchaouen: {
    title: "The Blue Pearl Escape: 2-Day Casablanca to Chefchaouen",
    img: "images/Chfchaouen/chefchaoun.jpg",
    desc: "Leave the hustle and bustle of Casablanca behind for a tranquil, private getaway to one of Morocco's most scenic and enchanting destinations. Nestled high in the rugged Rif Mountains, Chefchaouen—affectionately known as the 'Blue City'—offers a picture-perfect blend of serene vibes, rich history, and captivating local culture.",
    duration: "2 Days / 1 Night",
    timing: "Departure 08:30 AM",
    price: "On request",
    gallery: [
      "images/Casablanca/casablanca.png",
      "images/Chfchaouen/chefchaoun.jpg",
      "images/Chfchaouen/chechaouen_1.jpg",
      "images/Chfchaouen/chefchaouen_2.jpg"
    ],
    route: { departure: "Casablanca", arrival: "Chefchaouen" },
    highlights: [
      { icon: "fa-solid fa-palette", title: "The Blue Labyrinth", desc: "Wander through mesmerizing, winding alleys where every house, staircase, and doorway is painted in calming shades of blue and white." },
      { icon: "fa-solid fa-fort-awesome", title: "Historic Kasbah", desc: "Explore the 15th-century fortress in the heart of the medina, featuring peaceful Andalusian-style gardens and an Ethnographic Museum." },
      { icon: "fa-solid fa-store", title: "Artisan Souks", desc: "Mingle with friendly locals and shop for unique regional crafts, from hand-woven carpets and colorful textiles to beautiful pottery." },
      { icon: "fa-solid fa-mountain", title: "Mountain Serenity", desc: "Breathe in the fresh mountain air at 600 meters altitude, with spectacular views and great walking opportunities." },
      { icon: "fa-solid fa-user-check", title: "Tailored to You", desc: "Enjoy the comfort and flexibility of a private tour, allowing you to customize your itinerary and explore at your own pace." }
    ],
    timeline: [
      {
        dot: 1,
        title: "Day 1: Casablanca to Chefchaouen (Discovering the Blue Medina)",
        img: "images/Chfchaouen/chefchaoun.jpg",
        items: [
          "Morning pick-up from Casablanca, driving north toward the breathtaking Rif Mountains",
          "Arrive in Chefchaouen — see why its Berber name means 'horns,' referencing the twin mountain peaks",
          "Wander the vibrant medina, visit the historic Kasbah and Grand Mosque",
          "Explore endless photography opportunities in the blue-painted alleys",
          "Peaceful night in a traditional Riad in the heart of the Blue City (Dinner included)"
        ]
      },
      {
        dot: 2,
        title: "Day 2: Chefchaouen to Casablanca (Morning Explorations & Return)",
        img: "images/Chfchaouen/chechaouen_1.jpg",
        items: [
          "Traditional Moroccan breakfast at your Riad",
          "Free time to soak up the atmosphere, snap final photos, or pick up souvenirs",
          "Afternoon departure for a comfortable, scenic return journey",
          "Arrive back in Casablanca by ~06:30 PM (Breakfast included)"
        ]
      }
    ],
    included: [
      "Private, air-conditioned transportation (4x4 or Minibus) for the full trip",
      "Professional and friendly English-speaking driver",
      "1 Night accommodation in a charming, traditional Chefchaouen Riad",
      "Meals: 1 Dinner and 1 Breakfast at your Riad",
      "Ample free time to explore the medina and take photos",
      "Instant booking confirmation"
    ],
    excluded: [
      "Mid-day lunches",
      "Local tour guide in Chefchaouen (optional — can be arranged upon request)",
      "Personal expenses and gratuities"
    ],
    faqs: [
      { q: "Is this a private or shared tour?", a: "This is a fully private tour. Your vehicle and driver are exclusively yours for the entire 2-day journey." },
      { q: "What time does the tour depart?", a: "Please arrive at your pick-up point by 08:00 AM for a prompt departure at 08:30 AM." },
      { q: "Is this tour family-friendly?", a: "Yes! This tour is suitable for families with children aged 6 and above." },
      { q: "Can I arrange a local guide in Chefchaouen?", a: "Yes, a local guide can be arranged upon request if you'd like a deeper dive into the city's history." },
      { q: "What should I bring?", a: "Comfortable walking shoes, a camera, sunscreen, and a light jacket as the mountain air can be cool." }
    ]
  },

  marrakech_chefchaouen: {
    title: "Morocco's Grand Contrast: 4-Day Marrakech to Chefchaouen",
    img: "images/Chfchaouen/chefchaouen_2.jpg",
    desc: "Experience the absolute best of Morocco on this epic 4-day journey that connects the red city of Marrakech to the blue pearl of Chefchaouen. This isn't just a transfer; it's a deep dive into the heart of the kingdom. Traverse the high peaks of the Atlas, ride through the golden dunes of the Sahara, and witness the ancient history of Fes before ending in the tranquility of the Rif Mountains.",
    duration: "4 Days / 3 Nights",
    timing: "Departure 08:00 AM",
    price: "On request",
    gallery: [
      "images/Ouarzazat/ouarzazat1.jpeg",
      "images/Merzouga/merzouga_1.jpg",
      "images/Fes/fes_4.jpg",
      "images/Chfchaouen/chechaouen_1.jpg",
      "images/Chfchaouen/chefchaouen_2.jpg"
    ],
    route: { departure: "Marrakech", arrival: "Chefchaouen" },
    highlights: [
      { icon: "fa-solid fa-landmark", title: "UNESCO Wonders", desc: "Step back in time at the ancient Kasbah Ait Benhaddou, a living piece of Moroccan history." },
      { icon: "fa-solid fa-moon", title: "Sahara Magic", desc: "Experience a sunset camel trek across the Erg Chebbi dunes and spend an unforgettable night in a nomad-style desert camp." },
      { icon: "fa-solid fa-fire", title: "Night Under the Stars", desc: "Enjoy a traditional Berber feast and live drum music around a desert campfire." },
      { icon: "fa-solid fa-tree", title: "Nature & Wildlife", desc: "Meet the wild Barbary macaques in the cedar forests of Azrou and explore the 'Little Switzerland' of Ifrane." },
      { icon: "fa-solid fa-mosque", title: "Imperial History", desc: "Discover the labyrinthine streets of the Fes Medina, the world's largest car-free urban space." },
      { icon: "fa-solid fa-droplet", title: "The Blue Pearl", desc: "Conclude your journey in the breathtakingly blue and serene streets of Chefchaouen." }
    ],
    timeline: [
      {
        dot: 1,
        title: "Day 1: Marrakech › Ait Benhaddou › Ouarzazate › Valley of Roses",
        img: "images/Ouarzazat/ouarzazat1.jpeg",
        items: [
          "Depart from Marrakech at 8:00 AM, ascending the Tizi n'Tichka pass (2,260m) in the High Atlas Mountains",
          "Marvel at the Berber villages clinging to the hillsides before arriving at Kasbah Ait Benhaddou",
          "Guided tour and lunch, continue through Ouarzazate—the 'Hollywood of Africa'",
          "Follow the legendary 'Road of a Thousand Kasbahs' to the Valley of Roses. (Dinner included)"
        ]
      },
      {
        dot: 2,
        title: "Day 2: Valley of Roses › Todra Gorges › Merzouga (Sahara)",
        img: "images/Merzouga/merzouga_1.jpg",
        items: [
          "Head to the Dades Valley to admire the unique 'Monkey Toes' rock formations after breakfast",
          "Walk beneath 300-meter-high limestone cliffs at the Todra Gorges",
          "Lunch in Rissani, then arrive in Merzouga to meet your camel caravan",
          "Trek into Erg Chebbi dunes for sunset, night in a traditional camp with stars and music. (Breakfast, Dinner)"
        ]
      },
      {
        dot: 3,
        title: "Day 3: Merzouga › Ziz Valley › Azrou › Ifrane › Fes",
        img: "images/Fes/fes_4.jpg",
        items: [
          "Wake up early for a spectacular desert sunrise, followed by breakfast and a shower",
          "Begin the drive north through the lush Ziz Valley and Middle Atlas Mountains",
          "Stop in Azrou's ancient cedar forests to see monkeys, coffee break in alpine Ifrane",
          "Early evening arrival in the imperial city of Fes for your overnight stay. (Breakfast, Dinner)"
        ]
      },
      {
        dot: 4,
        title: "Day 4: Fes Medina Exploration › Chefchaouen",
        img: "images/Chfchaouen/chechaouen_1.jpg",
        items: [
          "Dive into the rich history of Fes with an optional guide, exploring tanneries and ancient artisan workshops",
          "Traditional lunch in the heart of the world's oldest medina",
          "Head north into the Rif Mountains in the afternoon",
          "Conclude your tour arriving in the mesmerizing 'Blue City' of Chefchaouen. (Breakfast)"
        ]
      }
    ],
    included: [
      "Private, comfortable, air-conditioned vehicle.",
      "Professional English-speaking driver/guide.",
      "3 Nights of accommodation in high-quality Riads, Hotels, and a Desert Camp.",
      "Half-board meals: All Breakfasts and Dinners.",
      "Guided sunset and sunrise camel treks in the Merzouga desert.",
      "All transportation and logistics from Marrakech to Chefchaouen."
    ],
    excluded: [
      "Mid-day lunches.",
      "Beverages and soft drinks.",
      "Monument entrance fees.",
      "Optional gratuities and personal expenses."
    ]
  }
};

/* ---------- CSS Accordion Experience Marrakech (No JS required) ---------- */

/* ---------- Destination Modals ---------- */
window.openModal = function (city, scrollToBooking = false) {
  const modal = document.getElementById("modal-" + city);
  if (!modal) return;

  modal.style.display = "block";
  lockBodyScroll(true);

  // Scroll to booking section if requested
  if (scrollToBooking) {
    const bookingSection = document.getElementById("booking-" + city);
    if (bookingSection) {
      setTimeout(() => {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  // init swiper in this modal
  const selector = "#modal-" + city + " .mySwiper-" + city;
  const swiperEl = document.querySelector(selector);

  if (swiperEl) {
    if (!swiperEl.swiper) {
      new Swiper(selector, {
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: "#modal-" + city + " .swiper-button-next",
          prevEl: "#modal-" + city + " .swiper-button-prev"
        },
        pagination: {
          el: "#modal-" + city + " .swiper-pagination",
          clickable: true
        }
      });
    } else {
      swiperEl.swiper.update();
    }
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
  if (mapEl.dataset.ready === "1") return;
  mapEl.dataset.ready = "1";

  const map = L.map("map", { scrollWheelZoom: false }).setView([32.5, -6.5], 6);

  // Magnificent Premium Map (Esri Satellite - No political borders, just beautiful terrain)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
    maxZoom: 18
  }).addTo(map);

  // Custom marker icon with glow
  const customIcon = L.divIcon({
    className: 'custom-map-marker glowing',
    html: '<div class="marker-pulse"></div><div class="marker-pin"><i class="fa-solid fa-location-dot"></i></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22]
  });

  const cities = [
    { name: "Marrakech", id: "marrakech", coords: [31.6295, -7.9811], img: "images/Marrakech/Marrakech.jpg", desc: "Imperial city with unique charm and vibrant souks." },
    { name: "Fès", id: "fes", coords: [34.0333, -5.0], img: "images/Fes/Fes.jpg", desc: "Oldest medina in the world, a UNESCO treasure." },
    { name: "Chefchaouen", id: "chefchaouen", coords: [35.1688, -5.2636], img: "images/Chfchaouen/chefchaoun.jpg", desc: "The blue pearl of Morocco, nestled in the Rif." },
    { name: "Essaouira", id: "essaouira", coords: [31.5085, -9.7595], img: "images/Essaouira/essaouira_1.jpg", desc: "Atlantic coastal gem with art and Gnaoua music." },
    { name: "Merzouga", id: "merzouga", coords: [31.0994, -4.0127], img: "images/Merzouga/merzouga_1.jpg", desc: "Gateway to the golden Erg Chebbi Sahara dunes." },

    { name: "Ouarzazate", id: "ouarzazate", coords: [30.9189, -6.8936], img: "images/Ouarzazat/ouarzazat1.jpeg", desc: "Hollywood of Africa, gateway to the Sahara." },
    { name: "Casablanca", id: "casablanca", coords: [33.5731, -7.5898], img: "images/Casablanca/casablanca.png", desc: "Morocco's economic capital with the iconic Hassan II Mosque." },
    { name: "Agadir", id: "agadir", coords: [30.4278, -9.5981], img: "images/Agadir/agadir_hero.png", desc: "Coastal breeze to the Capital of Culture." },
    { name: "Zagora", id: "zagora", coords: [30.3324, -5.8384], img: "images/Zagora/zagora_hero.png", desc: "The gateway to the immense Draa Valley." }
  ];

  cities.forEach((c) => {
    const popupContent = `
      <img src="${c.img}" class="map-popup-img" alt="${c.name}">
      <div class="map-popup-body">
        <strong>${c.name}</strong>
        <p>${c.desc}</p>
        <button class="map-popup-btn" onclick="closeMapPopupAndOpen('${c.id}')">Explore →</button>
      </div>
    `;
    const marker = L.marker(c.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent, { maxWidth: 260, closeButton: true, className: 'premium-popup' });
      
    marker.on('click', function() {
      // Calculate an offset so the map center is slightly above the marker, making room for the popup
      const targetZoom = 8;
      const targetPoint = map.project(c.coords, targetZoom);
      targetPoint.y -= 130; // Shift center 130px UP -> Marker moves DOWN
      const offsetLatLng = map.unproject(targetPoint, targetZoom);

      map.flyTo(offsetLatLng, targetZoom, {
        animate: true,
        duration: 1.5,
        easeLinearity: 0.1
      });
    });
  });
  // Beautiful uniform tour route lines (Golden style)
  const routeCoords = [
    // Fes → Marrakech
    [[34.0333, -5.0], [33.0, -4.5], [31.0994, -4.0127], [31.5, -5.5], [31.6295, -7.9811]],
    // Casablanca → Chefchaouen
    [[33.5731, -7.5898], [34.5, -6.0], [35.1688, -5.2636]],
    // Marrakech → Chefchaouen
    [[31.6295, -7.9811], [30.9189, -6.8936], [31.0994, -4.0127], [34.0333, -5.0], [35.1688, -5.2636]],
    // Marrakech → Essaouira
    [[31.6295, -7.9811], [31.5085, -9.7595]],
    // Marrakech → Zagora
    [[31.6295, -7.9811], [30.9189, -6.8936], [30.3324, -5.8384]],
    // Agadir → Fes
    [[30.4278, -9.5981], [30.9189, -6.8936], [31.0994, -4.0127], [34.0333, -5.0]]
  ];

  routeCoords.forEach(coords => {
    // Background shadow/casing line for better visibility on the map
    L.polyline(coords, {
      color: '#000',
      weight: 4,
      opacity: 0.3,
      lineJoin: 'round'
    }).addTo(map);

    // Foreground beautiful animated dashed line
    L.polyline(coords, {
      color: '#F39C12', // Golden accent
      weight: 2,
      opacity: 0.9,
      className: 'animated-route',
      lineJoin: 'round'
    }).addTo(map);
  });

  setTimeout(() => map.invalidateSize(), 300);
}

// Helper: close map popup and open city modal
window.closeMapPopupAndOpen = function(cityId) {
  document.querySelector('.leaflet-popup-close-button')?.click();
  setTimeout(() => {
    window.location.href = `destinations.html#${cityId}`;
  }, 200);
};

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

  if (Number(adults) < 2) {
    alert("Please note that our tours require a minimum of 2 participants.");
    return;
  }

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

// Handler for destination-specific forms
window.sendDestinationWhatsApp = function (city) {
  const modal = document.getElementById("modal-" + city);
  if (!modal) return;

  const name = modal.querySelector('.dest-name')?.value;
  const date = modal.querySelector('.dest-date')?.value;
  const adults = modal.querySelector('.dest-adults')?.value;
  const children = modal.querySelector('.dest-children')?.value;

  if (!name || !date || !adults) {
    alert("Please fill in all required fields.");
    return;
  }

  if (Number(adults) < 2) {
    alert("Booking is valid starting from 2 people. Please adjust your participant count.");
    return;
  }

  const text = `Hello 👋
I would like to book a trip to ${city.toUpperCase()}:

👤 Name: ${name}
📅 Date: ${date}
👨‍👩‍👧 Adults: ${adults}
🧒 Children: ${children || 0}

Thank you!`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
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

  // Enforce 2 participants minimum for adults
  const minAdults = 2;
  if (type === "adults") v = Math.max(minAdults, v);
  if (type === "children") v = Math.max(0, v);

  input.value = v;
  calcTotal();
};

window.bookNow = function () {
  if (!CURRENT_EXP_KEY) return;
  const exp = EXPERIENCES[CURRENT_EXP_KEY];

  const date = document.getElementById("bookDate")?.value || "";
  const adults = document.getElementById("qtyAdults")?.value || "2";
  const children = document.getElementById("qtyChildren")?.value || "0";

  if (!date) {
    alert("Please select a date.");
    return;
  }

  if (Number(adults) < 2) {
    alert("Booking is valid starting from 2 people.");
    return;
  }

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
  const swiperEl = document.getElementById("expSwiper");
  const wrapper = document.getElementById("expSwiperWrapper");

  // Gallery Swiper Handle
  if (exp.gallery && exp.gallery.length > 0) {
    img.style.display = "none";
    swiperEl.style.display = "block";
    wrapper.innerHTML = exp.gallery.map(src => `
      <div class="swiper-slide">
        <img src="${src}" style="width:100%; height:100%; object-fit:cover;">
      </div>
    `).join('');
    
    // Quick timeout to ensure DOM is ready
    setTimeout(() => {
      try {
        if (window.modalSwiper) {
          window.modalSwiper.destroy(true, true);
        }
        window.modalSwiper = new Swiper("#expSwiper", {
          loop: exp.gallery && exp.gallery.length > 1,
          pagination: { el: "#expSwiper .swiper-pagination", clickable: true },
          navigation: { 
            nextEl: "#expSwiper .swiper-button-next", 
            prevEl: "#expSwiper .swiper-button-prev" 
          },
          observer: true,
          observeParents: true,
          autoplay: exp.gallery && exp.gallery.length > 1 ? { delay: 5000, disableOnInteraction: false } : false
        });
      } catch (err) {
        console.error("Swiper init error:", err);
      }
    }, 200);
  } else {
    swiperEl.style.display = "none";
    img.style.display = "block";
    img.src = exp.img || "";
    img.alt = exp.title || "";
  }

  document.getElementById("expDuration").textContent = "⏱ " + exp.duration;

  // --- STRUCTURED UI LOGIC ---
  const oldPanelsEl = document.getElementById("expOldPanels");
  const highlightsEl = document.getElementById("expHighlights");
  const itineraryEl = document.getElementById("expItinerary");
  const metaEl = document.getElementById("expMeta");
  const faqSection = document.getElementById("expFaqSection");

  if (exp.highlights || exp.timeline || exp.included || exp.faqs) {
    oldPanelsEl.style.display = "none";

    // Highlights
    if (exp.highlights) {
      highlightsEl.style.display = "block";
      document.getElementById("expHighlightsGrid").innerHTML = exp.highlights.map(h => `
        <div class="highlight-card">
          <i class="${h.icon}"></i>
          <div>
            <strong>${h.title}</strong>
            <p>${h.desc}</p>
          </div>
        </div>
      `).join('');
    } else {
      highlightsEl.style.display = "none";
    }

    // Itinerary (Timeline)
    if (exp.timeline) {
      itineraryEl.style.display = "block";
      document.getElementById("expTimeline").innerHTML = exp.timeline.map(it => `
        <div class="timeline-item">
          <div class="timeline-dot">${it.dot}</div>
          <div class="timeline-content">
            <img src="${it.img}" class="timeline-img" alt="${it.title}">
            <h4>${it.title}</h4>
            <ul>${it.items.map(li => `<li>${li}</li>`).join('')}</ul>
          </div>
        </div>
      `).join('');
      
      // Route Section
      const routeEl = document.getElementById("expRoute");
      if (exp.route) {
        routeEl.style.display = "flex";
        document.getElementById("expRouteDep").textContent = exp.route.departure;
        document.getElementById("expRouteArr").textContent = exp.route.arrival;
      } else {
        routeEl.style.display = "none";
      }
    } else {
      itineraryEl.style.display = "none";
    }

    // Meta (Included / Excluded)
    if (exp.included) {
      metaEl.style.display = "block";
      document.getElementById("expIncList").innerHTML = exp.included.map(i => `<li>${i}</li>`).join('');
      const excContainer = document.getElementById("expExcContainer");
      if (exp.excluded && exp.excluded.length > 0) {
        excContainer.style.display = "block";
        document.getElementById("expExcList").innerHTML = exp.excluded.map(e => `<li>${e}</li>`).join('');
      } else {
        excContainer.style.display = "none";
      }
    } else {
      metaEl.style.display = "none";
    }

    // Pricing Table
    const pricingEl = document.getElementById("expPricing");
    if (exp.pricing && exp.pricing.length > 0) {
      pricingEl.style.display = "block";
      document.getElementById("expPricingBody").innerHTML = exp.pricing.map(p => `
        <tr><td>${p.group}</td><td>${p.price}</td></tr>
      `).join('');
      const upgradeEl = document.getElementById("expPricingUpgrade");
      if (exp.pricingUpgrade) {
        upgradeEl.textContent = exp.pricingUpgrade;
        upgradeEl.style.display = "block";
      } else {
        upgradeEl.style.display = "none";
      }
    } else {
      pricingEl.style.display = "none";
    }

    // FAQs
    if (exp.faqs) {
      faqSection.style.display = "block";
      document.getElementById("expFaqList").innerHTML = exp.faqs.map(f => `
        <div class="faq-item">
          <h5>${f.q}</h5>
          <p>${f.a}</p>
        </div>
      `).join('');
    } else {
      faqSection.style.display = "none";
    }

  } else {
    // Falls back to old simple program/activities layout
    oldPanelsEl.style.display = "flex";
    highlightsEl.style.display = "none";
    itineraryEl.style.display = "none";
    metaEl.style.display = "none";
    faqSection.style.display = "none";
    document.getElementById("expPricing").style.display = "none";

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

  // close destination booking modal
  const dbModal = document.getElementById("destBookingModal");
  if (dbModal && dbModal.style.display === "flex") {
    window.closeDestBooking();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    lockBodyScroll(false);
  }
  if (e.target.id === "destBookingModal") {
    window.closeDestBooking();
  }
});


/* ---------- On load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initScrollReveal();
  initStatCounters();

  // Move all modals to body to prevent transform/z-index stacking context bugs
  document.querySelectorAll('.modal, .exp-modal, .dest-booking-modal-overlay').forEach(modal => {
    document.body.appendChild(modal);
  });

  // Close mobile menu when a link is clicked
  const navLinksList = document.querySelectorAll('.nav-links a, .hn-links a');
  const navContainer = document.querySelector('.nav-links');
  const hnContainer = document.querySelector('.hn-links');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if(navContainer) navContainer.classList.remove('active');
      if(hnContainer) hnContainer.classList.remove('hn-links-open');
    });
  });
});

/* ---------- Scroll Reveal Animation ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // Navbar scroll effect
  const nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }
}

/* ---------- Animated Stat Counters ---------- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ---------- Mobile Menu ---------- */
window.toggleMobileMenu = function() {
  const navLinks = document.querySelector('.nav-links');
  if(navLinks) {
    navLinks.classList.toggle('active');
  }
  const hnLinks = document.querySelector('.hn-links');
  if(hnLinks) {
    hnLinks.classList.toggle('hn-links-open');
  }
};


/* ---------- Global Destination Booking Logic ---------- */
const DEST_IMAGES = {
  "Marrakech": "images/Marrakech/Marrakech.jpg",
  "Ouarzazate": "images/Ouarzazat/ouarzazat1.jpeg",
  "Merzouga": "images/Merzouga/merzouga_1.jpg",
  "Chefchaouen": "images/Chfchaouen/chefchaoun.jpg",
  "Essaouira": "images/Essaouira/essaouira_1.jpg",
  "Fes": "images/Fes/Fes.jpg",
  "Casablanca": "images/Casablanca/casablanca.png",
  "Agadir": "images/Agadir/agadir_hero.png",
  "Zagora": "images/Zagora/zagora_hero.png"
};

window.openDestBooking = function(city) {
  const modal = document.getElementById("destBookingModal");
  if (!modal) return;
  
  // Fill content
  document.getElementById("destBookingTitle").textContent = city + " Expedition";
  const img = document.getElementById("destBookingImg");
  if (img && DEST_IMAGES[city]) {
    img.src = DEST_IMAGES[city];
  }

  // Handle Fès Special Promotions visibility
  const fesPromo = document.getElementById("fesPromoBlock");
  if (fesPromo) {
    fesPromo.style.display = (city === "Fes") ? "block" : "none";
  }
  
  // Reset form
  document.getElementById("db-name").value = "";
  document.getElementById("db-email").value = "";
  document.getElementById("db-phone").value = "";
  document.getElementById("db-date").value = "";
  document.getElementById("db-adults").value = 2;
  document.getElementById("db-children").value = 0;
  document.getElementById("db-message").value = "";
  
  modal.style.display = "flex";
  lockBodyScroll(true);
};

window.closeDestBooking = function() {
  const modal = document.getElementById("destBookingModal");
  if (modal) modal.style.display = "none";
  lockBodyScroll(false);
};


window.sendDestBookingWhatsApp = function() {
  const cityTitle = document.getElementById("destBookingTitle").textContent;
  const name = document.getElementById("db-name").value;
  const date = document.getElementById("db-date").value;
  const adults = document.getElementById("db-adults").value;
  const children = document.getElementById("db-children").value;
  const message = document.getElementById("db-message").value;
  
  if (!name || !date) {
    alert("Please fill in your name and preferred date.");
    return;
  }
  
  const text = `Hello 👋
I am interested in booking:
✅ Destination: ${cityTitle}
👤 Name: ${name}
📅 Date: ${date}
👥 Adults: ${adults}
🧒 Children: ${children}
📝 Message: ${message || "N/A"}

Thank you!`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
};
