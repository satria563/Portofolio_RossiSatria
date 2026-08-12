/* ============================================
   MAIN.JS — Rossi Satria Portfolio
   Vanilla JavaScript — All Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initThemeToggle();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initProjectFilter();
  initSkillBars();
  initActiveNavHighlight();
  initContactForm();
  initCardGlow();
  initProjectModal();
  initCertificateModal();
  initBlogModal();
  initFooterTime();
  initBackToTop();

  // Smooth page load fade-in
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});

/* ---------- HELPER FUNCTIONS ---------- */
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileOverlay = document.querySelector('.navbar__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  // Scroll effect (Throttled for performance)
  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 100), { passive: true });

  // Hamburger toggle
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside (on the backdrop overlay)
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Handle resize to clean up mobile menu styles if window is widened to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Skip if it's a placeholder hash or href was dynamically changed to a full URL
      if (href === '#' || !href.startsWith('#')) return;
      
      e.preventDefault();
      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.warn('Invalid selector:', href);
      }
    });
  });
}

/* ---------- THEME TOGGLE ---------- */
function initThemeToggle() {
  const toggleDesktop = document.getElementById('theme-switch-desktop');
  const toggleMobile = document.getElementById('theme-switch-mobile');
  const savedTheme = localStorage.getItem('theme');
  let isLightMode = savedTheme === 'light';

  // Function to update DOM
  const updateTheme = () => {
    if (isLightMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  // Set initial state without toggling
  updateTheme();

  // Toggle handler
  const handleToggle = () => {
    isLightMode = !isLightMode;
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateTheme();
  };

  if (toggleDesktop) toggleDesktop.addEventListener('click', handleToggle);
  if (toggleMobile) toggleMobile.addEventListener('click', handleToggle);
}

/* ---------- TYPING EFFECT ---------- */
function initTypingEffect() {
  const typingElement = document.querySelector('.hero__typing-text');
  if (!typingElement) return;

  const titles = [
    'Mahasiswa Informatika',
    'Full-Stack Web Developer',
    'IoT Developer',
    'PIC Pelatihan K3',
    'Problem Solver'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 1000);
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('visible'));
  }
}

