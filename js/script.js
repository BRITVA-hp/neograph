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

  function modal(modal, modalActiveClass, triggers, modalClose) {
    const triggers_ = document.querySelectorAll(triggers),
      modal_ = document.querySelector(modal),
      modalClose_ = document.querySelector(modalClose);

    if (triggers_.length > 0) {
      triggers_.forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault()
          modal_.classList.add(modalActiveClass);
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${scrollWidth}px`;
        });
      });

      modalClose_.addEventListener('click', () => {
        modal_.classList.remove(modalActiveClass);
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
      });

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

    alert(result)
  })


})