import axios from 'axios';

export function init() {

  const emailAddrInput = document.querySelector('input[name="email_address"]');
  const subscribeForm = document.getElementById('mailing_list_subscribe');
  const formResponse = document.getElementById('form_response');

  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = '';

    if ( !validateEmail(emailAddrInput.value) ) {
      message = 'Please enter a valid email address.';
      console.log(validateEmail(emailAddrInput.value));
      formResponse.innerHTML = message;
    } else {
    	axios.post('./mailchimp-subscribe.php', {
        emailAddress: emailAddrInput.value
      })
      .then(function (response) {
        message = response.data;
        formResponse.innerHTML = message;
        emailAddrInput.value = '';
      });
    }
  });

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}