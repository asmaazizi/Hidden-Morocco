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
    title: "Marrakech",
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
    title: "Merzouga",
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
    title: "Chefchaouen",
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
    title: "Essaouira",
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
    title: "Ouarzazate",
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
    title: "Fes",
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
  },
  {
    id: "casablanca",
    title: "Casablanca",
    region: "Casablanca-Settat",
    category: "coastal",
    price: 140,
    currency: "EUR",
    rating: 4.7,
    reviewsCount: 160,
    img: "images/Casablanca/casablanca.png",
    badge: "Modern Hub",
    desc: "Morocco's vibrant economic capital featuring the architectural masterpiece Hassan II Mosque perched directly over the Atlantic ocean.",
    lat: 33.5731,
    lng: -7.5898,
    highlights: ["Hassan II Mosque Ocean View", "Corniche Promenade", "Habous Quarter Architectural Tour", "Rick's Café Experience"],
    itinerary: [
      { day: "Day 1", text: "Hassan II Mosque Guided Visit & Corniche Walk" },
      { day: "Day 2", text: "Habous Craft Market & Culinary Tasting" }
    ]
  },
  {
    id: "zagora",
    title: "Zagora",
    region: "Draâ-Tafilalet",
    category: "desert",
    price: 220,
    currency: "EUR",
    rating: 4.8,
    reviewsCount: 190,
    img: "images/Zagora/zagora_hero.png",
    badge: "Sahara Gateway",
    desc: "Gateway to the Draa Valley. Palm groves, ancient earthen kasbahs, and authentic desert stargazing.",
    lat: 30.3336,
    lng: -5.8264,
    highlights: ["Draa Valley Palm Groves", "Tamegroute Ancient Library", "Sunset Camel Trek", "Traditional Berber Music"],
    itinerary: [
      { day: "Day 1", text: "Draa Oasis Drive & Sunset Desert Camp" },
      { day: "Day 2", text: "Tamegroute Underground Kasbah Visit" }
    ]
  },
  {
    id: "agadir",
    title: "Agadir",
    region: "Souss-Massa",
    category: "coastal",
    price: 130,
    currency: "EUR",
    rating: 4.7,
    reviewsCount: 140,
    img: "images/Agadir/agadir_hero.png",
    badge: "Ocean Resort",
    desc: "Coastal breeze, golden sandy beaches, year-round sunshine, sea promenade, and Atlantic waters.",
    lat: 30.4278,
    lng: -9.5981,
    highlights: ["Agadir Kasbah Panoramic View", "Souk El Had Shopping", "Marina Promenade Dining", "Taghazout Bay Surfing"],
    itinerary: [
      { day: "Day 1", text: "Kasbah Hill View & Beach Promenade Sunset" },
      { day: "Day 2", text: "Taghazout Coastal Trip & Argan Valley Tour" }
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
    nav_book: "Book Now",
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
  if (document.body) document.body.setAttribute('data-theme', AppState.theme);
  updateThemeIcon();

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('hm_theme', AppState.theme);
      document.documentElement.setAttribute('data-theme', AppState.theme);
      if (document.body) document.body.setAttribute('data-theme', AppState.theme);
      updateThemeIcon();
      showToast(`Switched to ${AppState.theme.toUpperCase()} mode ✨`);
    });
  });
}

