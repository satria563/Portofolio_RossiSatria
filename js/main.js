/* ============================================
   MAIN.JS — Rossi Satria Portfolio
   Vanilla JavaScript — All Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initProjectFilter();
  initSkillBars();
  initActiveNavHighlight();
  initContactForm();
  initCardGlow();
  initProjectModal();
  initFooterTime();
  initBackToTop();

  // Smooth page load fade-in
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileOverlay = document.querySelector('.navbar__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

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

  function updateActiveLink() {
    // If scrolled to the bottom of page, force highlight the Contact section
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    if (isAtBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
      mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
      return;
    }

    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial call
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

  const cards = document.querySelectorAll('.project-card, .skill-card');
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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

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
