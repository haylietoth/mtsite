$(document).ready(function(){

  // mobile layout check
  function isMobileLayout() {
    return window.matchMedia('(max-width: 1023px)').matches;
  }

  function isSmallestLayout() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  // hamburger Menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
          spans[0].style.transform = 'translateY(7px) rotate(45deg)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      }
  });

  // slideshow logic
  function initSlideshow(container) {
      const images = container.querySelectorAll('.slideshow-image');
      let currentIndex = 0;
      setInterval(() => {
          images[currentIndex].classList.remove('active');
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('active');
      }, 5000);
  }
  document.querySelectorAll('.slideshow').forEach(initSlideshow);

  // wordmark animation
  const letter = document.getElementById('letters');

  function updateWordmark() {

    let padding = 0.03;
     if (isSmallestLayout()) {
      padding = 0.09;
     }

    const scrollY = window.scrollY;
    const panel = document.getElementById('hero-image-panel');
    const panelRect = panel.getBoundingClientRect();
    const progress = Math.min(scrollY / 500, 1);
    const lerp = (start, end, t) => start + (end - start) * t;
    const displaySize = panelRect.width * 0.32;
    const pinnedSize = 21;
    const currentSize = lerp(displaySize, pinnedSize, progress);
    const currentFont = lerp(displaySize, 14, progress);
    const targetMargin = 40;
    const targetY = targetMargin;
    const targetE_X = window.innerWidth - targetMargin - pinnedSize * 0.8;
    const targetG_X = targetE_X - pinnedSize * 0.9;
    const target_X = targetG_X - pinnedSize * 1.1;
    const bottomMargin = panelRect.height * padding;
    const startY = panelRect.bottom + scrollY - bottomMargin;
    const colWidth = panelRect.width;
    const start_X = panelRect.left;
    const curr_X = lerp(start_X, target_X, progress);
    const curr_Y = lerp(
      startY - scrollY,
      targetY + pinnedSize,
      progress
    );

    letter.style.fontSize = `${currentFont}px`;
    letter.style.width = `${colWidth}px`;
    letter.style.transform = `
      translate(
        ${curr_X}px,
        ${(curr_Y - currentSize) - 12}px
      )
    `;

    const colorValue = Math.round(lerp(255, 0, progress));
    const colorStr = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;

    letter.style.color = colorStr;

    if (scrollY === 500) {
      console.log('allow pointer events!');
      $('#wordmark-container').addClass('allow-pointer');
    }
  }

  if (location.pathname === "/") {
    updateWordmark();
    window.addEventListener('scroll', updateWordmark);
    window.addEventListener('resize', updateWordmark);
    window.addEventListener('load', updateWordmark);
  }

  // footer loop — only inner text fades, parens stay fixed
  const loop1 = document.getElementById('footer-loop-1');
  const loop2 = document.getElementById('footer-loop-2');
  let showingFirst = true;
  setInterval(() => {
      if (showingFirst) {
          loop1.style.opacity = '0';
          loop2.style.opacity = '1';
      } else {
          loop1.style.opacity = '1';
          loop2.style.opacity = '0';
      }
      showingFirst = !showingFirst;
  }, 4000);

  // footer clock
  function updateClock() {
      const now = new Date();
      const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', options) + ' EST';
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ── about interactive panel ──
  const aboutLabels = document.querySelectorAll('.about-label');
  const aboutPanels = document.querySelectorAll('.about-panel');

  function activateAboutPanel(label, closeOnMobile = false) {
    const targetId = label.dataset.panel;
    const target = document.getElementById(targetId);

    if (!target) return;

    const alreadyActive = label.classList.contains('active');

    aboutPanels.forEach(currentLabel => {
      currentLabel.classList.remove('active');
    });

    aboutPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    if (isMobileLayout() && closeOnMobile && alreadyActive) {
      return;
    }

    label.classList.add('active');
    target.classList.add('active');
  }

  aboutLabels.forEach(label => {
    label.addEventListener('mouseenter', () => {
      if (!isMobileLayout()) {
        activateAboutPanel(label);
      }
    });

    label.addEventListener('click', () => {
      activateAboutPanel(label, true);
    });
  });

  // ── services interactive panels ──

  // special HTML formatting needed in CMS
  if (location.pathname === "/services") {
    var test = $('#cat-about-panel-0').text();
    $('#cat-about-panel-0').html(test);
  }

  const serviceLabels = document.querySelectorAll('.svc-label');
  const servicePanels = document.querySelectorAll('.svc-panel');

  function activateServicePanel(label, allowClose = false) {
    const targetId = label.dataset.panel;
    const targetPanel = document.getElementById(targetId);

    if (!targetPanel) return;

    const wasActive = label.classList.contains('active');

    if (isMobileLayout() && allowClose && wasActive) {
      label.classList.remove('active');
      targetPanel.classList.remove('active');
      const item = label.closest('.svc-item');

      if (item) item.classList.remove('active');
      
      return;
    }

    serviceLabels.forEach(currentLabel => {
      currentLabel.classList.remove('active');
    });

    servicePanels.forEach(panel => {
      panel.classList.remove('active');
    });

    document.querySelectorAll('.svc-item').forEach(item => {
      item.classList.remove('active');
    });

    label.classList.add('active');
    targetPanel.classList.add('active');

    const item = label.closest('.svc-item');
    if (item) item.classList.add('active');
  }

  serviceLabels.forEach(label => {
    label.addEventListener('mouseenter', () => {
      if (!isMobileLayout()) {
        activateServicePanel(label);
      }
    });
    label.addEventListener('click', () => {
      activateServicePanel(label, true);
    });
  });

  // accordion behavior
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "flex") {
        this.setAttribute('aria-expanded', 'true');
        panel.style.display = "none";
        $('.accordion-container span').css('transform', 'rotate(-90deg)');
      } else {
        this.setAttribute('aria-expanded', 'false');
        panel.style.display = "flex";
        $('.accordion-container span').css('transform', 'rotate(45deg)');
      }
    });
  }
});