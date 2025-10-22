function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.classList.toggle("show");
}

// Smooth scrolling for internal links
document.addEventListener('click', function (e) {
  const target = e.target;
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
    const id = target.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu when a link is clicked
      const nav = document.getElementById('navLinks');
      if (nav && nav.classList.contains('show')) nav.classList.remove('show');
    }
  }
});

// Guarded emailjs usage: only attempt send when configured
if (typeof emailjs !== 'undefined') {
  // Replace with actual form handling if needed; left as-is but guarded
  try {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        // If user has configured EmailJS, send the form, otherwise show a friendly message
        if (emailjs.init) {
          // Note: user must replace service/template IDs in HTML or here
          emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(() => alert('Message sent successfully!'))
            .catch(() => alert('Failed to send message.'));
        } else {
          alert('Form submission is disabled because EmailJS is not initialized.');
        }
      });
    }
  } catch (e) {
    // fail silently in case of unexpected errors
    console.warn('Email handler setup failed', e);
  }
}