function updateThemeIcon() {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = AppState.theme === 'dark'
      ? '<i class="fa-solid fa-sun" style="color: #F59E0B; transform: rotate(360deg); transition: all 0.4s ease;"></i>'
      : '<i class="fa-solid fa-moon" style="transition: all 0.4s ease;"></i>';
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
    showToast("Removed from Wishlist");
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

window.toggleMobileMenu = function (e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menus = document.querySelectorAll('.hn-links, .nav-links, #premNavLinks, #navLinks');
  const hburgs = document.querySelectorAll('.hamburger, .hburg');
  const backdrops = document.querySelectorAll('.drawer-backdrop');
  
  let isOpen = false;
  menus.forEach(menu => {
    menu.classList.toggle('hn-links-open');
    menu.classList.toggle('open');
    menu.classList.toggle('active');
    if (menu.classList.contains('open') || menu.classList.contains('hn-links-open')) {
      isOpen = true;
    }
  });

  hburgs.forEach(btn => {
    if (isOpen) btn.classList.add('is-active');
    else btn.classList.remove('is-active');
  });

  backdrops.forEach(bd => {
    if (isOpen) bd.classList.add('drawer-backdrop-open');
    else bd.classList.remove('drawer-backdrop-open');
  });
};

document.addEventListener('click', (e) => {
  const isNavClick = e.target.closest('.hn-links, .nav-links, #premNavLinks, #navLinks, .hamburger, .hburg');
  if (!isNavClick || e.target.closest('.hn-links a, .nav-links a, .mobile-menu-close')) {
    document.querySelectorAll('.hn-links, .nav-links, #premNavLinks, #navLinks').forEach(m => {
      m.classList.remove('hn-links-open', 'open', 'active');
    });
    document.querySelectorAll('.hamburger, .hburg').forEach(btn => {
      btn.classList.remove('is-active');
    });
    document.querySelectorAll('.drawer-backdrop').forEach(bd => {
      bd.classList.remove('drawer-backdrop-open');
    });
  }
});

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
    <div class="card glass-panel hover-lift">
      <div class="card-img-wrapper">
        <img src="${dest.img}" alt="${dest.title}" loading="lazy">
        <span class="badge badge-gold card-badge">✦ ${dest.badge}</span>
        <button class="fav-btn card-fav-btn ${favActive ? 'is-active' : ''}" data-id="${dest.id}" onclick="toggleFavorite('${dest.id}', event)" aria-label="Add to Wishlist">
          <i class="fa-${favActive ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>

      <div class="card-content">
        <h3>${dest.title}</h3>
        <div class="card-meta-row">
          <span class="card-region"><i class="fa-solid fa-location-dot"></i> ${dest.region}</span>
          <div class="card-rating"><i class="fa-solid fa-star"></i> ${dest.rating} (${dest.reviewsCount || 100})</div>
        </div>

        <p>${dest.desc}</p>

        <div class="card-footer-row">
          <div>
            <span class="card-price-label">From</span>
            <div class="card-price-val">€${dest.price}</div>
          </div>
          <div class="card-btns">
            <a href="destinations.html#${dest.id}" class="btn-primary">Explore <i class="fa-solid fa-arrow-right"></i></a>
          </div>
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
      position: fixed; bottom: 30px; right: 30px; z-index: 999999;
      display: flex; flex-direction: column; gap: 10px; pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    padding: 14px 22px; border-radius: 12px; font-weight: 600;
    font-size: 0.9rem; color: #0F172A; background: #FFFFFF; box-shadow: 0 12px 30px rgba(15,23,42,0.12);
    border-left: 4px solid #C85A32; pointer-events: auto; transition: all 0.35s ease;
    transform: translateY(20px); opacity: 0; display: flex; align-items: center; gap: 10px;
    border: 1px solid rgba(15,23,42,0.08);
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#C85A32;"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ── Global Interactive Quick Booking Modal Engine ────────────────────────
window.openQuickBooking = function (destId = 'marrakech') {
  let modal = document.getElementById('globalQuickBookModal');
  const dest = DESTINATIONS_DB.find(d => d.id === destId) || DESTINATIONS_DB[0];

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalQuickBookModal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 9999999; display: flex; align-items: center; justify-content: center;
      padding: 20px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(14px);
      opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(modal);
  } else if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const modalBg = isDark ? '#121724' : '#FFFFFF';
  const modalBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)';
  const textColor = isDark ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDark ? '#CBD5E1' : '#475569';
  const inputBg = isDark ? '#1C2333' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.14)';
  const priceBoxBg = isDark ? '#1C2333' : 'linear-gradient(135deg, rgba(200, 90, 50, 0.05) 0%, rgba(231, 169, 60, 0.1) 100%)';
  const priceBoxBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(200, 90, 50, 0.25)';

  modal.innerHTML = `
    <div class="qb-modal-content" style="
      background: ${modalBg}; border: 1px solid ${modalBorder}; border-radius: 28px;
      width: min(580px, 95vw); max-height: 90vh; overflow-y: auto; padding: 36px 32px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.25); position: relative; color: ${textColor}; margin: auto;
    ">
      <button onclick="window.closeQuickBooking()" aria-label="Close" style="
        position: absolute; top: 22px; right: 22px; width: 38px; height: 38px; border-radius: 50%;
        border: 1px solid ${inputBorder}; background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.04)'}; color: ${textColor};
        font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease;
      ">&times;</button>

      <div style="display:flex; align-items:center; gap:12px; margin-bottom: 18px;">
        <span style="background: linear-gradient(135deg, #C85A32 0%, #E7A93C 100%); color: #FFFFFF; padding: 6px 16px; border-radius: 99px; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px rgba(200, 90, 50, 0.3);">✦ Instant Booking</span>
      </div>

      <h3 class="qb-title" style="font-family: var(--hm-font-serif, 'Playfair Display', Georgia, serif); font-size: 1.85rem; font-weight: 800; margin-bottom: 8px; color: ${textColor};">Plan Your Moroccan Expedition</h3>
      <p class="qb-desc" style="color: ${subTextColor}; font-size: 0.92rem; margin-bottom: 26px; line-height: 1.6;">Customize your trip details below. Live pricing updates automatically.</p>

      <form id="quickBookingForm" onsubmit="window.handleQuickBookSubmit(event)">
        <div style="margin-bottom: 20px;">
          <label class="qb-label" style="display:block; font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:${textColor}; margin-bottom:8px;">Select Destination</label>
          <select id="qb-dest" onchange="window.updateQuickBookPrice()" style="
            width:100%; padding:13px 16px; border-radius:14px; border:1px solid ${inputBorder};
            background:${inputBg}; color:${textColor}; font-size:0.95rem; font-weight:600; outline:none; font-family:inherit;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03); cursor:pointer;
          ">
            ${DESTINATIONS_DB.map(d => `<option value="${d.id}" ${d.id === dest.id ? 'selected' : ''}>${d.title} (€${d.price}/person)</option>`).join('')}
          </select>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label class="qb-label" style="display:block; font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:${textColor}; margin-bottom:8px;">Travel Date</label>
            <input type="date" id="qb-date" required style="
              width:100%; padding:13px 16px; border-radius:14px; border:1px solid ${inputBorder};
              background:${inputBg}; color:${textColor}; font-size:0.95rem; font-weight:600; outline:none; font-family:inherit; box-sizing:border-box;
              box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            ">
          </div>
          <div>
            <label class="qb-label" style="display:block; font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:${textColor}; margin-bottom:8px;">Travelers</label>
            <div style="display:flex; align-items:center; background:${inputBg}; border:1px solid ${inputBorder}; border-radius:14px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <button type="button" onclick="window.changeTravelers(-1)" style="width:44px; height:46px; border:none; background:transparent; color:${textColor}; font-size:1.25rem; font-weight:700; cursor:pointer;">-</button>
              <input type="number" id="qb-travelers" value="2" min="1" max="20" readonly style="width:100%; text-align:center; border:none; background:transparent; color:${textColor}; font-size:1.05rem; font-weight:800;">
              <button type="button" onclick="window.changeTravelers(1)" style="width:44px; height:46px; border:none; background:transparent; color:${textColor}; font-size:1.25rem; font-weight:700; cursor:pointer;">+</button>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label class="qb-label" style="display:block; font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:${textColor}; margin-bottom:8px;">Full Name</label>
          <input type="text" id="qb-name" placeholder="e.g. Sarah Jenkins" required style="
            width:100%; padding:13px 16px; border-radius:14px; border:1px solid ${inputBorder};
            background:${inputBg}; color:${textColor}; font-size:0.95rem; font-weight:600; outline:none; font-family:inherit; box-sizing:border-box;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          ">
        </div>

        <div class="qb-price-box" style="
          background: ${priceBoxBg};
          border: 1px solid ${priceBoxBorder};
          border-radius: 18px; padding: 20px 24px; margin-bottom: 26px; display:flex; justify-content:space-between; align-items:center;
          box-shadow: 0 6px 20px rgba(200, 90, 50, 0.06);
        ">
          <div>
            <span style="font-size:0.84rem; font-weight:700; color:${textColor}; display:block; margin-bottom: 2px;">Estimated Total Price</span>
            <span style="font-size:0.82rem; font-weight:800; background: linear-gradient(135deg, #C85A32 0%, #E7A93C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">✦ 100% Private Expedition</span>
          </div>
          <div id="qb-total-price" style="font-size: 1.9rem; font-weight: 800; background: linear-gradient(135deg, #C85A32 0%, #E7A93C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">€360</div>
        </div>

        <button type="submit" style="
          width:100%; padding:16px; border-radius:99px; border:none;
          background: linear-gradient(135deg, #C85A32 0%, #E7A93C 100%); color:#FFFFFF; font-weight:800;
          font-size:1.02rem; cursor:pointer; box-shadow:0 8px 25px rgba(200,90,50,0.4); transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display:flex; align-items:center; justify-content:center; gap:10px;
        ">
          Confirm Expedition Request &nbsp;<i class="fa-solid fa-compass"></i>
        </button>
      </form>
    </div>
  `;

  // Set default tomorrow date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('qb-date');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];

  window.updateQuickBookPrice();
  lockBodyScroll(true);

  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const content = modal.querySelector('.qb-modal-content');
  if (content) content.scrollTop = 0;

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  });
};

