/* ==========================================================================
   HIDDEN MOROCCO — PLATFORM CORE ENGINE (script.js)
   Terracotta & Sahara Gold Theme Engine, Wishlist, Maps, Search & Filters
   ========================================================================== */

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
    highlights: ["Jemaa el-Fnaa Square", "Majorelle Garden & YSL Museum", "Bahia Palace & Saadian Tombs", "Traditional Hamam Experience"],
    itinerary: [
      { day: "Day 1", text: "Arrival & Welcome Mint Tea at Riad, Evening street food tour at Jemaa el-Fnaa." },
      { day: "Day 2", text: "Guided Medina Walking Tour, Bahia Palace, Secret Garden lunch." },
      { day: "Day 3", text: "Sunset Camel & Quad adventure in Agafay Desert with Berber dinner." }
    ]
  },
  {
    id: "chefchaouen",
    title: "Chefchaouen - The Blue Pearl",
    region: "Tangier-Tetouan",
    category: "mountains",
    price: 140,
    currency: "EUR",
    rating: 4.95,
    reviewsCount: 412,
    img: "images/Chfchaouen/chefchaoun.jpg",
    badge: "Top Rated",
    desc: "A fairytale town nestled in the Rif Mountains, famous for its surreal blue-washed alleyways, serene mountain air, and rich artisan culture.",
    lat: 35.1716,
    lng: -5.2697,
    highlights: ["Outa el-Hammam Square", "Spanish Mosque Viewpoint", "Ras El Maa Waterfall", "Artisan Weaving Workshops"],
    itinerary: [
      { day: "Day 1", text: "Scenic mountain drive, arrival in the Blue Medina, sunset hike to Spanish Mosque." },
      { day: "Day 2", text: "Guided photography walking tour through blue alleyways & Akchour waterfalls day trip." }
    ]
  },
  {
    id: "merzouga",
    title: "Merzouga Sahara Erg Chebbi",
    region: "Draâ-Tafilalet",
    category: "desert",
    price: 260,
    currency: "EUR",
    rating: 5.0,
    reviewsCount: 520,
    img: "images/Merzouga/merzouga_1.jpg",
    badge: "Bucket List",
    desc: "Ride camels into the golden dunes of Erg Chebbi, sleep under endless starry skies in luxury desert camps, and listen to Gnawa music.",
    lat: 31.0994,
    lng: -4.0102,
    highlights: ["Golden Dune Camel Trek", "Stargazing Luxury Camp", "Gnawa Music in Khamlia", "Quad Biking on Erg Chebbi"],
    itinerary: [
      { day: "Day 1", text: "Journey through Ziz Valley, sunset camel trek across giant dunes to luxury desert bivouac." },
      { day: "Day 2", text: "Sunrise over Sahara, Berber breakfast, 4x4 desert safari & Khamlia village music." },
      { day: "Day 3", text: "Sandboarding & farewell morning tea before departure." }
    ]
  },
  {
    id: "fes",
    title: "Fes El Bali - Ancient Cultural Capital",
    region: "Fès-Meknès",
    category: "medina",
    price: 165,
    currency: "EUR",
    rating: 4.85,
    reviewsCount: 289,
    img: "images/Fes/fes_1.jpg",
    badge: "Heritage",
    desc: "The world's largest car-free urban area. Discover Chouara Tannery, Al-Qarawiyyin University, and centuries-old craft workshops.",
    lat: 34.0333,
    lng: -5.0000,
    highlights: ["Chouara Leather Tannery", "Al-Qarawiyyin University", "Bab Bou Jeloud (Blue Gate)", "Brass & Ceramics Workshops"],
    itinerary: [
      { day: "Day 1", text: "Enter through Bab Bou Jeloud, private historian-guided walk through medieval tanneries & copper souks." },
      { day: "Day 2", text: "Royal Palace gates, Marinid Tombs panoramic sunset view." }
    ]
  },
  {
    id: "essaouira",
    title: "Essaouira Atlantic Coastal Citadel",
    region: "Marrakech-Safi",
    category: "coastal",
    price: 130,
    currency: "EUR",
    rating: 4.88,
    reviewsCount: 310,
    img: "images/Essaouira/essaouira_1.jpg",
    badge: "Coastal Escape",
    desc: "A breezy coastal haven where historic ramparts, sea salt air, fresh seafood, windsurfing, and vibrant art galleries meet.",
    lat: 31.5085,
    lng: -9.7595,
    highlights: ["Skala de la Ville Fortifications", "Fresh Seafood Port Market", "Sidi Kaouki Kitesurfing", "Gnaoua World Music Vibe"],
    itinerary: [
      { day: "Day 1", text: "Argan oil cooperative visit en route, ramparts walk, fresh grilled fish at the port." },
      { day: "Day 2", text: "Beach horseback riding or kite surfing session, sunset dinner overlooking Atlantic waves." }
    ]
  },
  {
    id: "ouarzazate",
    title: "Ouarzazate & Ait Benhaddou Kasbah",
    region: "Draâ-Tafilalet",
    category: "heritage",
    price: 150,
    currency: "EUR",
    rating: 4.92,
    reviewsCount: 245,
    img: "images/Ouarzazat/ouarzazat1.jpeg",
    badge: "UNESCO",
    desc: "The Gateway to the Sahara. Marvel at the UNESCO earthen fortress of Ait Benhaddou, backdrop of Gladiator and Game of Thrones.",
    lat: 30.9333,
    lng: -6.9167,
    highlights: ["Ait Benhaddou Ksar", "Atlas Film Studios", "Taourirt Kasbah", "Ounila Valley Scenic Road"],
    itinerary: [
      { day: "Day 1", text: "Cross Tizi n'Tichka pass through High Atlas, explore Ait Benhaddou with a local Berber guide." },
      { day: "Day 2", text: "Visit Atlas Film Studios and historic Taourirt Kasbah." }
    ]
  },
  {
    id: "dades",
    title: "Dades Valley & Todra Gorges",
    region: "Draâ-Tafilalet",
    category: "mountains",
    price: 175,
    currency: "EUR",
    rating: 4.9,
    reviewsCount: 198,
    img: "images/Dades-Gorgdes.jpg",
    badge: "Scenic Wonder",
    desc: "Jaw-dropping serpentine hairpin turns, soaring 300-meter red limestone canyon walls, and lush palm oases in the Valley of Roses.",
    lat: 31.4167,
    lng: -5.9833,
    highlights: ["Todra Gorge Vertical Canyon", "Monkey Fingers Rock Formation", "Dades Hairpin Switchbacks", "Valley of Roses Bivouac"],
    itinerary: [
      { day: "Day 1", text: "Drive through Skoura Oasis, photo stop at Dades winding pass, overnight in traditional Kasbah hotel." },
      { day: "Day 2", text: "Morning canyon walk along Todra River, tea with nomadic family in rock caves." }
    ]
  },
  {
    id: "agadir",
    title: "Agadir & Taghazout Surf Coast",
    region: "Souss-Massa",
    category: "coastal",
    price: 145,
    currency: "EUR",
    rating: 4.8,
    reviewsCount: 270,
    img: "images/Agadir/agadir_1.jpg",
    badge: "Surf & Sun",
    desc: "Golden sandy beaches, world-renowned surf breaks in Taghazout, year-round sunshine, and modern promenade luxury.",
    lat: 30.4278,
    lng: -9.5981,
    highlights: ["Taghazout Bay Surfing", "Paradise Valley Rock Pools", "Agadir Oufella Kasbah Ruins", "Souk El Had Shopping"],
    itinerary: [
      { day: "Day 1", text: "Relax on Agadir beach, cable car ride up to Agadir Oufella sunset." },
      { day: "Day 2", text: "Surf lesson in Taghazout followed by natural pool swimming in Paradise Valley." }
    ]
  },
  {
    id: "casablanca",
    title: "Casablanca Modern Majesty",
    region: "Casablanca-Settat",
    category: "heritage",
    price: 120,
    currency: "EUR",
    rating: 4.75,
    reviewsCount: 215,
    img: "images/Casablanca/casablanca_1.jpg",
    badge: "Oceanic Icon",
    desc: "Morocco's cosmopolitan powerhouse. Stand in awe of the towering Hassan II Mosque perched over the Atlantic ocean.",
    lat: 33.5731,
    lng: -7.5898,
    highlights: ["Hassan II Grand Mosque", "La Corniche Beachfront", "Habous Quarter Mauresque Architecture", "Rick's Café Experience"],
    itinerary: [
      { day: "Day 1", text: "Guided tour inside Hassan II Mosque, stroll along La Corniche, dinner at iconic Rick's Café." }
    ]
  }
];

