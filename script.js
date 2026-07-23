/* ==========================================================================
   HIDDEN MOROCCO — PLATFORM CORE ENGINE (script.js)
   Terracotta & Sahara Gold Theme, Wishlist, Language Switcher, Maps, Search
   ========================================================================== */

// ── Application State ──────────────────────────────────────────────────────
const AppState = {
  theme: localStorage.getItem('hm_theme') || 'light',
  lang: localStorage.getItem('hm_lang') || 'en',
  favorites: JSON.parse(localStorage.getItem('hm_favorites') || '[]'),
  mapInstance: null,
  mapMarkers: []
};

// ── Destination Database (Verified Image Paths) ──────────────────────────
const DESTINATIONS_DB = [
  {
    id: "marrakech",
    title: "Marrakech Medina & Palaces",
    region: "Marrakech-Safi",
    category: "medina",
    price: 180,
    currency: "EUR",
    rating: 4.9,
    reviewsCount: 340,
    img: "images/Marrakech/marrakech_11.jpg",
    badge: "Popular",
    desc: "Step into the heartbeat of Morocco. Explore bustling souks, hidden riads, Jemaa el-Fnaa square, and the Majorelle Garden.",
    lat: 31.6295,
    lng: -7.9811,
    highlights: ["Jemaa el-Fnaa Square", "Bahia Palace & Saadian Tombs", "Majorelle & YSL Museum", "Spice Souks Walking Tour"],
    itinerary: [
      { day: "Day 1", text: "Arrival & Rooftop Tea overlooking Jemaa el-Fnaa" },
      { day: "Day 2", text: "Guided Medina & Bahia Palace Architectural Tour" },
      { day: "Day 3", text: "Jardin Majorelle & Traditional Moroccan Spa/Hammam" }
    ]
  },
  {
    id: "merzouga",
    title: "Merzouga Sahara Desert",
    region: "Draâ-Tafilalet",
    category: "desert",
    price: 290,
    currency: "EUR",
    rating: 5.0,
    reviewsCount: 420,
    img: "images/Merzouga/merzouga_1.jpg",
    badge: "Bucket List",
    desc: "Experience pure magic among golden dunes. Ride camels at sunset, sleep in a luxury Berber tent, and marvel at the Milky Way.",
    lat: 31.0992,
    lng: -4.0116,
    highlights: ["Sunset & Sunrise Camel Trek", "Luxury Desert Camp with Private Bathroom", "Berber Drumming & Campfire", "Erg Chebbi Sandboarding"],
    itinerary: [
      { day: "Day 1", text: "Drive through High Atlas & Dades Gorge" },
      { day: "Day 2", text: "Sunset Camel Ride into Erg Chebbi Dunes" },
      { day: "Day 3", text: "Stargazing & Traditional Gnawa Music" }
    ]
  },
  {
    id: "chefchaouen",
    title: "Chefchaouen Blue Pearl",
    region: "Tanger-Tetouan-Al Hoceima",
    category: "mountain",
    price: 150,
    currency: "EUR",
    rating: 4.8,
    reviewsCount: 290,
    img: "images/Chfchaouen/chefchaoun.jpg",
    badge: "Photogenic",
    desc: "Wander through world-famous cobalt blue alleyways nestled in the Rif Mountains. Unwind in relaxed cafes and artisan shops.",
    lat: 35.1716,
    lng: -5.2697,
    highlights: ["Photogenic Blue Medina", "Spanish Mosque Sunset View", "Ras El-Maa Waterfalls", "Rif Mountain Trekking"],
    itinerary: [
      { day: "Day 1", text: "Arrival in Blue Pearl & Kasbah Exploration" },
      { day: "Day 2", text: "Hike to Spanish Mosque for Panoramic Views" }
    ]
  },
  {
    id: "essaouira",
    title: "Essaouira Coastal Escape",
    region: "Marrakech-Safi",
    category: "coastal",
    price: 160,
    currency: "EUR",
    rating: 4.9,
    reviewsCount: 215,
    img: "images/Essaouira/essaouira_1.jpg",
    badge: "Relaxing",
    desc: "Breathe in Atlantic coastal ocean breezes, historic sea ramparts, fresh grilled seafood, and bohemian art galleries.",
    lat: 31.5125,
    lng: -9.7700,
    highlights: ["18th-century Skala Ramparts", "Fresh Port Seafood Grill", "Kitesurfing & Beach Walk", "Argan Oil Cooperative"],
    itinerary: [
      { day: "Day 1", text: "Ramparts Stroll & Sunset Port Dining" },
      { day: "Day 2", text: "Argan Forest & Beach Horse Riding" }
    ]
  },
  {
    id: "ouarzazate",
    title: "Ouarzazate & Ait Benhaddou",
    region: "Draâ-Tafilalet",
    category: "desert",
    price: 210,
    currency: "EUR",
    rating: 4.8,
    reviewsCount: 180,
    img: "images/Ouarzazat/ouarzazat1.jpeg",
    badge: "UNESCO",
    desc: "Explore Morocco's Hollywood. Visit ancient earthen Kasbahs, UNESCO World Heritage fortress walls, and desert film studios.",
    lat: 30.9189,
    lng: -6.8934,
    highlights: ["Ait Benhaddou UNESCO Kasbah", "Atlas Cinema Studios", "Taourirt Kasbah Palace", "Ounila Valley Scenic Drive"],
    itinerary: [
      { day: "Day 1", text: "Ait Benhaddou Guided Walk & Movie Set Tour" },
      { day: "Day 2", text: "Kasbah Taourirt & Oasis Exploration" }
    ]
  },
  {
    id: "fes",
    title: "Fes El Bali Ancient Medina",
    region: "Fès-Meknès",
    category: "medina",
    price: 195,
    currency: "EUR",
    rating: 4.9,
    reviewsCount: 310,
    img: "images/Fes/fes_1.jpg",
    badge: "Heritage",
    desc: "Journey back in time in the world's largest car-free urban area. Discover Chouara Tanneries, Al-Qarawiyyin University, and intricate zellij tiles.",
    lat: 34.0333,
    lng: -5.0000,
    highlights: ["Chouara Leather Tanneries", "Al-Qarawiyyin Library", "Bou Inania Medersa", "Ceramic & Pottery Workshops"],
    itinerary: [
      { day: "Day 1", text: "Tanneries Tour & Ancient Souk Exploration" },
      { day: "Day 2", text: "Bab Boujeloud Gate & Pottery Crafting" }
    ]
  }
];

