// Creative Showcase - Auto-rotating gallery with crossfade
class CreativeShowcase {
  constructor(container) {
    this.container = container;
    this.pieces = container.querySelectorAll('.creative__piece');
    this.currentIndex = 0;
    this.intervalId = null;
    this.interval = 8000; // 8 seconds
    this.isPaused = false;

    if (this.pieces.length === 0) return;

    this.init();
  }

  init() {
    // Set initial state
    this.pieces.forEach((piece, index) => {
      piece.classList.toggle('active', index === 0);
    });

    // Create navigation controls
    this.createControls();

    // Start auto-rotation
    this.startRotation();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'creative__controls';
    controls.innerHTML = `
      <button class="creative__nav creative__nav--prev" aria-label="Previous piece">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      <div class="creative__indicators"></div>
      <button class="creative__nav creative__nav--next" aria-label="Next piece">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>
    `;

    // Add indicators
    const indicators = controls.querySelector('.creative__indicators');
    this.pieces.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'creative__indicator' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to piece ${index + 1}`);
      dot.addEventListener('click', () => this.goTo(index));
      indicators.appendChild(dot);
    });

    // Add navigation listeners
    controls.querySelector('.creative__nav--prev').addEventListener('click', () => this.prev());
    controls.querySelector('.creative__nav--next').addEventListener('click', () => this.next());

    this.container.appendChild(controls);
    this.indicators = controls.querySelectorAll('.creative__indicator');
  }

  startRotation() {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.interval);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  next() {
    this.goTo((this.currentIndex + 1) % this.pieces.length);
  }

  prev() {
    this.goTo((this.currentIndex - 1 + this.pieces.length) % this.pieces.length);
  }

  goTo(index) {
    if (index === this.currentIndex) return;

    // Update pieces
    this.pieces[this.currentIndex].classList.remove('active');
    this.pieces[index].classList.add('active');

    // Update indicators
    if (this.indicators) {
      this.indicators[this.currentIndex].classList.remove('active');
      this.indicators[index].classList.add('active');
    }

    this.currentIndex = index;
  }

  handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      this.prev();
    } else if (e.key === 'ArrowRight') {
      this.next();
    }
  }
}

// Initialize when DOM is ready
const initCreativeShowcase = () => {
  const showcase = document.querySelector('.creative__showcase');
  if (showcase) {
    new CreativeShowcase(showcase);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCreativeShowcase);
} else {
  initCreativeShowcase();
}