window.closeQuickBooking = function () {
  const modal = document.getElementById('globalQuickBookModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
  lockBodyScroll(false);
};

window.changeTravelers = function (delta) {
  const input = document.getElementById('qb-travelers');
  if (!input) return;
  let val = parseInt(input.value, 10) + delta;
  if (val < 1) val = 1;
  if (val > 20) val = 20;
  input.value = val;
  window.updateQuickBookPrice();
};

window.updateQuickBookPrice = function () {
  const destId = document.getElementById('qb-dest')?.value || 'marrakech';
  const count = parseInt(document.getElementById('qb-travelers')?.value || '2', 10);
  const dest = DESTINATIONS_DB.find(d => d.id === destId) || DESTINATIONS_DB[0];
  const priceDisplay = document.getElementById('qb-total-price');
  if (priceDisplay && dest) {
    priceDisplay.textContent = `€${dest.price * count}`;
  }
};

window.handleQuickBookSubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById('qb-name').value;
  const destId = document.getElementById('qb-dest').value;
  const dest = DESTINATIONS_DB.find(d => d.id === destId) || DESTINATIONS_DB[0];

  window.closeQuickBooking();
  showToast(`Thank you ${name}! Your booking request for ${dest.title} has been submitted.`);
};

// Wire up all Book Expedition buttons automatically across all pages
document.addEventListener('click', function (e) {
  const bookBtn = e.target.closest('.book-btn-nav, .hn-nav-book, [data-i18n="nav_book"], a[href="booking.html"]');
  if (bookBtn && !window.location.pathname.endsWith('booking.html')) {
    e.preventDefault();
    window.openQuickBooking('marrakech');
  }
});