// ── Multi-Language Translation Dictionary ─────────────────────────────────
const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_destinations: "Destinations",
    nav_map: "Interactive Map",
    nav_about: "About Us",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    nav_favorites: "Wishlist",
    nav_book: "Book Expedition",
    hero_title: "Morocco Is Not Just A Destination. It's A Feeling.",
    hero_sub: "Discover hidden kasbahs, silent desert mornings under starry skies, and ancient medinas crafted by local storytellers.",
    search_placeholder: "Where to? e.g. Sahara, Chefchaouen",
    search_btn: "Explore Destinations",
    stats_routes: "Custom Routes",
    stats_travelers: "Happy Travelers",
    stats_destinations: "Iconic Destinations",
    stats_satisfaction: "Satisfaction Rate",
    why_title: "Why Hidden Morocco?",
    why_sub: "Handcrafted boutique private journeys tailored to your rhythm."
  },
  fr: {
    nav_home: "Accueil",
    nav_destinations: "Destinations",
    nav_map: "Carte Interactive",
    nav_about: "À Propos",
    nav_reviews: "Avis Clients",
    nav_contact: "Contact",
    nav_favorites: "Favoris",
    nav_book: "Réserver",
    hero_title: "Le Maroc N'est Pas Une Destination. C'est Une Émotion.",
    hero_sub: "Découvrez des kasbahs secrètes, des matins du désert étoilés et des médinas séculaires guidés par nos passionnés.",
    search_placeholder: "Où souhaitez-vous aller ? ex: Sahara, Chefchaouen",
    search_btn: "Rechercher",
    stats_routes: "Itinéraires Sur-Mesure",
    stats_travelers: "Voyageurs Comblés",
    stats_destinations: "Destinations Emblématiques",
    stats_satisfaction: "Taux de Satisfaction",
    why_title: "Pourquoi Hidden Morocco ?",
    why_sub: "Voyages privés d'exception conçus sur-mesure selon vos envies."
  },
  es: {
    nav_home: "Inicio",
    nav_destinations: "Destinos",
    nav_map: "Mapa Interactivo",
    nav_about: "Sobre Nosotros",
    nav_reviews: "Opiniones",
    nav_contact: "Contacto",
    nav_favorites: "Deseos",
    nav_book: "Reservar Ahora",
    hero_title: "Marruecos No Es Solo Un Destino. Es Una Emoción.",
    hero_sub: "Descubre alcazabas ocultas, mañanas desérticas bajo las estrellas y medinas históricas de la mano de guías locales.",
    search_placeholder: "¿A dónde quieres ir? ej: Sahara, Chefchaouen",
    search_btn: "Buscar Destinos",
    stats_routes: "Rutas Personalizadas",
    stats_travelers: "Viajeros Felices",
    stats_destinations: "Destinos Icónicos",
    stats_satisfaction: "Tasa de Satisfacción",
    why_title: "¿Por Qué Hidden Morocco?",
    why_sub: "Viajes privados exclusivos diseñados a la medida de tus sueños."
  }
};