/* ---------- PROJECT FILTER ---------- */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = 'slide-in-right 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ---------- SKILL BARS ANIMATION ---------- */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-card__bar-fill');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
          bar.classList.add('animated');
          observer.unobserve(bar);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }
}

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  const updateLinks = (id) => {
    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateLinks(entry.target.getAttribute('id'));
        }
      });
    }, {
      rootMargin: '-20% 0px -79% 0px' // Highlight when top 20% of element hits viewport, prevents bottom elements sticking
    });

    sections.forEach(sec => observer.observe(sec));
    
    // Fallback for reaching very bottom (Contact section)
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10)) {
        updateLinks('contact');
      }
    }, { passive: true });
  }
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mark form as submitted for CSS validation styling
    form.classList.add('submitted');

    // Check native validity before proceeding
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Spam Honeypot Check
    const honeypot = form.querySelector('#contact-hp');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Spam submission detected and blocked.');
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;

    // Change button to loading state
    submitBtn.innerHTML = 'Membuka WhatsApp...';
    submitBtn.disabled = true;

    // Get form values
    const name = form.querySelector('#contact-name').value;
    const subject = form.querySelector('#contact-subject').value || '-';
    const message = form.querySelector('#contact-message').value;

    // Construct WhatsApp Message
    const waMessage = `Halo Rossi, ada pesan baru dari portofolio Anda:\n\n` +
                      `*Nama:* ${name}\n` +
                      `*Subjek:* ${subject}\n\n` +
                      `*Pesan:*\n${message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/6285782265046?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank');

    // Show success feedback
    submitBtn.innerHTML = '✓ Membuka Chat!';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    form.reset();
    form.classList.remove('submitted');

    // Reset button state after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      if (window.lucide) {
        lucide.createIcons();
      }
    }, 3000);
  });
}

/* ---------- INTERACTIVE CARD GLOW (SPOTLIGHT) ---------- */
function initCardGlow() {
  // Disable mousemove event on mobile/touch screens to optimize battery/CPU
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll('.project-card, .skill-card, .blog-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ---------- PROJECT DETAIL MODAL ---------- */
const projectDetails = {
  karyaspace: {
    title: "KaryaSpace: Sistem Informasi HRIS & Payroll",
    category: "Web Development",
    badgeClass: "project-card__category-badge--webdev",
    images: [
      "assets/images/projects/project-karyaspace.webp"
    ],
    problem: "Perusahaan memerlukan sistem otomatisasi presensi terintegrasi untuk mencegah kecurangan (titip absen), mengelola dispensasi dinas luar, serta menghitung upah lembur legal (PP No. 35/2021) dan perhitungan pajak progresif PPh 21 secara akurat.",
    action: "Membangun web HRIS menggunakan Next.js 16 (App Router) & TypeScript. Mengimplementasikan geofencing radius GPS (150m), bypass presensi dinas luar, swafoto real-time, database PostgreSQL via Drizzle ORM, autentikasi NextAuth.js v5 (JWT Strategy), serta menyusun algoritma payroll & PPh 21.",
    result: "Sistem berhasil memproses presensi karyawan secara aman dan real-time menggunakan Bun, mengotomatisasi pengunggahan bukti transfer gaji, menyederhanakan workflow administrasi HRD, dan memungkinkan pengunduhan slip gaji secara mandiri.",
    challenge: "Tantangan terbesar adalah membangun perhitungan PPh 21 terintegrasi dengan tarif efektif rata-rata (TER) terbaru secara otomatis dan menjamin validitas lokasi absen GPS (menghindari fake GPS di HP karyawan).",
    solution: "Saya memecahkan ini dengan memvalidasi koordinat latitude-longitude secara langsung melalui server, menghitung jarak menggunakan rumus Haversine, serta membuat modul hitung pajak modular yang diuji secara intensif dengan Bun test runner.",
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth.js v5", "Geofencing & GPS", "Bun (Test Runner)"],
    demoUrl: "https://karyaspace.vercel.app",
    githubUrl: "https://github.com/satria563/PENGAJIAN-KARYA-SPACE"
  },
  iot: {
    title: "Project Pembuatan IoT: Sensor Cahaya",
    category: "Teknologi & IoT",
    badgeClass: "project-card__category-badge--networking",
    images: [
      "assets/images/projects/project-iot.webp"
    ],
    problem: "Dibutuhkan sistem otomatisasi berbasis sensor untuk membaca data intensitas cahaya lingkungan secara real-time dan menerjemahkannya ke dalam aksi mikrokontroler.",
    action: "Menulis kode pemrograman Arduino, merancang logika pemrosesan data sensor LDR (Light Dependent Resistor), mengonfigurasi batas ambang intensitas cahaya, dan mengunggahnya ke perangkat keras.",
    result: "Sistem berhasil membaca data lingkungan secara stabil dan memicu aksi dinamis (seperti menyalakan/mematikan lampu) dengan tingkat respons yang instan.",
    challenge: "Tantangan utama adalah fluktuasi nilai baca sensor LDR (noise) akibat perubahan bayangan sesaat, yang memicu kedipan lampu yang tidak stabil (chattering) saat intensitas berada di batas ambang.",
    solution: "Saya mengatasinya dengan menerapkan algoritma hysteresis (rentang batas atas dan bawah yang berbeda) serta melakukan software-based debouncing dengan menghitung rata-rata pembacaan sensor selama 500ms sebelum mengambil keputusan aksi.",
    tech: ["Arduino IDE", "LDR Sensor", "IoT", "Logika Mikrokontroler", "C/C++", "Espressif ESP8266"],
    githubUrl: "https://github.com/satria563/iot-ldr-sensor"
  },
  k3: {
    title: "PIC Operasional Pelatihan Sertifikasi K3",
    category: "Manajerial",
    badgeClass: "project-card__category-badge--managerial",
    images: [
      "assets/images/k3/k3-group-structure.webp",
      "assets/images/k3/k3-harness-selfie.webp",
      "assets/images/k3/k3-toolbox-talk.webp",
      "assets/images/k3/k3-rossi-coverall.webp",
      "assets/images/k3/k3-assessment-sheet.webp",
      "assets/images/k3/k3-zoom-training.webp",
      "assets/images/k3/k3-classroom-tv.webp"
    ],
    problem: "Koordinasi alur administrasi, komunikasi instruktur, dan logistik peserta dalam pelatihan sertifikasi K3 yang rentan mengalami hambatan informasi akibat banyaknya pihak yang terlibat secara eksternal.",
    action: "Mengambil kendali sebagai koordinator operasional (PIC). Menjadi jembatan komunikasi utama, mengelola administrasi berkas kelulusan, dan menyusun laporan evaluasi pasca-kegiatan.",
    result: "Penyelenggaraan pelatihan berjalan lancar tanpa kendala administratif, laporan evaluasi selesai tepat waktu, dan dokumentasi kelulusan peserta terdistribusi secara akurat.",
    challenge: "Menghadapi perubahan jadwal mendadak dari instruktur sertifikasi BNSP serta berkas pendaftaran peserta yang seringkali tidak lengkap menjelang hari-H.",
    solution: "Saya menyusun Standard Operating Procedure (SOP) digital untuk pengumpulan berkas melalui form online terintegrasi, yang memberikan notifikasi otomatis jika ada berkas yang kurang, serta membuat tabel manajemen risiko jadwal instruktur cadangan.",
    tech: ["Manajemen Operasional", "Keselamatan Kerja (K3)", "Koordinasi Instansi", "Penyusunan Laporan", "SOP Digital", "Google Workspace"],
    demoUrl: "https://www.youtube.com"
  },
  binamuda: {
    title: "Mengikuti Organisasi Binamuda 02",
    category: "Manajerial",
    badgeClass: "project-card__category-badge--managerial",
    images: [
      "assets/images/binamuda/binamuda-large-group.webp",
      "assets/images/binamuda/binamuda-stage-group.webp",
      "assets/images/binamuda/binamuda-tent-setup.webp",
      "assets/images/binamuda/binamuda-school-uniforms.webp",
      "assets/images/binamuda/binamuda-night-group.webp"
    ],
    problem: "Mengorganisasikan kepanitiaan besar untuk melaksanakan rangkaian kegiatan kemasyarakatan yang melibatkan ratusan warga dengan keterbatasan alokasi waktu dan anggaran.",
    action: "Memimpin perencanaan acara, merancang pembagian anggaran secara transparan, serta mengarahkan koordinasi tim panitia di lapangan agar pengerjaan efisien.",
    result: "Acara terlaksana dengan sukses dan meriah, dihadiri oleh warga secara antusias dengan sisa anggaran yang dikelola dengan baik untuk kas organisasi.",
    challenge: "Menyatukan visi anggota kepanitiaan yang memiliki latar belakang dan kesibukan berbeda, serta mencari sponsor lokal tambahan dalam waktu singkat.",
    solution: "Menggunakan tools manajemen tugas sederhana (seperti Trello/WhatsApp Group) untuk memecah task menjadi sub-task harian, mengadakan rapat evaluasi mingguan singkat, serta membuat proposal sponsor kreatif yang menawarkan eksposur di sosial media lokal.",
    tech: ["Kepemimpinan", "Manajemen Anggaran", "Manajemen Waktu", "Negosiasi", "Trello", "WhatsApp Business"]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  
  if (!modal) return;

  const badgeEl = document.getElementById('modal-badge');
  const titleEl = document.getElementById('modal-title');
  const problemEl = document.getElementById('modal-problem');
  const actionEl = document.getElementById('modal-action');
  const resultEl = document.getElementById('modal-result');
  const challengeEl = document.getElementById('modal-challenge');
  const solutionEl = document.getElementById('modal-solution');
  const tagsContainer = document.getElementById('modal-tags');
  const demoLink = document.getElementById('modal-link-demo');
  const githubLink = document.getElementById('modal-link-github');

  const slidesEl = document.getElementById('modal-slides');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  const dotsEl = document.getElementById('modal-dots');
  const galleryContainer = document.getElementById('modal-gallery-container');

  let currentSlideIndex = 0;
  let currentProjectImages = [];

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    // Load simple fields
    badgeEl.textContent = data.category;
    badgeEl.className = 'modal__badge ' + (data.badgeClass || '');
    titleEl.textContent = data.title;
    problemEl.textContent = data.problem;
    actionEl.textContent = data.action;
    resultEl.textContent = data.result;
    challengeEl.textContent = data.challenge;
    solutionEl.textContent = data.solution;

    // Load tags
    tagsContainer.innerHTML = '';
    data.tech.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'modal__tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    // Load links — use explicit click handlers to bypass any event interference
    if (data.demoUrl) {
      demoLink.href = data.demoUrl;
      demoLink.style.display = 'inline-flex';
      demoLink.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(data.demoUrl, '_blank', 'noopener');
      };
    } else {
      demoLink.style.display = 'none';
      demoLink.onclick = null;
    }

    if (data.githubUrl) {
      githubLink.href = data.githubUrl;
      githubLink.style.display = 'inline-flex';
      githubLink.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(data.githubUrl, '_blank', 'noopener');
      };
    } else {
      githubLink.style.display = 'none';
      githubLink.onclick = null;
    }

    // Hide links container if no links at all
    const linksSection = document.querySelector('.modal__section--links');
    if (linksSection) {
      if (!data.demoUrl && !data.githubUrl) {
        linksSection.style.display = 'none';
      } else {
        linksSection.style.display = 'block';
      }
    }

    // Gallery / Slides
    currentProjectImages = data.images || [];
    currentSlideIndex = 0;
    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';

    if (currentProjectImages.length > 0) {
      galleryContainer.style.display = 'block';
      currentProjectImages.forEach((imgSrc, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'modal__slide';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${data.title} - Slide ${index + 1}`;
        slide.appendChild(img);
        slidesEl.appendChild(slide);

        // Create dot if more than one image
        if (currentProjectImages.length > 1) {
          const dot = document.createElement('div');
          dot.className = 'modal__dot' + (index === 0 ? ' active' : '');
          dot.addEventListener('click', () => {
            goToSlide(index);
          });
          dotsEl.appendChild(dot);
        }
      });

      // Show/hide nav buttons
      if (currentProjectImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }

      updateSlidePosition();
    } else {
      galleryContainer.style.display = 'none';
    }

    // Open Modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Refresh icons inside modal
    if (window.lucide) {
      lucide.createIcons({
        attrs: {
          class: 'lucide'
        }
      });
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Slide navigation
  function goToSlide(index) {
    if (index < 0) index = currentProjectImages.length - 1;
    if (index >= currentProjectImages.length) index = 0;
    currentSlideIndex = index;
    updateSlidePosition();
  }

  function updateSlidePosition() {
    slidesEl.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update dots
    const dots = dotsEl.querySelectorAll('.modal__dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Bind click handlers to project cards and details buttons
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project');
    if (!projectId) return;

    card.addEventListener('click', (e) => {
      // If clicking inside links container, do not open modal
      if (e.target.closest('.project-card__links a') && !e.target.closest('.project-card__link--detail')) {
        return;
      }
      e.preventDefault();
      openModal(projectId);
    });
  });

  // Bind close events
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Gallery prev/next
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlideIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlideIndex + 1);
  });

  // Touch swipe support for gallery on mobile/touch screens
  let touchStartX = 0;
  let touchEndX = 0;

  galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  galleryContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (currentProjectImages.length <= 1) return;
    const swipeThreshold = 50; // min pixels to swipe
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left -> Next slide
      goToSlide(currentSlideIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right -> Prev slide
      goToSlide(currentSlideIndex - 1);
    }
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft' && currentProjectImages.length > 1) {
      goToSlide(currentSlideIndex - 1);
    } else if (e.key === 'ArrowRight' && currentProjectImages.length > 1) {
      goToSlide(currentSlideIndex + 1);
    }
  });
}

