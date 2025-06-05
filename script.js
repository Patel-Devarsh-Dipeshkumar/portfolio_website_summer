// Global Variables
const currentSection = "profile";
const isAnimating = false;
let typingInterval;
let statsAnimated = false;
const skillsAnimated = false;

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const buttons = document.querySelectorAll("[data-section]");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelector(".menu-links");
const contactForm = document.getElementById("contact-form");

// Typing Animation Texts
const typingTexts = [
  
  "an Engineer",
  "Trying to Engineer Luck lol",
  "a Problem Solver",
  "a Tech Enthusiast",
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  // Show loading screen
  showLoadingScreen();

  // Initialize theme
  initializeTheme();

  // Initialize navigation
  initializeNavigation();

  // Initialize animations
  initializeAnimations();

  // Initialize form
  initializeContactForm();

  // Initialize scroll effects
  initializeScrollEffects();

  // Initialize particles
  initializeParticles();

  // Hide loading screen after delay and start typing
  setTimeout(() => {
    hideLoadingScreen();
    startTypingAnimation();
  }, 2500);
}

// Loading Screen
function showLoadingScreen() {
  const progress = document.querySelector(".loader-progress");
  let width = 0;

  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
    }
    progress.style.width = width + "%";
  }, 100);
}

function hideLoadingScreen() {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector(".theme-icon");
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Navigation
function initializeNavigation() {
  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuLinks.contains(e.target) && !hamburgerIcon.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavOnScroll);
}

function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    closeMobileMenu();
  }
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll(".section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all nav links
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to current section's nav link
      const activeLink = document.querySelector(`[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// Mobile Menu
function toggleMenu() {
  hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");

  // Prevent body scroll when menu is open
  if (menuLinks.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMobileMenu() {
  hamburgerIcon.classList.remove("open");
  menuLinks.classList.remove("open");
  document.body.style.overflow = "";
}

// Typing Animation
function startTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Stats Animation
function animateStats() {
  if (statsAnimated) return;

  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 20);
  });

  statsAnimated = true;
}

// Scroll Effects
function initializeScrollEffects() {
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Show/hide back to top button
    if (currentScrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Animate stats when about section is in view
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
        animateStats();
      }
    }

    lastScrollY = currentScrollY;
  });

  // Back to top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Contact Form
function initializeContactForm() {
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;

  submitButton.innerHTML = "<span>Sending...</span>";
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.innerHTML = "<span>Message Sent!</span>";
    contactForm.reset();

    setTimeout(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  }, 1500);
}

// Particles Background
function initializeParticles() {
  const particlesContainer = document.getElementById("particles-bg");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = Math.random() * 4 + 1 + "px";
  particle.style.height = particle.style.width;
  particle.style.background = `rgba(99, 102, 241, ${
    Math.random() * 0.3 + 0.1
  })`;
  particle.style.borderRadius = "50%";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animation = `float ${
    Math.random() * 20 + 10
  }s linear infinite`;

  container.appendChild(particle);
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    ".about-card, .skills-category, .project-card, .contact-card, .skill-badge"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
  });
}

// Performance Optimizations
function optimizeImages() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=400&width=400";
    });
  });
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
});

// Initialize optimizations
document.addEventListener("DOMContentLoaded", () => {
  optimizeImages();
});

// Add CSS animation for floating particles
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