// ── DOM Content Loaded Initialization ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initWishlistBadge();
  initBackToTop();
  initStickyNav();
  initSearchEngine();
  initCounters();
  initScrollReveal();

  if (document.getElementById('interactiveMap')) {
    initMapPage();
  }
  if (document.getElementById('homeMapPreview')) {
    initHomeMapPreview();
  }
  if (document.getElementById('destinationsGrid')) {
    renderDestinationsGrid();
  }
  if (document.getElementById('favoritesGrid')) {
    renderFavoritesGrid();
  }
});

// ── Theme Engine (Light / Dark Mode) ───────────────────────────────────────
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  updateThemeIcon();

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('hm_theme', AppState.theme);
      document.documentElement.setAttribute('data-theme', AppState.theme);
      updateThemeIcon();
      showToast(`Switched to ${AppState.theme.toUpperCase()} mode ✨`);
    });
  });
}

function updateThemeIcon() {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = AppState.theme === 'dark' 
      ? '<i class="fa-solid fa-sun" style="color: var(--hm-gold);"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  });
}

// ── Language Switcher Engine ───────────────────────────────────────────────
function initLanguage() {
  const langSelect = document.getElementById('langSwitcher');
  if (langSelect) {
    langSelect.value = AppState.lang;
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
  applyTranslations();
}

function setLanguage(langKey) {
  if (!TRANSLATIONS[langKey]) return;
  AppState.lang = langKey;
  localStorage.setItem('hm_lang', langKey);
  applyTranslations();
  showToast(`Language set to ${langKey.toUpperCase()}`);
}

function applyTranslations() {
  const dict = TRANSLATIONS[AppState.lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
}

// ── Wishlist / Favorites Engine ────────────────────────────────────────────
function isFavorite(id) {
  return AppState.favorites.includes(id);
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  const idx = AppState.favorites.indexOf(id);
  if (idx > -1) {
    AppState.favorites.splice(idx, 1);
    showToast("Removed from Wishlist ❤️");
  } else {
    AppState.favorites.push(id);
    showToast("Added to Wishlist! ✨");
  }
  localStorage.setItem('hm_favorites', JSON.stringify(AppState.favorites));
  initWishlistBadge();

  document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('is-active', isFavorite(id));
    btn.innerHTML = isFavorite(id) ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
  });

  if (document.getElementById('favoritesGrid')) {
    renderFavoritesGrid();
  }
}

