/**
 * ============================================================
 * ALEX MORGAN - PORTFOLIO INTERACTION ENGINE
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COPYRIGHT YEAR
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. THEME SWITCHER (DARK / LIGHT MODE)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.replace('dark-theme', 'light-theme');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.body.classList.replace('light-theme', 'dark-theme');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  // 3. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close mobile menu on clicking any nav item
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
      }
    });
  });

  // 4. SCROLL PROGRESS & BACK TO TOP BUTTON
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / scrollHeight) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Toggle Back to Top button
    if (scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Section Tracking
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetNavLink) {
          navLinks.forEach(item => item.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 5. TYPED TEXT EFFECT
  const typedTextEl = document.getElementById('typed-text');
  const roles = [
    'Full Stack Engineer',
    'React & Node.js Developer',
    'UI/UX Enthusiast',
    'Cloud Architecture Builder',
    'Creative Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  if (typedTextEl) {
    typeEffect();
  }

  // 6. ANIMATED COUNTER ON SCROLL (STATS)
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          let current = 0;
          const increment = Math.ceil(target / 45);

          const updateCount = () => {
            current += increment;
            if (current < target) {
              stat.textContent = `${current}+`;
              setTimeout(updateCount, 30);
            } else {
              stat.textContent = target === 100 ? `${target}%` : `${target}+`;
            }
          };

          updateCount();
        });
        animated = true;
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.about-stats-container');
  if (statsSection) {
    countObserver.observe(statsSection);
  }

  // 7. PROJECT FILTERING
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 8. PROJECT MODAL DATA & HANDLERS
  const projectData = {
    1: {
      tag: 'Full Stack & Observability',
      title: 'DevMetrics Analytics Platform',
      desc: 'DevMetrics is an enterprise-grade engineering intelligence platform that aggregates continuous integration runs, Git pull request turnaround, and microservice latency metrics into an actionable command center.',
      features: [
        'Real-time streaming pipeline processing 10k+ metric events per minute',
        'Interactive data visualizer built with D3.js and Chart.js',
        'Role-based access control (RBAC) with Supabase authentication',
        'Automated Slack and webhook alerting for deployment rollbacks'
      ],
      tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Redis'],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    2: {
      tag: 'Frontend E-Commerce',
      title: 'Aura Luxury Ecommerce',
      desc: 'Aura is a modern headless e-commerce experience designed for high conversion and buttery-smooth browsing. Featuring client-side state management with Redux, optimistic cart updates, and instant search.',
      features: [
        'Sub-100ms client search with fuzzy text matching',
        'Custom multi-currency checkout workflow integrated with Stripe',
        'Accessible color palettes complying with WCAG 2.1 AA standards',
        'Fluid gestures and page transitions powered by Framer Motion'
      ],
      tech: ['React 18', 'Redux Toolkit', 'Stripe Elements', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    3: {
      tag: 'Full Stack & AI',
      title: 'Synapse AI Note Assistant',
      desc: 'Synapse transforms disorganized thoughts into connected knowledge graphs. By utilizing vector embeddings and semantic search, users can query their personal library in conversational plain English.',
      features: [
        'Automatic topic clustering and entity extraction with OpenAI embeddings',
        'Markdown editor with syntax highlighting, math equations, and diagram preview',
        'Offline-first synchronization using IndexedDB and WebSockets',
        'Export options for PDF, HTML, and Notion sync'
      ],
      tech: ['Node.js', 'Express', 'OpenAI API', 'MongoDB Atlas', 'Pinecone Vector DB'],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    4: {
      tag: 'Mobile & Weather API',
      title: 'Atmosphere Microclimate Radar',
      desc: 'An ultra-precise microclimate radar application that delivers minute-by-minute precipitation forecasts, air quality alerts, and ultraviolet index warnings tailored to specific neighborhood coordinates.',
      features: [
        'Interactive animated precipitation radar map with playback control',
        'Push notifications for impending heavy rain and severe weather alerts',
        'Caching layer on Redis reducing upstream external API calls by 80%',
        'Adaptive dark mode designed for clear outdoor daytime visibility'
      ],
      tech: ['React Native', 'FastAPI (Python)', 'OpenWeatherMap API', 'Redis', 'Mapbox GL'],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const viewDetailBtns = document.querySelectorAll('.view-details-btn');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="modal-header-badge">${data.tag}</span>
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      
      <h4 style="margin-top: 1.2rem; font-size: 1.05rem;">Key Highlights:</h4>
      <ul class="modal-feature-list">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 style="margin-top: 1.2rem; font-size: 1.05rem;">Technologies Used:</h4>
      <div class="project-tags" style="margin-top: 0.6rem;">
        ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Website
        </a>
        <a href="${data.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 9. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(msg, isSuccess = true) {
    if (toastTimer) clearTimeout(toastTimer);
    
    toastMessage.textContent = msg;
    const toastIcon = toast.querySelector('.toast-icon i');
    if (isSuccess) {
      toastIcon.className = 'fa-solid fa-circle-check';
      toast.style.borderColor = '#10b981';
    } else {
      toastIcon.className = 'fa-solid fa-circle-exclamation';
      toast.style.borderColor = '#ef4444';
    }

    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // 10. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully.');
      }, 1200);
    });
  }

  // 11. RESUME DOWNLOAD TRIGGER
  const resumeBtn = document.getElementById('cv-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Resume download started! (Demo placeholder)');
    });
  }
});
