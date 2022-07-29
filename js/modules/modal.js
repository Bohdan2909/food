function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector)
  // modal.style.display = 'block';
  modal.classList.add('show');
  modal.classList.remove('hide');
  // document.body.style.overflow = 'hidden';
  if (modalTimerId) {
   clearInterval(modalTimerId);
  }
}

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector)
  // modal.style.display = 'none';
  modal.classList.add('hide');
  modal.classList.remove('show');
  // document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal
  //First Part
  const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector),
    btnClose = document.querySelector('[data-close]');



  modalTrigger.forEach(btns => btns.addEventListener('click', () => modalOpen(modalSelector, modalTimerId)));


  btnClose.addEventListener('click', () => modalClose(modalSelector));

  modal.addEventListener('click', (event) => {
    // event.preventDefault();
    if (event.target === modal) {
      modalClose(modalSelector);
    }
  });
  document.addEventListener('keydown', (event) => {
    // event.preventDefault();
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      modalClose(modalSelector);
    }
  });
  //Second Part

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
    // if(document.documentElement.scrollTop === 150){
    //   modalOpen();
    //    window.removeEventListener('scroll', showModalByScroll);
    // }
  }
  window.addEventListener('scroll', showModalByScroll);
}
export default modal;
export {
  modalClose
};
export {
  modalOpen
};