function initWishlistBadge() {
  const count = AppState.favorites.length;
  document.querySelectorAll('.fav-count-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// ── Floating Back-to-Top Button Engine ─────────────────────────────────────
function initBackToTop() {
  let btn = document.getElementById('backToTop');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.setAttribute('aria-label', 'Back to Top');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);
  }

  const toggleVisibility = () => {
    if (window.scrollY > 350) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Sticky Navigation Scroll Effect ─────────────────────────────────────────
function initStickyNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('glass-nav');
    } else {
      nav.classList.remove('glass-nav');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

window.toggleMobileMenu = function() {
  const menu = document.querySelector('.hn-links, .nav-links');
  if (menu) {
    menu.classList.toggle('hn-links-open');
    menu.classList.toggle('active');
  }
};

// ── Live Destination Search Engine ─────────────────────────────────────────
function initSearchEngine() {
  const input = document.getElementById('heroSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length === 0) {
      renderDestinationsGrid();
      return;
    }
    const filtered = DESTINATIONS_DB.filter(d => 
      d.title.toLowerCase().includes(query) || 
      d.desc.toLowerCase().includes(query) ||
      d.region.toLowerCase().includes(query)
    );
    renderDestinationsGrid(filtered);
  });
}

// ── Animated Number Counters Engine ────────────────────────────────────────
function initCounters() {
  const statElements = document.querySelectorAll('.stat-num, .stat-number');
  if (statElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let start = 0;
        const duration = 1800;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
          start += Math.ceil(target / 40);
          if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = start;
          }
        }, stepTime);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statElements.forEach(el => observer.observe(el));
}

// ── Dynamic Destinations Card Generator ────────────────────────────────────
function createCardHTML(dest) {
  const favActive = isFavorite(dest.id);
  return `
    <div class="glass-panel hover-lift" style="border-radius: var(--hm-radius-lg); overflow: hidden; position: relative; background: var(--hm-bg-card);">
      <div style="position: relative; height: 230px; overflow: hidden;">
        <img src="${dest.img}" alt="${dest.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
        <span class="badge badge-gold" style="position: absolute; top: 16px; left: 16px; backdrop-filter: blur(8px);">✦ ${dest.badge}</span>
        <button class="fav-btn ${favActive ? 'is-active' : ''}" data-id="${dest.id}" onclick="toggleFavorite('${dest.id}', event)" style="position: absolute; top: 16px; right: 16px;" aria-label="Add to Wishlist">
          <i class="fa-${favActive ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>

      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--hm-terracotta); text-transform: uppercase; letter-spacing: 0.5px;">${dest.region}</span>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 0.85rem; font-weight: 700; color: var(--hm-text-heading);">
            <i class="fa-solid fa-star" style="color: var(--hm-gold);"></i> ${dest.rating}
          </div>
        </div>

        <h3 style="font-family: var(--hm-font-serif); font-size: 1.45rem; margin-bottom: 10px;">${dest.title}</h3>
        <p style="font-size: 0.92rem; color: var(--hm-text-muted); line-height: 1.6; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${dest.desc}</p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--hm-border); padding-top: 16px;">
          <div>
            <span style="font-size: 0.78rem; color: var(--hm-text-muted);">From</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--hm-text-heading);">€${dest.price}</div>
          </div>
          <a href="destinations.html#${dest.id}" class="btn-primary" style="padding: 10px 22px; font-size: 0.88rem;">Explore <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  `;
}

function renderDestinationsGrid(list = DESTINATIONS_DB) {
  const container = document.getElementById('destinationsGrid');
  if (!container) return;
  container.innerHTML = list.map(createCardHTML).join('');
}

