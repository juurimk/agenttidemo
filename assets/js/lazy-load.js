/**
 * Lightweight lazy loader for data-src images.
 */
(function() {
  function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.remove('lazy-image');
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('lazy-image');
        observer.observe(img);
      });
    });
  } else {
    // Fallback: load immediately
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img[data-src]').forEach(loadImage);
    });
  }
})();