// ── App State Engine ──────────────────────────────────────────────────────
const AppState = {
  favorites: JSON.parse(localStorage.getItem('hm-favorites') || '[]'),
  mapInstance: null,
  mapMarkers: []
};

// ── Initialization Engine ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initFavoritesCounter();

  if (document.getElementById('destinationsGrid')) {
    initDestinationsPage();
  }
  if (document.getElementById('interactiveMap')) {
    initMapPage();
  }
  if (document.getElementById('homeMapPreview')) {
    initHomeMapPreview();
  }
  if (document.getElementById('favoritesGrid')) {
    initFavoritesPage();
  }
  if (document.getElementById('statCounters')) {
    initStatsObserver();
  }
  if (document.getElementById('bookingFormWizard')) {
    initBookingWizard();
  }
});

// ── Favorites Engine ───────────────────────────────────────────────────────
function isFavorite(id) {
  return AppState.favorites.includes(id);
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  
  if (isFavorite(id)) {
    AppState.favorites = AppState.favorites.filter(favId => favId !== id);
    showToast("Removed from your Favorites");
  } else {
    AppState.favorites.push(id);
    showToast("❤️ Saved to your Favorites!");
  }

  localStorage.setItem('hm-favorites', JSON.stringify(AppState.favorites));
  initFavoritesCounter();

  document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('is-active', isFavorite(id));
    btn.innerHTML = isFavorite(id) ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
  });

  if (document.getElementById('favoritesGrid')) {
    initFavoritesPage();
  }
}