// ── Interactive Hero Search & URL Filtering ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Hero Search Input handler
  const heroInput = document.getElementById('heroSearchInput');
  const heroBtn = document.querySelector('.hero-search-btn');

  if (heroInput && heroBtn) {
    const executeSearch = (e) => {
      e.preventDefault();
      const query = heroInput.value.trim();
      window.location.href = query ? `destinations.html?search=${encodeURIComponent(query)}` : 'destinations.html';
    };

    heroBtn.addEventListener('click', executeSearch);
    heroInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') executeSearch(e);
    });
  }

  // Handle ?search= query on destinations.html
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery) {
    const destSearchInput = document.getElementById('destSearchInput');
    if (destSearchInput) {
      destSearchInput.value = searchQuery;
      if (typeof filterDestinations === 'function') {
        filterDestinations();
      }
    }
  }
});

// ── Interactive Leaflet Map Engine ─────────────────────────────────────────
function initMapPage() {
  const mapElement = document.getElementById('interactiveMap');
  if (!mapElement || typeof L === 'undefined') return;

  // Clear existing state if re-initialized
  AppState.mapMarkers = [];
  if (AppState.mapInstance) {
    AppState.mapInstance.remove();
    AppState.mapInstance = null;
  }

  // Create Map centered on Morocco
  AppState.mapInstance = L.map('interactiveMap', {
    zoomControl: false
  }).setView([31.7917, -7.0926], 6);

  // Force Leaflet to recalculate map dimensions (critical for mobile)
  setTimeout(() => {
    AppState.mapInstance.invalidateSize();
  }, 150);

  // Re-invalidate on resize (orientation change, window resize)
  window.addEventListener('resize', () => {
    if (AppState.mapInstance) {
      AppState.mapInstance.invalidateSize();
    }
  });

  // Add zoom control at top-left
  L.control.zoom({ position: 'topleft' }).addTo(AppState.mapInstance);

  // ESRI World Imagery satellite tiles (matches reference design)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
    maxZoom: 18,
    minZoom: 5
  }).addTo(AppState.mapInstance);

  // Teardrop-style orange pin icon matching reference design
  const createPinIcon = (isActive = false) => L.divIcon({
    className: 'custom-map-pin-icon',
    html: `<div class="map-pin-marker ${isActive ? 'is-active' : ''}">
      <div class="pin-inner"></div>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
  });

  DESTINATIONS_DB.forEach(dest => {
    const marker = L.marker([dest.lat, dest.lng], { icon: createPinIcon(false) }).addTo(AppState.mapInstance);
    marker.destData = dest;

    // Click opens the premium side panel only (no duplicate popup)
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      // Close any open Leaflet popups
      AppState.mapInstance.closePopup();
      window.showMapDestCard(dest);
    });

    AppState.mapMarkers.push(marker);
  });

  // Polyline coordinates connecting major routes
  const routeCoords = [
    [35.1716, -5.2697],   // Chefchaouen
    [34.0333, -5.0000],   // Fes
    [33.5731, -7.5898],   // Casablanca
    [31.6295, -7.9811],   // Marrakech
    [31.5125, -9.7700],   // Essaouira
    [30.4278, -9.5981],   // Agadir
    [30.9189, -6.8934],   // Ouarzazate
    [30.3336, -5.8264],   // Zagora
    [31.0992, -4.0116],   // Merzouga
  ];

  AppState.routePolyline = L.polyline(routeCoords, {
    color: '#D4AF37',
    weight: 2,
    opacity: 0.85,
    dashArray: '8, 10',
    lineJoin: 'round'
  }).addTo(AppState.mapInstance);

  // Click on empty map area → close the side panel
  AppState.mapInstance.on('click', () => {
    window.closeMapDestCard();
  });
}

// ── Map Filtering Engine ───────────────────────────────────────────────────
window.filterMapCategory = function (category, btnElement) {
  if (!AppState.mapInstance || !AppState.mapMarkers) return;

  // Update active tab buttons
  const buttons = document.querySelectorAll('.map-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const visibleMarkers = [];

  AppState.mapMarkers.forEach(marker => {
    const dest = marker.destData;
    const isMatch = (category === 'all' || dest.category === category);

    if (isMatch) {
      if (!AppState.mapInstance.hasLayer(marker)) {
        marker.addTo(AppState.mapInstance);
      }
      visibleMarkers.push(marker);
    } else {
      if (AppState.mapInstance.hasLayer(marker)) {
        AppState.mapInstance.removeLayer(marker);
      }
    }
  });

  // Fit bounds if specific category selected
  if (category !== 'all' && visibleMarkers.length > 0) {
    const group = L.featureGroup(visibleMarkers);
    AppState.mapInstance.fitBounds(group.getBounds().pad(0.25));
  } else {
    AppState.mapInstance.setView([31.7917, -7.0926], 6);
  }
};

// ── Search Map Function ────────────────────────────────────────────────────
window.searchMapQuery = function (query) {
  if (!AppState.mapInstance || !AppState.mapMarkers) return;
  const q = query.toLowerCase().trim();

  AppState.mapMarkers.forEach(marker => {
    const dest = marker.destData;
    const isMatch = !q || dest.title.toLowerCase().includes(q) || dest.region.toLowerCase().includes(q) || dest.id.toLowerCase().includes(q);

    if (isMatch) {
      if (!AppState.mapInstance.hasLayer(marker)) marker.addTo(AppState.mapInstance);
    } else {
      if (AppState.mapInstance.hasLayer(marker)) AppState.mapInstance.removeLayer(marker);
    }
  });
};

// ── Display Map Destination Card Panel ────────────────────────────────────
window.showMapDestCard = function (dest) {
  const panel = document.getElementById('mapDetailPanel');
  if (!panel) return;

  const isMobile = window.innerWidth <= 900;

  // Center map on marker location (less zoom on mobile to keep context)
  if (AppState.mapInstance) {
    AppState.mapInstance.flyTo([dest.lat, dest.lng], isMobile ? 7 : 8, { duration: 1.2 });
  }

  // Populate Panel Content
  panel.innerHTML = `
    <div class="map-side-card">
      <button class="map-card-close" onclick="window.closeMapDestCard()">&times;</button>
      <div class="map-side-img">
        <img src="${dest.img}" alt="${dest.title}">
        <span class="map-card-badge">${dest.badge || 'Featured'}</span>
      </div>
      <div class="map-side-content">
        <h3>${dest.title}</h3>
        <div class="map-card-meta">
          <span class="map-card-region"><i class="fa-solid fa-location-dot"></i> ${dest.region}</span>
          <span class="map-card-rating"><i class="fa-solid fa-star"></i> ${dest.rating} (${dest.reviewsCount || 100}+ reviews)</span>
        </div>
        <p>${dest.desc}</p>
        
        <div class="map-card-highlights">
          <h5><i class="fa-solid fa-sparkles"></i> Highlights</h5>
          <ul>
            ${(dest.highlights || []).slice(0, 3).map(h => `<li><i class="fa-solid fa-check"></i> ${h}</li>`).join('')}
          </ul>
        </div>

        <div class="map-card-footer">
          <div class="map-card-price-box">
            <span class="price-lbl">Starting from</span>
            <span class="price-val">€${dest.price} <small>/ person</small></span>
          </div>
          <a href="destinations.html#${dest.id}" class="btn-primary map-card-action-btn">
            View Experience &nbsp;<i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  panel.classList.add('is-open');

  // Show backdrop on mobile
  const overlay = document.getElementById('mapSheetOverlay');
  if (overlay && isMobile) overlay.classList.add('is-visible');
};

window.closeMapDestCard = function () {
  const panel = document.getElementById('mapDetailPanel');
  if (panel) panel.classList.remove('is-open');

  // Hide backdrop
  const overlay = document.getElementById('mapSheetOverlay');
  if (overlay) overlay.classList.remove('is-visible');
};

function initHomeMapPreview() {
  const mapElement = document.getElementById('homeMapPreview');
  if (!mapElement || typeof L === 'undefined') return;

  const miniMap = L.map('homeMapPreview', { zoomControl: false, dragging: false, scrollWheelZoom: false }).setView([31.7917, -7.0926], 6);

  // ESRI satellite tiles for home map preview
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
  }).addTo(miniMap);

  DESTINATIONS_DB.forEach(dest => {
    const pinIcon = L.divIcon({
      className: '',
      html: `<div style="
        width: 22px; height: 28px;
        background: linear-gradient(135deg, #C85A32 0%, #E7A93C 100%);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(200,90,50,0.6);
        position: relative;
      "><div style="
        position: absolute; top: 50%; left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 7px; height: 7px;
        background: #fff; border-radius: 50%;
      "></div></div>`,
      iconSize: [22, 28],
      iconAnchor: [11, 28]
    });
    L.marker([dest.lat, dest.lng], { icon: pinIcon }).addTo(miniMap);
  });

  // Dashed golden route lines
  const routeCoords = [
    [35.1716, -5.2697],
    [34.0333, -5.0000],
    [31.6295, -7.9811],
    [31.5125, -9.7700],
    [30.4278, -9.5981],
    [30.9189, -6.8934],
    [30.3336, -5.8264],
    [31.0992, -4.0116],
  ];
  L.polyline(routeCoords, {
    color: '#D4AF37',
    weight: 1.5,
    opacity: 0.8,
    dashArray: '6, 8'
  }).addTo(miniMap);
}

