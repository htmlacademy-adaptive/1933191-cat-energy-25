let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-header-wrapper__toggle');

navMain.classList.remove('main-nav--nojs');
navToggle.classList.remove('main-header-wrapper__toggle--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
  if (navToggle.classList.contains('main-header-wrapper__toggle--closed')) {
    navToggle.classList.remove('main-header-wrapper__toggle--closed');
    navToggle.classList.add('main-header-wrapper__toggle--opened');
  } else {
    navToggle.classList.add('main-header-wrapper__toggle--closed');
    navToggle.classList.remove('main-header-wrapper__toggle--opened');
  }
});

