'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    const expanded = sidebar.classList.contains("active");
    sidebarBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (testimonialsItem.length && modalContainer) {
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

if (selectItems.length) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectedValue === "همه") selectedValue = "all";
      else if (selectedValue === "طراحی وب") selectedValue = "web design";
      else if (selectedValue === "اپلیکیشن") selectedValue = "applications";
      else if (selectedValue === "توسعه وب") selectedValue = "web development";
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectedValue === "همه") selectedValue = "all";
      else if (selectedValue === "طراحی وب") selectedValue = "web design";
      else if (selectedValue === "اپلیکیشن") selectedValue = "applications";
      else if (selectedValue === "توسعه وب") selectedValue = "web development";
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const navTargets = document.querySelectorAll("[data-nav-target]");
const pages = document.querySelectorAll("[data-page]");

const navigateToPage = function (targetPage) {
  if (!targetPage) return;

  for (let i = 0; i < pages.length; i++) {
    const isActive = pages[i].dataset.page === targetPage;
    pages[i].classList.toggle("active", isActive);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    const linkTarget = navigationLinks[i].dataset.navTarget || navigationLinks[i].innerHTML.trim();
    const isActive = linkTarget === targetPage;
    navigationLinks[i].classList.toggle("active", isActive);
    if (isActive) {
      navigationLinks[i].setAttribute("aria-current", "page");
    } else {
      navigationLinks[i].removeAttribute("aria-current");
    }
  }

  window.scrollTo(0, 0);

  if (sidebar && sidebar.classList.contains("active") && sidebarBtn) {
    sidebar.classList.remove("active");
    sidebarBtn.setAttribute("aria-expanded", "false");
  }
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    navigateToPage(this.dataset.navTarget || this.innerHTML.trim());
  });
}

for (let i = 0; i < navTargets.length; i++) {
  if (navTargets[i].hasAttribute("data-nav-link")) continue;

  navTargets[i].addEventListener("click", function (e) {
    if (this.tagName === "A" && this.getAttribute("href")?.startsWith("http")) return;
    e.preventDefault();
    navigateToPage(this.dataset.navTarget);
  });
}



// Background audio + toggle
const bgAudio = document.getElementById('bg-audio');
const audioToggleBtn = document.getElementById('audio-toggle');

if (bgAudio && audioToggleBtn) {
  const updateAudioIcon = () => {
    const icon = audioToggleBtn.querySelector('ion-icon');
    if (!bgAudio.paused && !bgAudio.muted) {
      audioToggleBtn.classList.add('playing');
      audioToggleBtn.setAttribute('aria-pressed', 'true');
      icon.setAttribute('name', 'volume-high');
      audioToggleBtn.title = 'قطع صدا';
    } else {
      audioToggleBtn.classList.remove('playing');
      audioToggleBtn.setAttribute('aria-pressed', 'false');
      icon.setAttribute('name', 'volume-mute');
      audioToggleBtn.title = 'پخش صدا';
    }
  };

  bgAudio.play().then(() => {
    bgAudio.muted = false;
    updateAudioIcon();
  }).catch(() => {
    audioToggleBtn.classList.add('requires-interaction');
    audioToggleBtn.title = 'برای پخش، کلیک کنید';
    updateAudioIcon();
  });

  audioToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (bgAudio.paused) {
      bgAudio.play();
      bgAudio.muted = false;
    } else {
      bgAudio.pause();
    }
    updateAudioIcon();
    audioToggleBtn.classList.remove('requires-interaction');
  });

  bgAudio.addEventListener('play', updateAudioIcon);
  bgAudio.addEventListener('pause', updateAudioIcon);
}