// ── Global Modal Engine & Helpers ─────────────────────────
function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

window.openModal = function (city, scrollToBooking = false) {
  const modal = document.getElementById('modal-' + city);
  if (!modal) return;
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) modalContent.scrollTop = 0;

  lockBodyScroll(true);

  modal.setAttribute('tabindex', '-1');
  modal.focus();

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

window.closeModal = function (city) {
  const modal = document.getElementById('modal-' + city);
  if (!modal) return;
  modal.style.display = 'none';
  lockBodyScroll(false);
};

const DEST_IMAGES = {
  'Marrakech': 'images/Marrakech/Marrakech.jpg',
  'Ouarzazate': 'images/Ouarzazat/ouarzazat1.jpeg',
  'Merzouga': 'images/Merzouga/merzouga_1.jpg',
  'Chefchaouen': 'images/Chfchaouen/chefchaoun.jpg',
  'Essaouira': 'images/Essaouira/essaouira_1.jpg',
  'Fes': 'images/Fes/Fes.jpg',
  'Casablanca': 'images/Casablanca/casablanca.png',
  'Agadir': 'images/Agadir/agadir_hero.png',
  'Zagora': 'images/Zagora/zagora_hero.png'
};

window.openDestBooking = function (city) {
  const modal = document.getElementById('destBookingModal');
  if (!modal) return;
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById('destBookingTitle');
  if (titleEl && city) titleEl.textContent = city + ' Expedition';
  const img = document.getElementById('destBookingImg');
  if (img && DEST_IMAGES[city]) img.src = DEST_IMAGES[city];

  modal.style.zIndex = '10000005';
  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const sheet = modal.querySelector('.dest-booking-sheet, .travel-form-container');
  if (sheet) sheet.scrollTop = 0;

  lockBodyScroll(true);
  modal.setAttribute('tabindex', '-1');
  modal.focus();
};

