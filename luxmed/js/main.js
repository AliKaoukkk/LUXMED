const CONFIG = {
  whatsappNumber: "96170765950",
  whatsappMessage: "Hello LUXMED, I'd like to book an appointment.",
  phone: "+96170765950",
  email: "contact@luxmed-lb.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ghobeiry%2C+Beirut%2C+Lebanon",
};

// ---------- Links from config ----------
const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  a.href = waUrl;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-maps]").forEach((a) => {
  a.href = CONFIG.mapsUrl;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-phone]").forEach((a) => (a.href = `tel:${CONFIG.phone}`));
document.querySelectorAll("[data-email]").forEach((a) => (a.href = `mailto:${CONFIG.email}`));

document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Highlight current section in nav ----------
const navLinks = [...nav.querySelectorAll('ul a[href^="#"]')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => observer.observe(s));