function renderFavoritesGrid() {
  const container = document.getElementById('favoritesGrid');
  if (!container) return;

  const saved = DESTINATIONS_DB.filter(d => isFavorite(d.id));
  if (saved.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
        <i class="fa-regular fa-heart" style="font-size: 3.5rem; color: var(--hm-text-muted); margin-bottom: 20px;"></i>
        <h3 style="font-family: var(--hm-font-serif); font-size: 1.8rem; margin-bottom: 12px;">Your Wishlist is Empty</h3>
        <p style="color: var(--hm-text-muted); margin-bottom: 28px;">Explore our handcrafted Moroccan expeditions and tap the heart icon to save your dream journeys.</p>
        <a href="destinations.html" class="btn-primary">Explore Destinations <i class="fa-solid fa-compass"></i></a>
      </div>
    `;
  } else {
    container.innerHTML = saved.map(createCardHTML).join('');
  }
}

// ── Toast Notification System ──────────────────────────────────────────────
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = `
      position: fixed; bottom: 30px; right: 30px; z-index: 99999;
      display: flex; flex-direction: column; gap: 10px; pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'glass-panel';
  toast.style.cssText = `
    padding: 14px 22px; border-radius: var(--hm-radius-md); font-weight: 600;
    font-size: 0.9rem; color: var(--hm-text-heading); box-shadow: var(--hm-shadow-lg);
    border-left: 4px solid var(--hm-terracotta); pointer-events: auto; animation: toast-in 0.35s ease;
  `;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Interactive Leaflet Map Engine ─────────────────────────────────────────
function initMapPage() {
  const mapElement = document.getElementById('interactiveMap');
  if (!mapElement || typeof L === 'undefined') return;

  AppState.mapInstance = L.map('interactiveMap').setView([31.7917, -7.0926], 6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 18
  }).addTo(AppState.mapInstance);

  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background: var(--hm-terracotta); width: 28px; height: 28px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 12px rgba(192,57,43,0.5); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px;"><i class="fa-solid fa-location-dot"></i></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  DESTINATIONS_DB.forEach(dest => {
    const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(AppState.mapInstance);
    
    marker.bindPopup(`
      <div style="padding: 6px; font-family: var(--hm-font-sans);">
        <img src="${dest.img}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
        <h4 style="margin: 0 0 4px; font-size: 1rem; font-family: var(--hm-font-serif);">${dest.title}</h4>
        <p style="margin: 0 0 8px; font-size: 0.8rem; color: #64748B;">${dest.region} • €${dest.price}</p>
        <a href="destinations.html#${dest.id}" style="background: var(--hm-terracotta); color: #fff; text-decoration: none; padding: 6px 12px; border-radius: 99px; font-size: 0.8rem; font-weight: 600; display: block; text-align: center;">View Experience</a>
      </div>
    `, { maxWidth: 220 });

    AppState.mapMarkers.push(marker);
  });
}