window.closeDestBooking = function () {
  const modal = document.getElementById('destBookingModal');
  if (modal) modal.style.display = 'none';
  lockBodyScroll(false);
};

window.sendDestBookingWhatsApp = function () {
  const WHATSAPP_NUMBER = '212771663435';
  const cityTitle = document.getElementById('destBookingTitle').textContent;
  const name = document.getElementById('db-name').value;
  const date = document.getElementById('db-date').value;
  const adults = document.getElementById('db-adults').value;
  const children = document.getElementById('db-children').value;
  const message = document.getElementById('db-message').value;
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

window.openExp = function (key) {
  const exp = EXPERIENCES[key];
  if (!exp) return;

  let modal = document.getElementById('destModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'destModal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 9999999; display: flex; align-items: center; justify-content: center;
      padding: 20px; background: rgba(17, 17, 30, 0.85); backdrop-filter: blur(12px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(modal);
  } else if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="glass-panel exp-inner-content" style="width: min(850px, 95vw); max-height: 90vh; border-radius: var(--hm-radius-lg); overflow-y: auto; position: relative; background: #FFFFFF; margin: auto;">
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

  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const content = modal.querySelector('.exp-inner-content');
  if (content) content.scrollTop = 0;
  lockBodyScroll(true);

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  });
};

