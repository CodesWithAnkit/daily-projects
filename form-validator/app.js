const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const conformPassword = document.getElementById('password2');

// ShowError message function
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success outline
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Email checker
const emailCheker = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

form.addEventListener('submit', e => {
  e.preventDefault();

  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }
  if (email.value === '') {
    showError(email, 'email is required');
  } else if (!emailCheker(email.value)) {
    showError(email, 'email is not vlaid');
  } else {
    showSuccess(email);
  }
  if (password.value === '') {
    showError(password, 'Password is required');
  } else {
    showSuccess(password);
  }
  if (password2.value === '') {
    showError(password2, 'Conform password is required');
  } else {
    showSuccess(password2);
  }
});
