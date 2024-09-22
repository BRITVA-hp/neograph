document.addEventListener('DOMContentLoaded', () => {

// modal

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scarollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scarollWidth;
  }

  let scrollWidth = calcScroll();

  function modal(modal, modalActiveClass, triggers, modalClose, noTriggers) {
    const triggers_ = document.querySelectorAll(triggers),
      modal_ = document.querySelector(modal),
      modalClose_ = document.querySelectorAll(modalClose);

    if (triggers_.length || noTriggers) {
      triggers_.forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault()
          const dropdownSession = modal_.querySelector('.dropdown--session')
          if(dropdownSession) {
            const dataModalSession = item.getAttribute('data-modal-session')
            if(dataModalSession) {
              dropdownSession.querySelector('#session').value = dataModalSession
              dropdownSession.querySelector('.dropdown__button__text').textContent = dataModalSession
            } else {
              dropdownSession.querySelector('#session').value = 'Сессия «Личность»'
              dropdownSession.querySelector('.dropdown__button__text').textContent = 'Сессия «Личность»'
            }
          }
          modal_.classList.add(modalActiveClass);
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${scrollWidth}px`;
        });
      });

      modalClose_.forEach(el => {
        el.addEventListener('click', () => {
          modal_.classList.remove(modalActiveClass);
          document.body.style.overflow = '';
          document.body.style.marginRight = '0px';
        });
      })

      modal_.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__container')) {
          modal_.classList.remove(modalActiveClass);
          document.body.style.overflow = '';
          document.body.style.marginRight = '0px';
        }
      });
    }
  }

  modal('.modal-main', 'modal--active', '[data-modal-main]', '.modal-main .modal__close');
  modal('.modal-second', 'modal--active', '[data-modal-second]', '.modal-second .modal__close');
  modal('.modal-thanks', 'modal--active', '[data-modal-thanks]', '.modal-thanks [data-modal-thanks-close]', true);

  // menu

  const burger = document.querySelector('.header__burger')
  const menu = document.querySelector('.menu')
  const menuClose = document.querySelector('.menu__close')
  const menuLinks = document.querySelectorAll('.menu__link')

  burger.addEventListener('click', () => {
    menu.classList.add('menu--active')
  })
  menuClose.addEventListener('click', () => {
    menu.classList.remove('menu--active')
  })
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('menu--active')
    })
  })


  //form
  // let selector = document.querySelector("#tel")
  // let im = new Inputmask("+7(999) 999-99-99")
  // im.mask(selector)

  let validation = new JustValidate("#modalForm")

  validation.addField("#name", [
    {
      rule: "required",
      errorMessage: "Введите имя!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ]).addField("#surname", [
    {
      rule: "required",
      errorMessage: "Введите фамилию!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ]).addField("#session", [
    {
      rule: "required",
      errorMessage: 'Выберите сессию'
    }
  ]).addField("#contact", [
    {
      rule: "required",
      errorMessage: "Обязательное поле"
    }
  ]).addField("#contact_msg", [
    {
      rule: "required",
      errorMessage: "Выберите вариант"
    }
  ]).addField("#politics", [
    {
      rule: "required",
      errorMessage: "Согласие обязательно"
    }
  ]).onSuccess(async function () {
    let data = {
      session: document.getElementById("session").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      contact: document.getElementById("contact").value,
      contact_msg: document.getElementById("contact_msg").value
    }
    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    let result = await response.text()

    document.querySelector('.modal-thanks').classList.add('modal--active')
  })

  // dropdown
  document.dropdownR = { }
  function dropdown(dropdownSelector, btnSelector, contentSelector, activeClass, componentId) {

    if(!document.dropdownR[componentId]) {
      document.dropdownR[componentId] = { }
      document.dropdownR[componentId].selectors = { }
      document.dropdownR[componentId].selectors.dropdownSelector = dropdownSelector
      document.dropdownR[componentId].selectors.btnSelector = btnSelector
      document.dropdownR[componentId].selectors.contentSelector = contentSelector
      document.dropdownR[componentId].selectors.activeClass = activeClass
    }

    const dropdowns = document.querySelectorAll(document.dropdownR[componentId].selectors.dropdownSelector)
    function close(e) {
      if(e.target.closest(document.dropdownR[componentId].selectors.btnSelector) && !e.target.closest('[data-r-dropdown-close]')) {
        const dropdown_ = e.target.closest(document.dropdownR[componentId].selectors.dropdownSelector)
        document.querySelectorAll(document.dropdownR[componentId].selectors.dropdownSelector).forEach(el => {
          if(el !== dropdown_) el.classList.remove(document.dropdownR[componentId].selectors.activeClass)
        })
        return
      } else if (e.target.closest(document.dropdownR[componentId].selectors.contentSelector) && !e.target.closest('[data-r-dropdown-close]')) {
        document.addEventListener('mouseup', close, { once: true })
        return
      }
      document.querySelectorAll(document.dropdownR[componentId].selectors.dropdownSelector).forEach(el => { el.classList.remove(document.dropdownR[componentId].selectors.activeClass) })
    }

    function clickButton(e) {
      const el = e.target.closest(document.dropdownR[componentId].selectors.dropdownSelector)
      el.classList.toggle(document.dropdownR[componentId].selectors.activeClass)

      if(el.classList.contains(document.dropdownR[componentId].selectors.activeClass)) {
        document.addEventListener('mouseup', close, { once: true })
      } else {
        document.removeEventListener('mouseup', close)
      }
    }

    if(!document.dropdownR[componentId].fn) {
      document.dropdownR[componentId].fn = clickButton
    }

    dropdowns.forEach( el => {
      const button = el.querySelector(document.dropdownR[componentId].selectors.btnSelector)
      const content = el.querySelector(document.dropdownR[componentId].selectors.contentSelector)

      button.removeEventListener('click', document.dropdownR[componentId].fn)
      button.addEventListener('click', document.dropdownR[componentId].fn)
    })
  }

  dropdown('.dropdown', '.dropdown__button', '.dropdown__content', 'dropdown--active')

  //toggle dropdown items
  const dropdowns = document.querySelectorAll('.dropdown')

  dropdowns.forEach(_dropdown => {
    const _input = _dropdown.querySelector('.dropdown__input')
    const btnText = _dropdown.querySelector('.dropdown__button__text')
    const items = _dropdown.querySelectorAll('.dropdown__item')
    items.forEach(_item => {
      _item.addEventListener('click', () => {
        btnText.textContent = _item.textContent
        btnText.classList.add('dropdown__button__text--checked')
        _input.value = _item.textContent
      })
    })
  })

})