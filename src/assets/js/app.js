document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia("(max-width: 1024px)")

  class Menu {
    constructor(menuElement, buttonElement) {
      this.header = document.querySelector('header')
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
        this.header.classList.add('header--active')
        this.disableScroll()
      } else {
        this.enableScroll()
        if (this.header.classList.contains('header--active')) {
          this.menu.addEventListener('transitionend', this.bindFunc)
        }
      }
    }

    bindFunc = () => {
      this.hideaftertransition()
    }

    hideaftertransition() {
      if (this.header.classList.contains('header--active') && !this.isMenuOpen()) {
        this.header.classList.remove('header--active')
      }
      this.menu.removeEventListener('transitionend', this.bindFunc)

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
        const scrollTop = window.pageYOffset  || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset  || document.documentElement.scrollLeft;
      
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }

    enableScroll() {
      window.onscroll = function() {};
    }
  }

  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset  || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset  || document.documentElement.scrollLeft;
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

 function enableScroll() {
  window.onscroll = function() {};
}

  const menu = document.querySelector('.menu')
  const menuButton = document.querySelector('.menu-button')

  if (menu && menuButton) {
    new Menu(menu, menuButton)
  }
const header = document.querySelector('header')
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
if (xl.matches) {
  window.removeEventListener('scroll', scrollHeader);
  header.classList.remove('out');
} else {
  window.addEventListener('scroll', scrollHeader);
}

xl.addEventListener('change', () => {
  if (xl.matches) {
    window.removeEventListener('scroll', scrollHeader)
    header.classList.remove('out')
  } else {
    window.addEventListener('scroll', scrollHeader)
  }
})
var prevScrollpos = window.pageYOffset;
function scrollHeader () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    header.classList.remove('out')
  } else {
    header.classList.add('out')
  }
  prevScrollpos = currentScrollPos;
}

const callback = (entrys, observer) => {
  entrys.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.remove('anim-title')
      observer.unobserve(el.target)
    }
  })

}

const observer = new IntersectionObserver(callback)

const titles = $$('.anim-title')

if (titles.length) {
  titles.forEach(el => {
    observer.observe(el)
  })
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

  const buttonsModal = $$('[data-modal]')

  if (buttonsModal.length) {
    buttonsModal.forEach(el => {
      el.addEventListener('click', modalHandler)
    })
  }

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
        showBlocks(showall, count);
        isHidden = false;
      } else {
        hideBlocks(showall, count);
        isHidden = true;
        showall[0].scrollIntoView({behavior: 'smooth', block: 'center'});
      }
      let oldText = button.dataset.showall
      if (oldText) {
        button.dataset.showall = button.innerHTML
        button.innerText = oldText
      }
    })
  } else {
    button.hidden = true
  }

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll()
    } else {
      enableScroll()
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
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0])
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition)
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal')

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this)
        }
        const closeButton = el.querySelector('.close-button')
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            modalHandler.apply(this)
          })
        }
      })
    })
  }

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition)
  }

  const md = matchMedia('(max-width: 1024px)');
  let swiper = null

  if (md.matches) {
    swiper = new Swiper('.why .swiper', {
      loop: true,
      slidesPerView: 'auto',
      height: 'auto',
    })
  }

  function doAPIcall(type, data='', url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
        var data = xmlhttp.responseText;
        if (callback) callback(data);
      }
    };
    xmlhttp.open(type, url, true);
    if (data) {
      xmlhttp.send(data);
      return
    }
    xmlhttp.send(data)
  }

  md.addEventListener('change', () => {
    if (md.matches) {
      swiper = new Swiper('.why .swiper', {
        loop: true,
        slidesPerView: 'auto',
        height: 'auto',
      })
    } else {
      swiper.destroy(true, true);
    }
  })

  for(const form of document.forms) {
    form.addEventListener('submit', function () {
      event.preventDefault()
      const formData = new FormData(this)
      doAPIcall('POST', formData, './server.php', function(data) {
        console.log(data)
      })
      const parent = this.closest('.regModal');
      const feedback = document.querySelector('#feedback')
      this.reset()

      if (parent) {
        modalHandler.apply(parent)
      }

      if (feedback) {
        modalHandler.apply(feedback)
      }
    })
  }

  function addMask() {
    [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ___",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
    
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
    
    });
    
    }
    addMask()

})










