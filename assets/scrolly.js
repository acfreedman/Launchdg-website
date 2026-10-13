// Scroll-driven hangar drawing on the home page. As the visitor scrolls through
// #building, the elevation draws itself in four phases: shell, glass, door
// (which rises to show a jet inside), then the roof deck and dimensions.
// Without JS, or with reduced motion, the finished drawing shows as a still.
(function () {
  var root = document.querySelector('.scrolly');
  if (!root || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  var track = root.querySelector('.scrolly-track');
  var steps = root.querySelectorAll('.scrolly-steps li');
  var now = root.querySelector('.scrolly-now');
  var bar = root.querySelector('.scrolly-bar span');
  var q = function (phase) { return root.querySelectorAll('[data-phase="' + phase + '"]'); };
  var shell = q('shell'), glass = q('glass'), jet = q('jet'), door = q('door'), deck = q('deck'), dims = q('dims');

  // Progress of p through the window [a, b], clamped to 0..1.
  function seg(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
  function draw(els, v) {
    els.forEach(function (g) {
      var lines = g.hasAttribute('pathLength') ? [g] : g.querySelectorAll('[pathLength]');
      lines.forEach(function (el) { el.style.strokeDashoffset = 1 - v; });
    });
  }
  function fade(els, v) { els.forEach(function (el) { el.style.opacity = v; }); }

  var active = -1, ticking = false;
  function update() {
    ticking = false;
    var r = track.getBoundingClientRect();
    var p = seg(-r.top, 0, r.height - window.innerHeight);

    draw(shell, seg(p, 0.02, 0.24));
    fade(glass, seg(p, 0.26, 0.42));
    var d = seg(p, 0.5, 0.74);
    door.forEach(function (g) { g.setAttribute('transform', 'translate(0 ' + (-116 * d).toFixed(1) + ')'); });
    fade(door, seg(p, 0.12, 0.26));
    fade(jet, seg(p, 0.48, 0.66));
    draw(deck, seg(p, 0.76, 0.9));
    fade(dims, seg(p, 0.86, 0.98));
    bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';

    var i = Math.min(steps.length - 1, Math.floor(p * steps.length));
    if (i !== active) {
      steps.forEach(function (li, n) { li.classList.toggle('is-on', n === i); });
      now.textContent = '0' + (i + 1);
      active = i;
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  root.classList.add('is-live');
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
