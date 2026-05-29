export function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          'opacity-0',
          'translate-y-4',
          'translate-y-8',
          'translate-y-12',
          '-translate-y-8',
          '-translate-x-8',
          'translate-x-8',
          'lg:-translate-x-8',
          'lg:translate-x-8',
          'scale-95'
        );
        entry.target.classList.add(
          'opacity-100',
          'translate-y-0',
          'translate-x-0',
          'lg:translate-x-0',
          'lg:translate-y-0',
          'scale-100'
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
