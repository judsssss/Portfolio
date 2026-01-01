// Profile picture functionality
const profilePic = document.querySelector(".profile-pic");

// When clicked — show the clicked image
profilePic.addEventListener("click", () => {
  profilePic.classList.add("clicked");
});

// When mouse leaves — return to default (img1)
profilePic.addEventListener("mouseleave", () => {
  profilePic.classList.remove("clicked");
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);

// Update toggle icon based on current theme
function updateToggleIcon() {
  const theme = body.getAttribute("data-theme");
  const icon = themeToggle.querySelector("i");

  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

// Initialize icon
updateToggleIcon();

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggleIcon();
});

// SIMPLE & ELEGANT RIPPLE EFFECT

const banner = document.getElementById("banner");
const canvas = document.getElementById("ripple-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
function resizeCanvas() {
  canvas.width = banner.offsetWidth;
  canvas.height = banner.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Simple, clean ripple class
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 120;
    this.speed = 2.5;
    this.opacity = 1;
  }

  update() {
    this.radius += this.speed;
    this.opacity = 1 - this.radius / this.maxRadius;
  }

  draw() {
    // Check current theme
    const theme = document.body.getAttribute("data-theme");
    const isLight = theme === "light";

    // Main ripple ring
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    if (isLight) {
      // Dark ripples for light mode
      ctx.strokeStyle = `rgba(30, 41, 59, ${this.opacity * 0.6})`;
      ctx.lineWidth = 3;
    } else {
      // Light ripples for dark mode
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
      ctx.lineWidth = 2;
    }
    ctx.stroke();

    // Inner subtle ring
    if (this.radius > 10) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2);

      if (isLight) {
        // Dark blue ring for light mode
        ctx.strokeStyle = `rgba(59, 130, 246, ${this.opacity * 0.5})`;
        ctx.lineWidth = 2;
      } else {
        // Light blue ring for dark mode
        ctx.strokeStyle = `rgba(200, 230, 255, ${this.opacity * 0.3})`;
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }
  }

  isFinished() {
    return this.radius >= this.maxRadius;
  }
}

let ripples = [];

// Create ripple on mousemove
let lastRippleTime = 0;
banner.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastRippleTime > 100) {
    const rect = banner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripples.push(new Ripple(x, y));
    lastRippleTime = now;
  }
});

// Create larger ripple on click
banner.addEventListener("click", (e) => {
  const rect = banner.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const bigRipple = new Ripple(x, y);
  bigRipple.maxRadius = 180;
  bigRipple.speed = 3;
  ripples.push(bigRipple);
});

// Clean animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples = ripples.filter((ripple) => {
    ripple.update();
    ripple.draw();
    return !ripple.isFinished();
  });

  requestAnimationFrame(animate);
}
animate();

// SIMPLE SCROLL ANIMATIONS

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Download CV - Opens in new tab and triggers download
function openAndDownload(event) {
  event.preventDefault(); // Stop normal link behavior

  const fileUrl = "img/Judito_Pepito_CV.pdf";

  //  Open CV in a new tab
  window.open(fileUrl, "_blank");

  // Automatically trigger download
  setTimeout(() => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Judito_N_Pepito_Jr_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 500); // Small delay to ensure new tab opens first
}

// POPUP NAVIGATION BAR + HEADER HIDE/SHOW ON SCROLL
const popupNav = document.getElementById("popupNav");
const headerNav = document.querySelector(".header-nav");
const scrollThreshold = 50; // Show popup after scrolling 50px

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;

  if (currentY > scrollThreshold) {
    // Scrolled down: hide header, show popup
    headerNav.classList.add("header-hidden");
    popupNav.classList.add("visible");
  } else {
    // At top: show header, hide popup
    headerNav.classList.remove("header-hidden");
    popupNav.classList.remove("visible");
  }
});

// Smooth scroll for popup nav links
document.querySelectorAll(".popup-nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