function initFavoritesCounter() {
  const count = AppState.favorites.length;
  document.querySelectorAll('.fav-count-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// ── Sticky Navbar Engine ───────────────────────────────────────────────────
function initNavbarScroll() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('glass-nav');
      nav.style.padding = '12px 40px';
    } else {
      nav.classList.remove('glass-nav');
      nav.style.padding = '20px 40px';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

window.toggleMobileMenu = function() {
  const menu = document.querySelector('.hn-links');
  if (menu) {
    menu.classList.toggle('hn-links-open');
  }
};

// ── Toast System ───────────────────────────────────────────────────────────
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
    padding: 12px 24px; border-radius: 99px; font-weight: 600; font-size: 0.9rem;
    color: var(--hm-text-heading); box-shadow: var(--hm-shadow-lg); border: 1px solid var(--hm-gold);
    display: flex; align-items: center; gap: 10px; opacity: 0; transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: auto;
  `;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ── Destination Cards & Filter Engine ──────────────────────────────────────
function createCardHTML(dest) {
  const favActive = isFavorite(dest.id);
  return `
    <div class="glass-panel hover-lift dest-card-item" style="border-radius: var(--hm-radius-lg); overflow: hidden; position: relative; background: #FFFFFF; border: 1px solid var(--hm-border);">
      <div style="position: relative; height: 240px; overflow: hidden;">
        <img src="${dest.img}" alt="${dest.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" class="card-img">
        <span class="badge badge-terracotta" style="position: absolute; top: 16px; left: 16px; backdrop-filter: blur(10px);">${dest.badge}</span>
        <button class="fav-btn ${favActive ? 'is-active' : ''}" data-id="${dest.id}" onclick="toggleFavorite('${dest.id}', event)" style="position: absolute; top: 16px; right: 16px;">
          <i class="fa-${favActive ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--hm-terracotta); text-transform: uppercase; letter-spacing: 1px;">
            <i class="fa-solid fa-location-dot"></i> ${dest.region}
          </span>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--hm-gold);">
            <i class="fa-solid fa-star"></i> ${dest.rating} (${dest.reviewsCount})
          </span>
        </div>
        <h3 style="font-size: 1.3rem; margin-bottom: 10px; line-height: 1.3; font-family: var(--hm-font-serif);">${dest.title}</h3>
        <p style="font-size: 0.9rem; color: var(--hm-text-muted); margin-bottom: 20px; line-clamp: 2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${dest.desc}
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--hm-border); padding-top: 16px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--hm-text-muted); display: block;">Starting from</span>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--hm-text-heading);">${dest.price} ${dest.currency}</span>
          </div>
          <button onclick="openDestinationModal('${dest.id}')" class="btn-primary" style="padding: 9px 20px; font-size: 0.85rem;">
            Explore <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSkeletonGrid(container, count = 6) {
  container.innerHTML = Array(count).fill(0).map(() => `
    <div style="border-radius: var(--hm-radius-lg); overflow: hidden; background: #FFFFFF; border: 1px solid var(--hm-border); padding: 16px;">
      <div class="skeleton" style="height: 200px; width: 100%; border-radius: var(--hm-radius-md); margin-bottom: 16px;"></div>
      <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: 12px;"></div>
      <div class="skeleton" style="height: 28px; width: 80%; margin-bottom: 12px;"></div>
      <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 20px;"></div>
      <div style="display: flex; justify-content: space-between;">
        <div class="skeleton" style="height: 36px; width: 30%;"></div>
        <div class="skeleton" style="height: 36px; width: 35%; border-radius: 99px;"></div>
      </div>
    </div>
  `).join('');
}

