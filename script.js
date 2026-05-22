const branches = [
  {
    id: 1,
    name: 'Main Branch',
    address: 'Gen T De Leon, Beside 3S Center, Valenzuela City',
    hours: 'Mon-Sat: 8AM–7PM, Sun: 9AM–5PM'
  },
  {
    id: 2,
    name: 'Karuhatan',
    address: 'McArthur Highway, Karuhatan, Valenzuela City',
    hours: 'Mon-Sat: 9AM–7PM'
  },
  {
    id: 3,
    name: 'Malinta',
    address: 'Malinta Road corner Poblacion, Valenzuela City',
    hours: 'Mon-Fri: 8AM–6PM, Sat: 9AM–5PM'
  }
];

const allProducts = [
  { id: 1, name: 'Cat Eye Reading Glasses', price: 1290, category: 'Eye Glasses', imgSrc: 'cat eye glasses.jpeg' },
  { id: 2, name: 'Round Eye Glasses', price: 1590, category: 'Eye Glasses', imgSrc: 'round eye glasses.jpeg' },
  { id: 3, name: 'Chunky Reading Glasses', price: 890, category: 'Eye Glasses', imgSrc: 'chunky style glasses.jpeg' },
  { id: 4, name: 'Aviator Sunglasses', price: 1190, category: 'Sun Glasses', imgSrc: 'aviator glasses.jpeg' },
  { id: 5, name: 'Square Reading Glasses', price: 990, category: 'Eye Glasses', imgSrc: 'square reading glasses.jpeg' },
  { id: 6, name: 'Modern Cat Eye Sunglasses', price: 1390, category: 'Sun Glasses', imgSrc: 'modern cat eye glasses.jpeg' },
  { id: 7, name: 'Multi-Purpose Contact Lens Solution (360ml)', price: 350, category: 'Accessories', imgSrc: 'multipurpose solution.png' },
  { id: 8, name: 'Contact Lens Cleaning & Storage Kit', price: 250, category: 'Accessories', imgSrc: 'contact lens cleaning kit.png' },
  { id: 9, name: 'Premium Contact Lens Case (Twin Pack)', price: 120, category: 'Accessories', imgSrc: 'premium contact lenses.png' },
  { id: 10, name: 'Eyeglass Hard Shell Case', price: 299, category: 'Accessories', imgSrc: 'hard shell case.png' },
  { id: 11, name: 'Microfiber Cleaning Cloth (3-Pack)', price: 180, category: 'Accessories', imgSrc: 'microfiber 3pack.png' },
  { id: 12, name: 'Lens Cleaning Spray + Cloth Set', price: 220, category: 'Accessories', imgSrc: 'cleaning spray and cloth set.png' }
];

const servicesList = [
  {
    icon: 'fa-eye',
    title: 'Optometry & Ophthalmology',
    desc: 'Comprehensive eye exams, vision testing, and medical eye care using modern diagnostics.'
  },
  {
    icon: 'fa-user-doctor',
    title: 'Cataract Surgery Consultation',
    desc: 'Personalized pre-surgery evaluations and treatment plans for cataract management.'
  },
  {
    icon: 'fa-shield-heart',
    title: 'Glaucoma Screening & Management',
    desc: 'Early detection and long-term monitoring to protect optic nerve health.'
  },
  {
    icon: 'fa-child-reaching',
    title: 'Pediatric Eye Care',
    desc: 'Child-friendly vision assessments and treatment for developing eyes.'
  }
];

const frameStyles = [
  { name: 'Browline', price: 0 },
  { name: 'Rectangle', price: 0 },
  { name: 'Oval', price: 0 },
  { name: 'Round', price: 0 },
  { name: 'Cat-eye', price: 580 },
  { name: 'Square', price: 0 },
  { name: 'Aviator', price: 870 },
  { name: 'Wayfarer', price: 290 }
];

