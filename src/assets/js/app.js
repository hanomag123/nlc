document.addEventListener("DOMContentLoaded", () => {

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement
      this.overlay = document.createElement('div')
      this.overlay.hidden = true
      this._init()
    }

    _init() {
      document.body.appendChild(this.overlay)
      this.overlay.classList.add('overlay')

      this.overlay.addEventListener('click', this.toggleMenu.bind(this))
      this.button.addEventListener('click', this.toggleMenu.bind(this))
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open')
      this.button.classList.toggle('menu-button--active')
      this.overlay.hidden = !this.overlay.hidden

      if (this.isMenuOpen()) {
        this.disableScroll()
      } else {
        this.enableScroll()
      }
    }

    closeMenu() {
      this.menu.classList.remove('header__nav--active')
      this.button.classList.remove('header__menu-button--active')
      this.overlay.hidden = true

      this.enableScroll()
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open')
    }

    disableScroll() {
      // Get the current page scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu')
  const menuButton = document.querySelector('.menu-button')

  if (menu && menuButton) {
    new Menu(menu, menuButton)
  }


  const selectLang = document.querySelectorAll('.select-lang a');
  if (selectLang.length > 0) {
    selectLang.forEach(el => {
      el.addEventListener('click', function clickHand() {
        event.preventDefault();
        const value = this.innerHTML
        const prevElem = this.parentElement.previousElementSibling

        prevElem.dataset.text = value
      });
    });
  }

  function $(selector) {
    return document.querySelector(selector)
  }
  function $$(selector) {
    return document.querySelectorAll(selector)
  }

  const showall = $$('.showall li');
  const button = $('[data-showall]');
  const count = 4;
  let isHidden = false;

  const hideBlocks = (blocks, count) => {
    blocks.forEach((el, index) => {
      if (index >= count) {
        modalHandler.apply(el)
      }
    })
  }

  const showBlocks = (blocks, count) => {
    blocks.forEach((el, index) => {
      if (index >= count) {
        modalHandler.apply(el)
      }
    })
  }

  if (showall.length > count && button) {

    hideBlocks(showall, count);
    isHidden = true;

    button.addEventListener('click', () => {
      if (isHidden) {
        showBlocks(showall)
        isHidden = false
      } else {
        hideBlocks(showall, count)
      }
    })
  } else {
    button.hidden = true
  }

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      // scrollLock.disablePageScroll();
      // scrollLock.addScrollableSelector('.regModal');
    } else {
      // scrollLock.enablePageScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto')
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10)
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null)
        modal.addEventListener('transitionend', hideaftertransition)
      }
    }
  }

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition)
  }

})