function initHomeMapPreview() {
  const mapElement = document.getElementById('homeMapPreview');
  if (!mapElement || typeof L === 'undefined') return;

  const miniMap = L.map('homeMapPreview', { zoomControl: false, dragging: false, scrollWheelZoom: false }).setView([31.7917, -7.0926], 6);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(miniMap);

  DESTINATIONS_DB.forEach(dest => {
    L.circleMarker([dest.lat, dest.lng], {
      radius: 7,
      fillColor: '#C0392B',
      color: '#FFFFFF',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(miniMap);
  });
}

// ── Legacy Modal Helpers (Preserved for Untouched destinations.html) ───────
function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

window.openModal = function(city, scrollToBooking = false) {
  const modal = document.getElementById('modal-' + city);
  if (!modal) return;
  modal.style.display = 'block';
  lockBodyScroll(true);

  if (scrollToBooking) {
    const bookingSection = document.getElementById('booking-' + city);
    if (bookingSection) {
      setTimeout(() => bookingSection.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }

  const selector = '#modal-' + city + ' .mySwiper-' + city;
  const swiperEl = document.querySelector(selector);
  if (swiperEl && typeof Swiper !== 'undefined') {
    if (!swiperEl.swiper) {
      new Swiper(selector, {
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '#modal-' + city + ' .swiper-button-next',
          prevEl: '#modal-' + city + ' .swiper-button-prev'
        },
        pagination: {
          el: '#modal-' + city + ' .swiper-pagination',
          clickable: true
        }
      });
    } else {
      swiperEl.swiper.update();
    }
  }
};

window.closeModal = function(city) {
  const modal = document.getElementById('modal-' + city);
  if (!modal) return;
  modal.style.display = 'none';
  lockBodyScroll(false);
};

const DEST_IMAGES = {
  'Marrakech':   'images/Marrakech/Marrakech.jpg',
  'Ouarzazate':  'images/Ouarzazat/ouarzazat1.jpeg',
  'Merzouga':    'images/Merzouga/merzouga_1.jpg',
  'Chefchaouen': 'images/Chfchaouen/chefchaoun.jpg',
  'Essaouira':   'images/Essaouira/essaouira_1.jpg',
  'Fes':         'images/Fes/Fes.jpg',
  'Casablanca':  'images/Casablanca/casablanca.png',
  'Agadir':      'images/Agadir/agadir_hero.png',
  'Zagora':      'images/Zagora/zagora_hero.png'
};

window.openDestBooking = function(city) {
  const modal = document.getElementById('destBookingModal');
  if (!modal) return;
  document.getElementById('destBookingTitle').textContent = city + ' Expedition';
  const img = document.getElementById('destBookingImg');
  if (img && DEST_IMAGES[city]) img.src = DEST_IMAGES[city];
  const fesPromo = document.getElementById('fesPromoBlock');
  if (fesPromo) fesPromo.style.display = (city === 'Fes') ? 'block' : 'none';
  document.getElementById('db-name').value = '';
  document.getElementById('db-email').value = '';
  document.getElementById('db-phone').value = '';
  document.getElementById('db-date').value = '';
  document.getElementById('db-adults').value = 2;
  document.getElementById('db-children').value = 0;
  document.getElementById('db-message').value = '';
  modal.style.display = 'flex';
  lockBodyScroll(true);
};

window.closeDestBooking = function() {
  const modal = document.getElementById('destBookingModal');
  if (modal) modal.style.display = 'none';
  lockBodyScroll(false);
};

window.sendDestBookingWhatsApp = function() {
  const WHATSAPP_NUMBER = '212771663435';
  const cityTitle = document.getElementById('destBookingTitle').textContent;
  const name     = document.getElementById('db-name').value;
  const date     = document.getElementById('db-date').value;
  const adults   = document.getElementById('db-adults').value;
  const children = document.getElementById('db-children').value;
  const message  = document.getElementById('db-message').value;
  if (!name || !date) { alert('Please fill in your name and preferred date.'); return; }
  const text = `Hello 👋\nI am interested in booking:\n✅ Destination: ${cityTitle}\n👤 Name: ${name}\n📅 Date: ${date}\n👥 Adults: ${adults}\n🧒 Children: ${children}\n📝 Message: ${message || 'N/A'}\n\nThank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
};

const EXPERIENCES = {
  ourika: {
    title: "Ourika Valley (Setti Fatma)",
    img: "images/Marrakech/ourika_1.png",
    desc: "Nature excursion 60 km from Marrakech: green valley, Berber villages and Setti Fatma waterfalls.",
    duration: "1 day",
    timing: "Departure 08:30 • Return ~18:00",
    price: "45€",
    schedule: ["08:30 – Pick up in Marrakech", "10:00 – Scenic drive", "11:00 – Setti Fatma & waterfalls", "18:00 – Return"],
    activities: ["Berber villages", "Walk to waterfalls", "Panoramic photos"]
  },
  ouzoud: {
    title: "Ouzoud Waterfalls",
    img: "images/Ouzoud/ouzoud-falls.jpg",
    desc: "The most beautiful waterfalls in Morocco: nature, easy hike and magnificent views.",
    duration: "1 day",
    timing: "Departure 08:00 • Return ~19:00",
    price: "250 DH",
    schedule: ["08:00 – Departure", "11:00 – Walk", "15:00 – Boat ride", "19:00 – Return"],
    activities: ["Easy hike", "Macaque monkeys observation", "Boat ride"]
  },
  agafay: {
    title: "Agafay Desert (Quad + Camel + Dinner)",
    img: "images/Marrakech/agafay.jpg",
    desc: "Late afternoon adventure: camel, quad, sunset and dinner in a Berber tent.",
    duration: "≈ 6 hours",
    timing: "Departure 15:30 • Return ~21:30",
    price: "190€",
    schedule: ["15:30 – Pick up", "17:30 – Camel ride", "18:15 – Quad biking", "20:00 – Dinner + show"],
    activities: ["Camel ride", "Quad biking", "Sunset", "Berber dinner"]
  },
  imlil: {
    title: "Imlil & Atlas Mountains",
    img: "images/Marrakech/imlil_1.jpg",
    desc: "Mountain day: hiking, Amazigh villages and panoramas of Toubkal.",
    duration: "1 day",
    timing: "Departure 08:00 • Return ~18:00",
    price: "75€",
    schedule: ["08:00 – Departure", "10:00 – Arrival in Imlil", "11:00 – Guided village hike", "18:00 – Return"],
    activities: ["Guided Hiking", "Amazigh villages", "Atlas Panoramas"]
  },
  takerkoust: {
    title: "Lalla Takerkoust Lake",
    img: "images/Marrakech/lac-lala-takerkoust.webp",
    desc: "Relaxing outing: lake, nature and outdoor activities depending on the package.",
    duration: "Half-day",
    timing: "Morning or afternoon departure",
    price: "50€",
    schedule: ["Pick-up", "Scenic drive to Lake", "Free time & quad", "Tea break"],
    activities: ["Walk by the lake", "Relaxation", "Outdoor Activities"]
  },
  ballon: {
    title: "Sunrise Hot Air Balloon",
    img: "images/Marrakech/montgolfiere.webp",
    desc: "Sunrise flight + Berber breakfast after landing.",
    duration: "≈ 4–5 hours",
    timing: "Departure ~2h before sunrise",
    price: "177€",
    schedule: ["Pick-up", "Balloon preparation", "Flight over Atlas", "Berber breakfast"],
    activities: ["Sunrise Flight", "Atlas Views", "Berber Breakfast"]
  }
};

window.openExp = function(key) {
  const exp = EXPERIENCES[key];
  if (!exp) return;

  let modal = document.getElementById('destModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'destModal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center;
      padding: 20px; background: rgba(17, 17, 30, 0.75); backdrop-filter: blur(12px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="glass-panel" style="width: min(850px, 95vw); max-height: 90vh; border-radius: var(--hm-radius-lg); overflow-y: auto; position: relative; background: #FFFFFF;">
      <button onclick="closeDestinationModal()" style="position: absolute; top: 20px; right: 20px; z-index: 10; width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(0,0,0,0.5); color: #fff; cursor: pointer; font-size: 1.2rem;">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div style="position: relative; height: 320px;">
        <img src="${exp.img}" alt="${exp.title}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(26,26,46,0.85) 100%);"></div>
        <div style="position: absolute; bottom: 24px; left: 30px; right: 30px; color: #fff;">
          <span class="badge badge-terracotta" style="margin-bottom: 8px; background: var(--hm-terracotta); color: #fff;">${exp.duration}</span>
          <h2 style="font-size: 2.2rem; color: #fff; font-family: var(--hm-font-serif);">${exp.title}</h2>
          <p style="opacity: 0.9; font-size: 0.95rem;"><i class="fa-regular fa-clock"></i> ${exp.timing}</p>
        </div>
      </div>

      <div style="padding: 34px;">
        <p style="font-size: 1.05rem; line-height: 1.75; color: var(--hm-text-body); margin-bottom: 28px;">${exp.desc}</p>

        <h4 style="font-size: 1.15rem; margin-bottom: 14px; font-family: var(--hm-font-serif);">Schedule & Itinerary</h4>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px;">
          ${exp.schedule.map(step => `
            <div style="padding: 12px 16px; border-left: 3px solid var(--hm-terracotta); background: var(--hm-bg-main); border-radius: 0 var(--hm-radius-md) var(--hm-radius-md) 0; font-size: 0.95rem; font-weight: 600;">
              ${step}
            </div>
          `).join('')}
        </div>

        <h4 style="font-size: 1.15rem; margin-bottom: 14px; font-family: var(--hm-font-serif);">Included Activities</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px;">
          ${exp.activities.map(act => `
            <span class="badge badge-gold" style="font-size: 0.85rem;"><i class="fa-solid fa-check"></i> ${act}</span>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--hm-border); padding-top: 24px;">
          <div>
            <span style="font-size: 0.85rem; color: var(--hm-text-muted);">Price per person</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--hm-text-heading);">${exp.price}</div>
          </div>
          <a href="booking.html" class="btn-primary" style="padding: 12px 30px;">Book this Experience</a>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  });
};

window.closeDestinationModal = function() {
  const modal = document.getElementById('destModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
};

// ── Scroll Reveal Engine ────────────────────────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}