const lensTypes = [
  { name: 'Standard Clear', price: 0 },
  { name: 'Polarized', price: 2600 },
  { name: 'Scratch-Resistant', price: 1450 },
  { name: 'Blue Light Resistant', price: 2030 },
  { name: 'Anti-Reflective', price: 1740 },
  { name: 'Anti-Radiation', price: 1620 },
  { name: 'Photochromic', price: 4060 }
];

emailjs.init('O2Fset1R3cyE4q6Fw');
const EMAILJS_SERVICE_ID = 'service_j74f3rp';
const EMAILJS_CLINIC_TEMPLATE_ID = 'template_l1c0cba';
const EMAILJS_PATIENT_TEMPLATE_ID = 'template_wslvr6e';
const THEME_STORAGE_KEY = 'idoctor-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

let currentView = 'home';
let activeCategory = 'All';
let currentPage = 1;
let selectedFrame = frameStyles[0];
let selectedLens = lensTypes[0];
let selectedBranchId = 1;
let bookingModal;
let bookingConfirmationModal;
let themeToggleButton;
let themeToggleIcon;
let themeToggleLabel;

const byId = (id) => document.getElementById(id);

const formatPHP = (value) => `₱${Number(value).toLocaleString()}`;

function getStoredTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === THEME_DARK || savedTheme === THEME_LIGHT ? savedTheme : null;
  } catch {
    return null;
  }
}

function cacheThemeToggleElements() {
  themeToggleButton = byId('themeToggle');
  themeToggleIcon = themeToggleButton?.querySelector('[data-theme-icon]') || null;
  themeToggleLabel = themeToggleButton?.querySelector('[data-theme-label]') || null;
}

function updateThemeToggleUI(theme) {
  if (!themeToggleButton) {
    cacheThemeToggleElements();
  }
  if (!themeToggleButton) return;

  const isDark = theme === THEME_DARK;

  themeToggleButton.setAttribute('aria-pressed', String(isDark));
  themeToggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  if (themeToggleIcon) themeToggleIcon.className = `fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`;
  if (themeToggleLabel) themeToggleLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function setThemeAttributes(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-bs-theme', theme);
  if (document.body) {
    document.body.setAttribute('data-bs-theme', theme);
  }
}

function applyTheme(theme, persist = false) {
  const selectedTheme = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  setThemeAttributes(selectedTheme);
  updateThemeToggleUI(selectedTheme);

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    } catch {}
  }
}

