import {modalClose, modalOpen} from './modal';
import  {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'icons/spinner.svg',
    succes: 'Succes',
    failure: 'Error'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMessage);

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'aplication/json');
      const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function(value,key){
      //   object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
      // request.send(json); 
      // request.addEventListener('load', () => {
      //   if (request.status === 200){
      //     console.log(request.response);
      //     showThanksModal(message.succes);
      //     statusMessage.remove();
      //     form.reset();


      //   }else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    modalOpen('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      modalClose('.modal');
    }, 4000);
  }
}

export default forms;