function initDestinationsPage() {
  const container = document.getElementById('destinationsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const regionFilter = document.getElementById('regionFilter');
  const priceSlider = document.getElementById('priceSlider');
  const priceDisplay = document.getElementById('priceDisplay');

  function filterAndRender() {
    renderSkeletonGrid(container, 6);

    setTimeout(() => {
      const query = (searchInput ? searchInput.value : '').toLowerCase();
      const category = categoryFilter ? categoryFilter.value : 'all';
      const region = regionFilter ? regionFilter.value : 'all';
      const maxPrice = priceSlider ? Number(priceSlider.value) : 1000;

      if (priceDisplay && priceSlider) {
        priceDisplay.textContent = `€${priceSlider.value}`;
      }

      const filtered = DESTINATIONS_DB.filter(d => {
        const matchesQuery = d.title.toLowerCase().includes(query) || d.desc.toLowerCase().includes(query) || d.region.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || d.category === category;
        const matchesRegion = region === 'all' || d.region === region;
        const matchesPrice = d.price <= maxPrice;
        return matchesQuery && matchesCategory && matchesRegion && matchesPrice;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <i class="fa-solid fa-compass-slash" style="font-size: 3rem; color: var(--hm-terracotta); margin-bottom: 16px;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">No Destinations Found</h3>
            <p style="color: var(--hm-text-muted);">Try adjusting your search filters or resetting options.</p>
          </div>
        `;
      } else {
        container.innerHTML = filtered.map(createCardHTML).join('');
      }
    }, 300);
  }

  if (searchInput) searchInput.addEventListener('input', filterAndRender);
  if (categoryFilter) categoryFilter.addEventListener('change', filterAndRender);
  if (regionFilter) regionFilter.addEventListener('change', filterAndRender);
  if (priceSlider) priceSlider.addEventListener('input', filterAndRender);

  filterAndRender();
}

// ── Favorites Page Engine ─────────────────────────────────────────────────
function initFavoritesPage() {
  const container = document.getElementById('favoritesGrid');
  if (!container) return;

  const saved = DESTINATIONS_DB.filter(d => isFavorite(d.id));

  if (saved.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
        <i class="fa-regular fa-heart" style="font-size: 4rem; color: var(--hm-text-muted); margin-bottom: 20px;"></i>
        <h2 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--hm-font-serif);">Your Wishlist is Empty</h2>
        <p style="color: var(--hm-text-muted); max-width: 460px; margin: 0 auto 24px;">Explore our handcrafted Moroccan experiences and click the heart icon to save your dream destinations.</p>
        <a href="destinations.html" class="btn-primary">Explore Destinations <i class="fa-solid fa-compass"></i></a>
      </div>
    `;
  } else {
    container.innerHTML = saved.map(createCardHTML).join('');
  }
}

// ── Interactive Destination Modal ──────────────────────────────────────────
window.openDestinationModal = function(id) {
  const dest = DESTINATIONS_DB.find(d => d.id === id);
  if (!dest) return;

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

  const favActive = isFavorite(dest.id);

  modal.innerHTML = `
    <div class="glass-panel" style="width: min(900px, 95vw); max-height: 90vh; border-radius: var(--hm-radius-lg); overflow-y: auto; position: relative; background: #FFFFFF;">
      <button onclick="closeDestinationModal()" style="position: absolute; top: 20px; right: 20px; z-index: 10; width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(0,0,0,0.5); color: #fff; cursor: pointer; font-size: 1.2rem;">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div style="position: relative; height: 340px;">
        <img src="${dest.img}" alt="${dest.title}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(26,26,46,0.85) 100%);"></div>
        <div style="position: absolute; bottom: 24px; left: 30px; right: 30px; color: #fff;">
          <span class="badge badge-terracotta" style="margin-bottom: 8px; background: rgba(192,57,43,0.8); color: #fff;">${dest.badge}</span>
          <h2 style="font-size: 2.2rem; color: #fff; font-family: var(--hm-font-serif);">${dest.title}</h2>
          <p style="opacity: 0.9; font-size: 0.95rem;"><i class="fa-solid fa-location-dot"></i> ${dest.region} • <i class="fa-solid fa-star" style="color: var(--hm-gold);"></i> ${dest.rating} (${dest.reviewsCount} reviews)</p>
        </div>
      </div>

      <div style="padding: 34px;">
        <p style="font-size: 1.05rem; line-height: 1.75; color: var(--hm-text-body); margin-bottom: 28px;">${dest.desc}</p>
        
        <h4 style="font-size: 1.15rem; margin-bottom: 14px; font-family: var(--hm-font-serif);">Highlights</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 30px;">
          ${dest.highlights.map(h => `
            <div style="display: flex; align-items: center; gap: 10px; background: var(--hm-bg-main); padding: 12px 16px; border-radius: var(--hm-radius-md); border: 1px solid var(--hm-border);">
              <i class="fa-solid fa-circle-check" style="color: var(--hm-terracotta);"></i>
              <span style="font-size: 0.9rem; font-weight: 600;">${h}</span>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size: 1.15rem; margin-bottom: 14px; font-family: var(--hm-font-serif);">Sample Itinerary</h4>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 34px;">
          ${dest.itinerary.map(item => `
            <div style="padding: 16px; border-left: 3px solid var(--hm-terracotta); background: var(--hm-bg-main); border-radius: 0 var(--hm-radius-md) var(--hm-radius-md) 0;">
              <strong style="color: var(--hm-terracotta); display: block; font-size: 0.85rem;">${item.day}</strong>
              <span style="font-size: 0.95rem;">${item.text}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--hm-border); padding-top: 24px;">
          <div>
            <span style="font-size: 0.85rem; color: var(--hm-text-muted);">Price per person</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--hm-text-heading);">${dest.price} ${dest.currency}</div>
          </div>
          <div style="display: flex; gap: 12px;">
            <button class="fav-btn ${favActive ? 'is-active' : ''}" data-id="${dest.id}" onclick="toggleFavorite('${dest.id}', event)">
              <i class="fa-${favActive ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <a href="booking.html?dest=${dest.id}" class="btn-primary" style="padding: 12px 30px;">Book Experience</a>
          </div>
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
        <button onclick="openDestinationModal('${dest.id}')" style="background: var(--hm-terracotta); color: #fff; border: none; padding: 6px 12px; border-radius: 99px; font-size: 0.8rem; font-weight: 600; cursor: pointer; width: 100%;">View Experience</button>
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

// ── Stats Counter Observer ─────────────────────────────────────────────────
function initStatsObserver() {
  const section = document.getElementById('statCounters');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = Number(el.getAttribute('data-target'));
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count.toLocaleString();
          if (count >= target) clearInterval(timer);
        }, 25);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

// ── Booking Wizard ─────────────────────────────────────────────────────────
function initBookingWizard() {
  const form = document.getElementById('bookingFormWizard');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const selectedDestId = urlParams.get('dest');
  const destSelect = document.getElementById('bookingDestSelect');

  if (selectedDestId && destSelect) {
    destSelect.value = selectedDestId;
  }

  const guestsInput = document.getElementById('bookingGuests');
  const totalDisplay = document.getElementById('bookingTotalPrice');

  function calculatePrice() {
    const destId = destSelect ? destSelect.value : 'marrakech';
    const dest = DESTINATIONS_DB.find(d => d.id === destId) || DESTINATIONS_DB[0];
    const guests = guestsInput ? Number(guestsInput.value || 1) : 1;
    const total = dest.price * guests;

    if (totalDisplay) {
      totalDisplay.textContent = `€${total}`;
    }
  }

  if (destSelect) destSelect.addEventListener('change', calculatePrice);
  if (guestsInput) guestsInput.addEventListener('input', calculatePrice);
  calculatePrice();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("🎉 Booking Submitted! Our travel team will contact you via email.");
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
}