window.closeDestinationModal = function () {
  const modal = document.getElementById('destModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
  lockBodyScroll(false);
};

window.closeExp = window.closeDestinationModal;

// Global Escape Key & Backdrop Click Listener for All Modals
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal, .dest-booking-modal-overlay, .exp-modal, #globalQuickBookModal, #destModal').forEach(modal => {
      if (modal.style.display === 'flex' || modal.style.display === 'block' || modal.style.opacity === '1') {
        const id = modal.id;
        if (id.startsWith('modal-')) {
          const city = id.replace('modal-', '');
          closeModal(city);
        } else if (id === 'globalQuickBookModal') {
          closeQuickBooking();
        } else if (id === 'destBookingModal') {
          closeDestBooking();
        } else if (id === 'destModal' || id === 'expModal') {
          closeDestinationModal();
        } else {
          modal.style.display = 'none';
          lockBodyScroll(false);
        }
      }
    });
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('dest-booking-modal-overlay') || e.target.classList.contains('exp-modal') || e.target.id === 'globalQuickBookModal' || e.target.id === 'destModal') {
    const id = e.target.id;
    if (id.startsWith('modal-')) {
      closeModal(id.replace('modal-', ''));
    } else if (id === 'globalQuickBookModal') {
      closeQuickBooking();
    } else if (id === 'destBookingModal') {
      closeDestBooking();
    } else if (id === 'destModal' || id === 'expModal') {
      closeDestinationModal();
    }
  }
});