function initializeTheme(initialTheme) {
  cacheThemeToggleElements();
  updateThemeToggleUI(initialTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  const nextTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  applyTheme(nextTheme, true);
}

const initialThemePreference = getStoredTheme() || THEME_LIGHT;
setThemeAttributes(initialThemePreference);

function sectionHeader(tag, title, subtitle, centered = true) {
  return `
    <div class="${centered ? 'text-center mx-auto' : ''}" ${centered ? 'style="max-width:760px"' : ''}>
      <span class="section-tag">${tag}</span>
      <h2 class="section-title">${title}</h2>
      <p class="section-subtitle ${centered ? 'mx-auto' : ''}">${subtitle}</p>
    </div>
  `;
}

function getFilteredProducts() {
  if (activeCategory === 'All') return allProducts;
  return allProducts.filter((item) => item.category === activeCategory);
}

function getPaginatedProducts() {
  const list = getFilteredProducts();
  return list.slice((currentPage - 1) * 6, currentPage * 6);
}

function totalPages() {
  return Math.max(1, Math.ceil(getFilteredProducts().length / 6));
}

function renderHomepage() {
  return `
    <section class="hero-home">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <span class="hero-badge"><i class="fa-solid fa-stethoscope"></i> Trusted Eye Care in Valenzuela</span>
            <h1 class="hero-title mt-3 mb-3">Your Vision, Our Priority</h1>
            <p class="hero-subtext mb-4">We combine expert ophthalmology and modern optical services to keep your eyes healthy and your vision clear.</p>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-brand px-4" id="heroBookBtn">Book Appointment</button>
              <button class="btn btn-outline-primary px-4" data-nav-function="services">Our Services</button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-visual">
              <div class="hero-circle"><i class="fa-solid fa-eye"></i></div>
              <div class="float-card float-one">Eye Examination</div>
              <div class="float-card float-two">Prescription Eyewear</div>
              <div class="float-card float-three">Expert Specialists</div>
            </div>
          </div>
        </div>
        <div class="row g-3 mt-2">
          <div class="col-12 col-md-4"><div class="stats-pill"><strong>500+</strong><span>Patients</span></div></div>
          <div class="col-12 col-md-4"><div class="stats-pill"><strong>4+</strong><span>Doctors</span></div></div>
          <div class="col-12 col-md-4"><div class="stats-pill"><strong>5★</strong><span>Reviews</span></div></div>
        </div>
      </div>
    </section>

    <section class="section-wrap">
      <div class="container">
        ${sectionHeader('About iDoctor', 'Comprehensive Eye Care and Optical Services', 'Our clinic offers complete care from routine examinations to specialized consultations and quality eyewear, all in one place.')}
        <div class="row g-4 mt-1">
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center">
                <i class="fa-solid fa-user-doctor text-primary fs-3 mb-3"></i>
                <h5 class="card-title">Experienced Doctors</h5>
                <p class="card-text text-muted small mb-0">Skilled ophthalmologists and optometrists focused on patient outcomes.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center">
                <i class="fa-solid fa-microscope text-primary fs-3 mb-3"></i>
                <h5 class="card-title">Advanced Diagnostics</h5>
                <p class="card-text text-muted small mb-0">Modern tools for precise screening and treatment guidance.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center">
                <i class="fa-solid fa-glasses text-primary fs-3 mb-3"></i>
                <h5 class="card-title">Premium Eyewear</h5>
                <p class="card-text text-muted small mb-0">Stylish prescription and sun eyewear with fitting support.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center">
                <i class="fa-solid fa-location-dot text-primary fs-3 mb-3"></i>
                <h5 class="card-title">3 Branches</h5>
                <p class="card-text text-muted small mb-0">Convenient locations in Main Branch, Karuhatan, and Malinta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProductsSection() {
  const products = getPaginatedProducts();
  const pages = totalPages();

  return `
    <section class="section-wrap section-alt">
      <div class="container">
        ${sectionHeader('Products', 'Premium Eyewear & Optical Essentials', 'Browse eye glasses, sun glasses, and accessories with pricing in Philippine Peso.')}

        <div class="d-flex flex-wrap justify-content-center gap-2 mt-4 mb-4">
          ${['All', 'Eye Glasses', 'Sun Glasses', 'Accessories'].map((cat) => `
            <button class="btn ${activeCategory === cat ? 'btn-brand' : 'btn-outline-primary'} filter-btn" data-cat="${cat}">${cat}</button>
          `).join('')}
        </div>

        <div class="row g-4">
          ${products.map((product) => `
            <div class="col-sm-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 hover-lift">
                <div class="product-image-wrap">
                  <img src="${product.imgSrc}" alt="${product.name}">
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="text-muted small mb-1">${product.category}</p>
                  <p class="fw-bold text-primary mb-3">${formatPHP(product.price)}</p>
                  <button class="btn btn-outline-primary mt-auto btn-shop" data-product="${product.name}" data-price="${product.price}">Shop now</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="d-flex flex-wrap justify-content-center gap-2 mt-4">
          ${Array.from({ length: pages }, (_, index) => {
            const page = index + 1;
            return `<button class="btn ${currentPage === page ? 'btn-brand' : 'btn-outline-secondary'} page-btn" data-page="${page}">${page}</button>`;
          }).join('')}
        </div>

        ${renderCustomizer()}
      </div>
    </section>
  `;
}

function renderCustomizer() {
  return `
    <section class="section-wrap pb-0">
      <div class="container">
        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-body p-4 p-lg-5">
            ${sectionHeader('Eyeglasses Customizer', 'Build Your Eyewear', 'Select a frame and lens add-on, then review your total before your clinic fitting.')}
            <div class="row g-4 mt-1">
              <div class="col-lg-6">
                <h6 class="fw-semibold mb-3">Frame Add-ons</h6>
                <div class="d-flex flex-wrap gap-2" id="frameOptions">
                  ${frameStyles.map((style) => `
                    <button class="btn ${selectedFrame.name === style.name ? 'btn-brand' : 'btn-outline-secondary'} opt-btn" data-frame="${style.name}" data-price="${style.price}">
                      ${style.name} ${style.price > 0 ? `(+${formatPHP(style.price)})` : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
              <div class="col-lg-6">
                <h6 class="fw-semibold mb-3">Lens Add-ons</h6>
                <div class="d-flex flex-wrap gap-2" id="lensOptions">
                  ${lensTypes.map((lens) => `
                    <button class="btn ${selectedLens.name === lens.name ? 'btn-brand' : 'btn-outline-secondary'} opt-btn" data-lens="${lens.name}" data-price="${lens.price}">
                      ${lens.name} ${lens.price > 0 ? `(+${formatPHP(lens.price)})` : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="card bg-light border-0 mt-4" id="customReceipt">
              <div class="card-body">
                ${renderReceiptContent()}
              </div>
            </div>

            <button class="btn btn-brand w-100 mt-3" id="addToCartBtn">Add to Cart & Request Prescription Fitting →</button>
            <p class="small text-muted text-center mt-2 mb-0">* Prices are in Philippine Pesos (₱). Visit our clinic for prescription lens fitting.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderReceiptContent() {
  const total = selectedFrame.price + selectedLens.price;
  return `
    <h6 class="fw-bold">Your Custom Order Receipt</h6>
    <div class="d-flex justify-content-between border-bottom py-2 small"><span>Frame: ${selectedFrame.name}</span><span>${formatPHP(selectedFrame.price)}</span></div>
    <div class="d-flex justify-content-between border-bottom py-2 small"><span>Lens: ${selectedLens.name}</span><span>${formatPHP(selectedLens.price)}</span></div>
    <div class="d-flex justify-content-between pt-2 fw-bold"><span>Total</span><span>${formatPHP(total)}</span></div>
  `;
}

function renderServicesSection() {
  return `
    <section class="section-wrap">
      <div class="container">
        ${sectionHeader('Services', 'Medical Eye Care Services', 'Our clinical services are designed for preventive care, diagnostics, and long-term vision health.')}
        <div class="row g-3 g-lg-4 mt-1">
          ${servicesList.map((service) => `
            <div class="col-6 col-lg-3">
              <div class="card border-0 shadow-sm h-100 hover-lift">
                <div class="card-body d-flex flex-column">
                  <div class="service-icon mb-3"><i class="fa-solid ${service.icon}"></i></div>
                  <h5 class="card-title fs-6">${service.title}</h5>
                  <p class="card-text small text-muted">${service.desc}</p>
                  <a href="#" class="small text-primary fw-semibold mt-auto service-book-link">Book Now →</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-brand px-4" id="servicesAppointmentBtn">Book Appointment</button>
        </div>
      </div>
    </section>
  `;
}

function renderAboutSection() {
  const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.123456!2d120.9915!3d14.6854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0df2d1b2e3f%3A0x8a1f2b3c4d5e6f7a!2sVG%20%26%20Charm%20Sari%20Sari%20Store!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph';
  const directionsUrl = 'https://www.google.com/maps/dir/14.6737334,121.0406657/14.6854041,120.9914723';
  const promoImages = [
    { img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=500&h=400&fit=crop', title: 'State-of-the-Art Equipment', desc: 'Advanced diagnostic technology for precise eye care.' },
    { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop', title: 'Modern Optical Shop', desc: 'Wide selection of premium frames and lenses.' },
    { img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&h=400&fit=crop', title: 'Caring Environment', desc: 'Patient-first approach with compassionate staff.' }
  ];

  return `
    <section class="section-wrap section-alt">
      <div class="container">
        ${sectionHeader('About Us', 'Who We Are', 'iDoctor Vision Care Clinic provides professional eye care and optical services across Valenzuela City.')}

        <div class="row g-4 mt-1 align-items-stretch">
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-3">Who We Are</h5>
                <p class="text-muted mb-3">Our team delivers quality eye examinations, consultations, and eyewear solutions with patient-centered care and modern clinical equipment.</p>
                <ul class="list-unstyled d-grid gap-2 small mb-0">
                  <li><strong>Address:</strong> Gen T De Leon, Beside 3S Center, Valenzuela City</li>
                  <li><strong>Phone:</strong> 0923 727 2113</li>
                  <li><strong>Email:</strong> idoctorvisioncaremarketing@gmail.com</li>
                  <li><strong>Facebook:</strong> <a href="https://www.facebook.com/iDoctorVisionCareClinic" target="_blank" rel="noopener">iDoctor Vision Care Clinic</a></li>
                  <li><strong>Instagram:</strong> <a href="https://www.instagram.com/idoctorvisioncare/" target="_blank" rel="noopener">@idoctorvisioncare</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm h-100">
              <iframe class="w-100 h-100 rounded-3" style="min-height: 320px; border:0;" loading="lazy" src="${mapEmbed}" title="iDoctor Eye Clinic Map"></iframe>
              <div class="p-3 border-top">
                <a href="${directionsUrl}" target="_blank" rel="noopener" class="btn btn-brand btn-sm">Get Directions</a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5">
          ${sectionHeader('Clinic Highlights', 'Inside Our Clinic', 'A quick look at our equipment, optical shop, and patient-centered environment.')}
          <div class="row g-4 mt-1">
            ${promoImages.map((item) => `
              <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100 hover-lift">
                  <div class="promo-image-wrap">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="small text-muted mb-0">${item.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-5">
          ${sectionHeader('Doctors', 'Our Specialists', 'Experienced specialists committed to protecting and improving your vision.')}
          <div class="row g-4 mt-1">
            ${[
              {
                name: 'Dr. Maria R. Santiago',
                role: 'Chief Ophthalmologist',
                desc: 'Leads diagnosis and treatment planning for complex ophthalmic conditions.'
              },
              {
                name: 'Dr. Jose M. Dela Cruz',
                role: 'Senior Optometrist',
                desc: 'Focused on precise visual assessment and patient-specific lens fitting.'
              },
              {
                name: 'Dr. Anna Liza R. Villanueva',
                role: 'Glaucoma Specialist',
                desc: 'Specializes in glaucoma screening, progression monitoring, and management.'
              }
            ].map((doctor) => `
              <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm text-center h-100 hover-lift">
                  <div class="card-body p-4">
                    <div class="doctor-avatar"><i class="fa-solid fa-user-doctor"></i></div>
                    <h5 class="fw-bold mb-2">${doctor.name}</h5>
                    <span class="badge text-bg-primary-subtle text-primary mb-3">${doctor.role}</span>
                    <p class="small text-muted mb-0">${doctor.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCurrentView() {
  const main = byId('main-content');
  if (!main) return;

  if (currentView === 'products') {
    main.innerHTML = renderProductsSection();
  } else if (currentView === 'services') {
    main.innerHTML = renderServicesSection();
  } else if (currentView === 'about') {
    main.innerHTML = renderAboutSection();
  } else {
    main.innerHTML = renderHomepage();
  }

  attachViewEvents();
  setActiveNav();
}

function setActiveNav() {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === currentView && link.classList.contains('nav-link'));
  });
}

function attachViewEvents() {
  if (currentView === 'products') {
    document.querySelectorAll('.filter-btn').forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.cat;
        currentPage = 1;
        renderCurrentView();
      });
    });

    document.querySelectorAll('.page-btn').forEach((button) => {
      button.addEventListener('click', () => {
        currentPage = Number(button.dataset.page);
        renderCurrentView();
      });
    });

    document.querySelectorAll('.btn-shop').forEach((button) => {
      button.addEventListener('click', () => {
        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);
        alert(`✨ Added to cart: ${productName} (${formatPHP(productPrice)})\n\nVisit our clinic for prescription fitting and pickup!`);
      });
    });

    attachCustomizerEvents();
  }

  if (currentView === 'services') {
    byId('servicesAppointmentBtn')?.addEventListener('click', openModal);
    document.querySelectorAll('.service-book-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
      });
    });
  }

  byId('heroBookBtn')?.addEventListener('click', openModal);
  document.querySelectorAll('[data-nav-function]').forEach((button) => {
    button.addEventListener('click', () => navigateToView(button.dataset.navFunction));
  });
}

function attachCustomizerEvents() {
  document.querySelectorAll('[data-frame]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.frame;
      const price = Number(button.dataset.price);
      selectedFrame = frameStyles.find((frame) => frame.name === name) || { name, price };
      updateReceipt();
      document.querySelectorAll('[data-frame]').forEach((item) => {
        item.classList.remove('btn-brand');
        item.classList.add('btn-outline-secondary');
      });
      button.classList.remove('btn-outline-secondary');
      button.classList.add('btn-brand');
    });
  });

  document.querySelectorAll('[data-lens]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.lens;
      const price = Number(button.dataset.price);
      selectedLens = lensTypes.find((lens) => lens.name === name) || { name, price };
      updateReceipt();
      document.querySelectorAll('[data-lens]').forEach((item) => {
        item.classList.remove('btn-brand');
        item.classList.add('btn-outline-secondary');
      });
      button.classList.remove('btn-outline-secondary');
      button.classList.add('btn-brand');
    });
  });

  byId('addToCartBtn')?.addEventListener('click', () => {
    const total = selectedFrame.price + selectedLens.price;
    alert(`✅ Added to Cart!\nFrame: ${selectedFrame.name} (${formatPHP(selectedFrame.price)})\nLens: ${selectedLens.name} (${formatPHP(selectedLens.price)})\nTotal: ${formatPHP(total)}\n\nVisit our clinic for prescription fitting.`);
  });
}

function updateReceipt() {
  const receipt = byId('customReceipt');
  if (!receipt) return;
  const cardBody = receipt.querySelector('.card-body');
  if (cardBody) {
    cardBody.innerHTML = renderReceiptContent();
  }
}

function navigateToView(view) {
  currentView = view || 'home';
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const navCollapse = byId('siteNav');
  if (navCollapse && navCollapse.classList.contains('show')) {
    new bootstrap.Collapse(navCollapse).hide();
  }
}

function renderBranchSelection() {
  const container = byId('branchOptions');
  if (!container) return;

  container.innerHTML = branches.map((branch) => `
    <div class="col-12">
      <div class="branch-card ${branch.id === selectedBranchId ? 'selected' : ''}" data-branch-id="${branch.id}">
        <div class="form-check m-0">
          <input class="form-check-input" type="radio" name="branchRadio" id="branch_${branch.id}" value="${branch.id}" ${branch.id === selectedBranchId ? 'checked' : ''}>
          <label class="form-check-label w-100" for="branch_${branch.id}">
            <strong>${branch.name}</strong><br>
            <span class="small text-muted">${branch.address}</span><br>
            <span class="small text-success">${branch.hours}</span>
          </label>
        </div>
      </div>
    </div>
  `).join('');

  branches.forEach((branch) => {
    const card = document.querySelector(`.branch-card[data-branch-id="${branch.id}"]`);
    const radio = byId(`branch_${branch.id}`);

    const select = () => {
      selectedBranchId = branch.id;
      document.querySelectorAll('.branch-card').forEach((item) => item.classList.remove('selected'));
      card?.classList.add('selected');
      if (radio) radio.checked = true;
    };

    card?.addEventListener('click', select);
    radio?.addEventListener('change', select);
  });
}

function showBookingFeedback(message, type = 'success') {
  const box = byId('bookingFeedback');
  if (!box) return;
  box.className = `alert alert-${type}`;
  box.textContent = message;
}

function clearBookingFeedback() {
  const box = byId('bookingFeedback');
  if (!box) return;
  box.className = 'd-none';
  box.textContent = '';
}

function openModal() {
  clearBookingFeedback();
  byId('appointmentForm')?.reset();
  selectedBranchId = 1;
  renderBranchSelection();
  bookingModal?.show();
}

function buildSubmissionPayload() {
  const selectedBranch = branches.find((branch) => branch.id === selectedBranchId);
  const selectedType = document.querySelector('input[name="appointmentService"]:checked')?.value || '';

  return {
    firstName: byId('firstName')?.value.trim() || '',
    lastName: byId('lastName')?.value.trim() || '',
    contactNumber: byId('contactNumber')?.value.trim() || '',
    emailAddress: byId('emailAddress')?.value.trim() || '',
    branchId: selectedBranch?.id || null,
    branchName: selectedBranch?.name || '',
    branchAddress: selectedBranch?.address || '',
    branchHours: selectedBranch?.hours || '',
    appointmentType: selectedType,
    specificService: byId('specificService')?.value || '',
    preferredDate: byId('apptDate')?.value || '',
    preferredTime: byId('apptTime')?.value || ''
  };
}

function isFormValid(payload) {
  return Boolean(
    payload.firstName
    && payload.lastName
    && payload.contactNumber
    && payload.emailAddress
    && payload.branchId
    && payload.appointmentType
    && payload.specificService
    && payload.preferredDate
    && payload.preferredTime
  );
}

async function handleAppointmentSubmit(event) {
  event.preventDefault();
  clearBookingFeedback();

  const payload = buildSubmissionPayload();
  if (!isFormValid(payload)) {
    showBookingFeedback('Please complete all required fields.', 'danger');
    return;
  }

  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const clinicParams = {
    patient_name: fullName,
    contact_number: payload.contactNumber,
    patient_email: payload.emailAddress,
    branch: payload.branchName,
    appointment_type: payload.appointmentType,
    service: payload.specificService,
    preferred_date: payload.preferredDate,
    preferred_time: payload.preferredTime
  };
  const patientParams = {
    patient_name: fullName,
    patient_email: payload.emailAddress,
    branch: payload.branchName,
    service: payload.specificService,
    preferred_date: payload.preferredDate,
    preferred_time: payload.preferredTime
  };

  try {
    await Promise.all([
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CLINIC_TEMPLATE_ID, clinicParams),
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_PATIENT_TEMPLATE_ID, patientParams)
    ]);

    if (bookingConfirmationModal) {
      bookingModal?.hide();
      bookingConfirmationModal.show();
    } else {
      bookingModal?.hide();
      alert('✅ Appointment request submitted! Please check your email for confirmation details.');
    }
    byId('appointmentForm')?.reset();
    selectedBranchId = 1;
    renderBranchSelection();
  } catch (error) {
    console.error('EmailJS error:', error);
    showBookingFeedback('Something went wrong. Please try again or contact us directly.', 'danger');
  }
}

function setNavbarScrollEffect() {
  const nav = byId('siteNavbar');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 8);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme(initialThemePreference);

  bookingModal = new bootstrap.Modal(byId('bookingModal'));
  const bookingConfirmationModalElement = byId('bookingConfirmationModal');
  if (bookingConfirmationModalElement) {
    bookingConfirmationModal = new bootstrap.Modal(bookingConfirmationModalElement);
  }

  renderCurrentView();
  renderBranchSelection();

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigateToView(link.dataset.nav);
    });
  });

  byId('navBookBtn')?.addEventListener('click', openModal);
  byId('themeToggle')?.addEventListener('click', toggleTheme);
  byId('appointmentForm')?.addEventListener('submit', handleAppointmentSubmit);

  window.addEventListener('scroll', setNavbarScrollEffect, { passive: true });
  setNavbarScrollEffect();
});