/* ---------- DYNAMIC LOCAL TIME WIDGET ---------- */
function initFooterTime() {
  const timeEl = document.getElementById('footer-local-time');
  if (!timeEl) return;

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    try {
      const timeString = new Intl.DateTimeFormat('id-ID', options).format(now);
      timeEl.textContent = `${timeString} WIB`;
    } catch (err) {
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${hrs}:${mins}:${secs} WIB`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ---------- FLOATING BACK TO TOP ---------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, 100), { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Re-run lucide in case icons need refresh on button load
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ---------- CERTIFICATE DETAILS DATA ---------- */
const certificateDetails = {
  ccna: {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "17 Januari 2025",
    badge: "network",
    desc: "Sertifikasi resmi dari Cisco Academy yang membuktikan pemahaman mendalam tentang arsitektur jaringan komputer, protokol komunikasi data, routing dan switching dasar, serta pemecahan masalah jaringan skala menengah.",
    skills: [
      "Mengonfigurasi switch dan router Cisco menggunakan Command Line Interface (CLI)",
      "Merancang pembagian sub-jaringan (subnetting) IP Address menggunakan IPv4 dan IPv6",
      "Memahami protokol komunikasi data layer TCP/IP dan OSI Model",
      "Melakukan troubleshooting konektivitas jaringan komputer menggunakan Cisco Packet Tracer",
      "Memahami dasar-dasar keamanan jaringan komputer dan konfigurasi ACL"
    ],
    verifyUrl: "https://www.credly.com/badges/881bd124-35b2-4faa-b4ef-f44932af94a2"
  },
  python: {
    title: "PCAP: Programming Essentials in Python",
    issuer: "Cisco Networking Academy Program",
    date: "19 Juli 2024",
    badge: "code-2",
    desc: "Sertifikasi pemrograman Python profesional tingkat madya yang memvalidasi keahlian pemrograman berorientasi objek (OOP), pemecahan masalah algoritmik, serta manipulasi data file/sistem.",
    skills: [
      "Pemrograman Berorientasi Objek (Object-Oriented Programming - OOP) dalam Python",
      "Struktur data dasar (List, Dictionary, Tuple, Set) dan algoritma efisien",
      "Operasi manipulasi file I/O lokal serta penanganan pengecualian (Exception Handling)",
      "Pemahaman konsep dasar modul, paket, serta library standar Python",
      "Implementasi pemrograman dasar untuk otomatisasi skrip tugas harian"
    ],
    verifyUrl: "https://drive.google.com/file/d/1xb7q-_-fT4nBZFnGp0mWCt-AN8ZuZ2un/view?usp=sharing"
  },
  seminar: {
    title: "Sertifikat Digital Mahasiswa (Seminar/Kegiatan)",
    issuer: "Universitas Bina Sarana Informatika",
    date: "Semester Aktif",
    badge: "shield-check",
    desc: "Apresiasi keikutsertaan aktif dalam berbagai kegiatan seminar teknologi nasional dan workshop pengembangan soft skill/hard skill mahasiswa yang diadakan oleh UBSI.",
    skills: [
      "Partisipasi seminar teknologi informasi skala nasional",
      "Peningkatan wawasan mengenai tren teknologi industri digital terbaru",
      "Penerapan pemikiran analitis dalam pemecahan masalah kasus industri",
      "Pengembangan jejaring profesional mahasiswa antar universitas"
    ],
    verifyUrl: "https://saysv2.bsi.ac.id/pdf/sertifikatdigitalmhs/eyJpdiI6IlpSNXBzRHJINTQzaGtGOTF5S0Q3ZFE9PSIsInZhbHVlIjoiK0Erd0NPbU5UZG5zZFF3MExtODQ4Zz09IiwibWFjIjoiMmRiOGI1MDkzMzQ5ZTFmMGFlOTRjMGE3YTVhYWEwYzEyOTQxNjhjNTI4NzU1YWZjYjEzZjRkZWU4MjFhOTE1ZCIsInRhZyI6IiJ9"
  },
  kompetensi: {
    title: "Sertifikat Kompetensi & Pelatihan Mahasiswa",
    issuer: "Universitas Bina Sarana Informatika",
    date: "Akademik Mahasiswa",
    badge: "award",
    desc: "Sertifikat kelulusan uji kompetensi mata kuliah inti program studi Informatika yang diselenggarakan oleh UBSI, mencakup keahlian pemrograman komputer.",
    skills: [
      "Kelulusan evaluasi kompetensi pemrograman komputer terapan",
      "Penyelesaian studi kasus logika pemrograman dengan standar industri",
      "Pemahaman metodologi pengembangan perangkat lunak secara runut",
      "Dokumentasi kode program secara baik dan profesional"
    ],
    verifyUrl: "https://saysv2.bsi.ac.id/pdf/sertifikatdigitalmhs/eyJpdiI6ImY0SmdtOUYreDVYYXlLSmx6MzZ1NWc9PSIsInZhbHVlIjoiOW5Ubi9TYzRHMnVlSHQrcHQwbVRmQT09IiwibWFjIjoiMmFhNWFkOWY2M2U0M2QwMTE5NDNhZmIyMmNjYmE5NjAyOGYyYzg3ODk5NDdiZjBlOWFiNWFkYWViNzY1NGUwOSIsInRhZyI6IiJ9"
  },
  akademik: {
    title: "Sertifikat Program Sertifikasi & Akademik",
    issuer: "Universitas Bina Sarana Informatika",
    date: "Sertifikasi Profesi",
    badge: "award",
    desc: "Sertifikasi kelulusan program sertifikasi profesi akademik khusus yang diadakan untuk memvalidasi kesiapan mahasiswa informatika memasuki dunia kerja profesional.",
    skills: [
      "Validasi kompetensi teknis bidang informatika terstandar",
      "Pemahaman konsep dasar manajemen proyek teknologi informasi",
      "Kepatuhan etika profesi IT dan regulasi keamanan informasi digital",
      "Analisis kelayakan implementasi solusi digital instansi"
    ],
    verifyUrl: "https://saysv2.bsi.ac.id/pdf/sertifikatdigitalmhs/eyJpdiI6IktTK04rYUxsUHFVTlhkSmJ3MmIxT1E9PSIsInZhbHVlIjoiUWVjRDFHMlRhTTErNGl6UDdDYWRrQT09IiwibWFjIjoiOGU0ZTlmYzE2NTBhNmU3MWFiMGU3ZmFkMjM1YzJkMzkzMDQyMGY4YzFiZmRkNTc2YWVhNGIxZTEwNmI4ZmE2ZCIsInRhZyI6IiJ9"
  }
};

/* ---------- BLOG ARTICLES DATA ---------- */
const blogArticles = {
  "ldr-sensor": {
    title: "IoT Hidroponik: Otomatisasi Atap Akrilik Buka Tutup Berbasis Sensor Cahaya LDR & ESP8266",
    category: "Teknologi & IoT",
    date: "12 Agu 2026",
    content: `
      <p>Kunci keberhasilan sistem hidroponik modern sangat bergantung pada kontrol lingkungan yang presisi, di mana intensitas cahaya menjadi salah satu faktor krusial yang memengaruhi laju fotosintesis. Di sini kita akan membahas rancangan proyek "IoT Hidroponik Menggunakan Sensor Cahaya dan Atap Akrilik Buka Tutup" untuk mengontrol pencahayaan secara otomatis dan adaptif.</p>
      
      <h3>1. Arsitektur Perangkat Keras</h3>
      <p>Sistem ini mengombinasikan sensor fisik, pengontrol nirkabel, dan aktuator fisik:</p>
      <ul>
        <li><strong>Sensor Cahaya LDR:</strong> Mendeteksi tingkat intensitas cahaya lingkungan.</li>
        <li><strong>Mikrokontroler ESP8266 (NodeMCU):</strong> Memproses data sensor dan menghubungkan sistem ke platform IoT (Firebase/Telegram/Websocket).</li>
        <li><strong>Motor Servo SG90:</strong> Menggerakkan engsel atap akrilik pelindung untuk membuka/menutup berdasarkan masukan intensitas cahaya.</li>
      </ul>

      <h3>2. Kendala ADC ESP8266 & Penyebabnya</h3>
      <p>Saat merakit sirkuit, kendala utama adalah pembacaan LDR analog yang berfluktuasi liar atau mengalami <em>clipping</em> (nilai mentok di batas atas). Hal ini disebabkan oleh keterbatasan pin ADC A0 pada ESP8266 NodeMCU yang hanya mampu menerima tegangan maksimal <strong>1.0 Volt</strong>.</p>

      <blockquote>
        <strong>Penyebab Clipping:</strong> Menggunakan pin sumber tegangan 5V dan resistor pembagi yang salah akan menyebabkan tegangan keluaran analog melebihi 1V, sehingga sirkuit analog-to-digital (ADC) mengalami saturasi.
      </blockquote>

      <h3>3. Solusi Optimalisasi & Kode Arduino IDE</h3>
      <p>Masalah tersebut diselesaikan melalui langkah optimasi sirkuit dan program:</p>
      <ol>
        <li><strong>Rangkaian Pembagi Tegangan:</strong> Menghubungkan LDR ke pin <strong>3.3V (3V3)</strong> NodeMCU (bukan 5V) dan menggunakan resistor seri bernilai <strong>4.7kΩ hingga 10kΩ</strong> agar tegangan analog ke pin A0 selalu berada di bawah 1.0V.</li>
        <li><strong>Algoritma Averaging (Penyaringan Sinyal):</strong> Di dalam kode program, pembacaan analog diulang sebanyak 15 kali secara berurutan dalam jeda milidetik, lalu dihitung nilai rata-ratanya untuk meredam gangguan noise listrik.</li>
      </ol>

      <p>Berikut adalah cuplikan kode implementasi penyaringan sensor dan pergerakan servo di Arduino IDE:</p>

      <pre><code>#include &lt;Servo.h&gt;

const int ldrPin = A0;
Servo atapServo;

// Rentang pembacaan aman
const int THRESHOLD_TERANG = 600; 
const int SERVO_BUKA = 90;
const int SERVO_TUTUP = 0;

void setup() {
  atapServo.attach(2); // Servo terhubung ke pin D4 (GPIO2)
  pinMode(ldrPin, INPUT);
  Serial.begin(115200);
}

void loop() {
  // Algoritma Averaging Filter (15 kali pembacaan)
  long sum = 0;
  for(int i = 0; i &lt; 15; i++) {
    sum += analogRead(ldrPin);
    delay(10);
  }
  int avgLdrValue = sum / 15;

  Serial.print("Intensitas Cahaya Rata-rata: ");
  Serial.println(avgLdrValue);

  // Logika kontrol atap akrilik
  if (avgLdrValue &gt; THRESHOLD_TERANG) {
    // Jika terlalu panas/terang, tutup atap akrilik untuk mencegah daun terbakar
    atapServo.write(SERVO_TUTUP);
    Serial.println("Atap DITUTUP (Melindungi Tanaman)");
  } else {
    // Jika mendung/teduh, buka atap agar tanaman mendapat cahaya optimal
    atapServo.write(SERVO_BUKA);
    Serial.println("Atap DIBUKA (Pencahayaan Maksimal)");
  }

  delay(2000); // Evaluasi kondisi setiap 2 detik
}</code></pre>

      <h3>4. Integrasi Monitoring IoT</h3>
      <p>Data rata-rata sensor cahaya dan status posisi servo ditransmisikan ke Firebase Database melalui koneksi Wi-Fi onboard ESP8266. Dari sana, status ditampilkan secara real-time pada dashboard web (React/Tailwind) dan notifikasi kondisi darurat dikirim langsung ke chat group Telegram pengguna via Telegram Bot API.</p>
    `
  },
  "subnetting-ccna": {
    title: "Panduan Praktis Subnetting IP Address Kelas C: Dari Teori ke Cisco Packet Tracer",
    category: "Jaringan Komputer",
    date: "28 Jul 2026",
    content: `
      <p>Subnetting adalah proses membagi satu jaringan fisik besar menjadi beberapa sub-jaringan logis yang lebih kecil (subnet). Sebagai network engineer atau pemegang sertifikasi CCNA, menguasai perhitungan subnetting baik dengan metode FLSM (Fixed Length Subnet Mask) maupun VLSM (Variable Length Subnet Mask) adalah kompetensi yang mutlak diperlukan.</p>
      
      <h3>1. Mengapa Perlu Subnetting?</h3>
      <ul>
        <li><strong>Efisiensi IP Address:</strong> Menghindari pemborosan alokasi IP address yang tidak terpakai.</li>
        <li><strong>Keamanan:</strong> Membatasi lalu lintas siaran (broadcast domain) antar divisi kerja di perusahaan.</li>
        <li><strong>Kemudahan Manajemen:</strong> Mempermudah melacak letak kesalahan konektivitas jaringan komputer.</li>
      </ul>

      <h3>2. Rumus Dasar Kalkulasi Subnetting</h3>
      <p>Untuk melakukan perhitungan, kita menggunakan 2 rumus dasar matematika biner:</p>
      <ul>
        <li><strong>Jumlah Subnet:</strong> <code>2<sup>x</sup></code>, di mana <code>x</code> adalah banyaknya biner 1 yang dipinjam dari host ID.</li>
        <li><strong>Jumlah Host per Subnet:</strong> <code>2<sup>y</sup> - 2</code>, di mana <code>y</code> adalah sisa biner 0 pada bit host ID (dikurangi 2 untuk Network ID dan Broadcast ID).</li>
      </ul>

      <h3>3. Contoh Perhitungan Kelas C (/26)</h3>
      <p>Diberikan blok IP <code>192.168.1.0/26</code>. Berapakah subnet mask, jumlah subnet, host per subnet, network ID, dan IP broadcast?</p>
      <ul>
        <li><strong>Subnet Mask:</strong> Prefix /26 setara dengan biner <code>11111111.11111111.11111111.11000000</code> -&gt; <code>255.255.255.192</code>.</li>
        <li><strong>Jumlah Subnet:</strong> Bit yang dipinjam adalah 2 (angka biner 1 di oktet terakhir). Maka <code>2<sup>2</sup> = 4</code> subnet.</li>
        <li><strong>Jumlah Host:</strong> Sisa bit 0 adalah 6. Maka <code>2<sup>6</sup> - 2 = 62</code> host yang dapat digunakan per subnet.</li>
        <li><strong>Blok Subnet:</strong> Rentang kelipatan ditentukan dengan <code>256 - 192 = 64</code>. Blok subnetnya adalah: <code>0, 64, 128, 192</code>.</li>
      </ul>

      <h3>4. Implementasi Perangkat Switch & Router Cisco</h3>
      <p>Berikut konfigurasi dasar pada CLI router Cisco untuk menetapkan IP gateway subnet pertama:</p>
      <pre><code>Router&gt; <span class="code-function">enable</span>
Router# <span class="code-function">configure terminal</span>
Router(config)# <span class="code-function">interface</span> GigabitEthernet0/0
Router(config-if)# <span class="code-function">ip address</span> 192.168.1.1 255.255.255.192
Router(config-if)# <span class="code-function">no shutdown</span>
Router(config-if)# <span class="code-function">exit</span></code></pre>

      <p>Pengujian akhir dapat dilakukan di simulator Cisco Packet Tracer dengan mengirimkan paket ICMP ping antar komputer dalam subnet yang sama untuk memastikan status terkoneksi.</p>
    `
  }
};

/* ---------- INTERACTIVE CERTIFICATE MODAL ---------- */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const overlay = document.getElementById('cert-modal-overlay');
  const closeBtn = document.getElementById('cert-modal-close');
  
  if (!modal) return;

  const sheetTitle = document.getElementById('cert-sheet-title');
  const sheetDesc = document.getElementById('cert-sheet-desc');
  const sheetIssuer = document.getElementById('cert-sheet-issuer');
  const sheetDate = document.getElementById('cert-sheet-date');
  const modalBadge = document.getElementById('cert-modal-badge');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalDesc = document.getElementById('cert-modal-desc');
  const modalDate = document.getElementById('cert-modal-date');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalSkills = document.getElementById('cert-modal-skills');
  const verifyLink = document.getElementById('cert-modal-link-verify');

  function openModal(certId) {
    const data = certificateDetails[certId];
    if (!data) return;

    // Set mockup certificate sheet values
    sheetTitle.textContent = data.title;
    sheetDesc.textContent = data.desc;
    sheetIssuer.textContent = data.issuer;
    sheetDate.textContent = data.date;

    // Set simple details values
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalIssuer.textContent = data.issuer;
    modalDate.textContent = data.date;

    // Inject verified skills list
    modalSkills.innerHTML = '';
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      modalSkills.appendChild(li);
    });

    // Setup verification action click handler
    verifyLink.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(data.verifyUrl, '_blank', 'noopener');
    };

    // Open Modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Refresh icons inside modal
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click handlers to certificate cards
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    const certId = card.getAttribute('data-cert');
    if (!certId) return;

    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(certId);
    });
  });

  // Bind close events
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') {
      closeModal();
    }
  });
}

/* ---------- INTERACTIVE BLOG MODAL ---------- */
function initBlogModal() {
  const modal = document.getElementById('blog-modal');
  const overlay = document.getElementById('blog-modal-overlay');
  const closeBtn = document.getElementById('blog-modal-close');
  
  if (!modal) return;

  const modalBadge = document.getElementById('blog-modal-badge');
  const modalDate = document.getElementById('blog-modal-date');
  const modalTitle = document.getElementById('blog-modal-title');
  const modalText = document.getElementById('blog-modal-text');

  function openModal(blogId) {
    const data = blogArticles[blogId];
    if (!data) return;

    // Set modal fields
    modalBadge.textContent = data.category;
    modalDate.innerHTML = `<i data-lucide="calendar" style="width:14px; height:14px; margin-right:4px; vertical-align:middle;"></i> ${data.date}`;
    modalTitle.textContent = data.title;
    modalText.innerHTML = data.content;

    // Open Modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Refresh icons inside modal
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click handlers to read more links and cards
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    const blogId = card.getAttribute('data-blog');
    if (!blogId) return;

    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(blogId);
    });
  });

  // Bind close events
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') {
      closeModal();
    }
  });
}
