// When the DOM content has loaded, set up the theme toggle and
// magnifying lens behaviours.
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const lens = document.getElementById('lens');
  const lensContent = document.getElementById('lens-content');
  const pageContent = document.getElementById('page-content');

  // Clone the page content into the lens so we can scale it independently.
  // Cloning ensures that the lens does not recursively contain itself.
  const clone = pageContent.cloneNode(true);
  // Remove IDs from the cloned tree to avoid duplicates and ensure no IDs
  // conflict with the original DOM. We traverse the clone and strip id
  // attributes.
  clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  lensContent.appendChild(clone);

  // Handle theme toggling. Toggling the data-theme attribute on the root
  // element automatically updates the CSS variables defined in styles.css.
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
  });

  // Define the zoom factor for the magnifying lens. A value of 1.5 enlarges
  // text moderately while preserving readability.
  const zoomFactor = 1.5;

  function moveLens(event) {
    // Mouse coordinates relative to the viewport
    const x = event.clientX;
    const y = event.clientY;
    const lensRect = lens.getBoundingClientRect();

    // Position the lens so its centre sits under the cursor
    const lensWidth = lensRect.width;
    const lensHeight = lensRect.height;
    lens.style.left = `${x - lensWidth / 2}px`;
    lens.style.top = `${y - lensHeight / 2}px`;

    // Compute the translation needed so that the point under the cursor in the
    // original page appears at the centre of the lens after scaling. We
    // incorporate the scroll offsets because clientX/Y are viewport relative.
    const pageX = x + window.pageXOffset;
    const pageY = y + window.pageYOffset;
    const translateX = zoomFactor * pageX - lensWidth / 2;
    const translateY = zoomFactor * pageY - lensHeight / 2;

    // Apply the transform to the cloned content. We first translate to
    // position the correct area under the lens, then scale up the content.
    lensContent.style.transform = `translate(-${translateX}px, -${translateY}px) scale(${zoomFactor})`;

    // Reveal the lens the first time the cursor moves over the page
    if (lens.style.visibility !== 'visible') {
      lens.style.visibility = 'visible';
    }
  }

  // Track the last mouse position so we can recalculate the lens content on scroll.
  let lastX = 0;
  let lastY = 0;

  // Update the lens position and transformation whenever the mouse moves.
  document.addEventListener('mousemove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    moveLens(e);
  });

  // When scrolling, recalculate the translation based on the last mouse position
  // so the magnification remains aligned with the viewport.
  document.addEventListener('scroll', () => {
    const fakeEvent = { clientX: lastX, clientY: lastY };
    moveLens(fakeEvent);
  });
});