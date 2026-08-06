/* ============================================
   MAIN.JS — Rossi Satria Portfolio
   Vanilla JavaScript — All Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initProjectFilter();
  initSkillBars();
  initActiveNavHighlight();
  initContactForm();
  initCardGlow();
});

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileOverlay = document.querySelector('.navbar__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
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
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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

    // Reset button state after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      lucide.createIcons();
    }, 3000);
  });
}

/* ---------- INTERACTIVE CARD GLOW (SPOTLIGHT) ---------- */
function initCardGlow() {
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
