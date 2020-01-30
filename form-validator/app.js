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
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email must be valid');
  }
};

// FieldName
const getFildName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Length Checking
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFildName(input)} will must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFildName(input)} will must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// CheckPassword match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords not matched');
  }
};

// CheckRequired for all the input
const CheckRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFildName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
};

// EventListener for submitting the form

form.addEventListener('submit', e => {
  e.preventDefault();
  CheckRequired([username, email, password, conformPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, conformPassword);
});
