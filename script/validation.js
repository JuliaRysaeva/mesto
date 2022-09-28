const configValidation = {
  form: '.popup__form',
  input: '.popup__form-field',
  button: '.popup__button',
  inputError: 'popup__form-field_type_error',
  errorVisible: 'popup__input-error_active',  
  buttonDisabled: 'popup__button_disabled'
};

//функция выделения поля с ошибкой и показ текста ошибки
function showError(input, form, obj){
  const error = form.querySelector(`.${input.id}-error`); 
  input.classList.add(obj.inputError);
  error.classList.add(obj.errorVisible);
  error.textContent=input.validationMessage;
}
//функция для скрытия текста с ошибкой, если поле заполнено верно
function hideError(input, form, obj){
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(obj.inputError);
  error.classList.remove(obj.errorVisible);
  error.textContent='';
}
//проверка поля формы на наоичие ошибки 
function isValid(form, input, obj){
  if (input.validity.valid){
    hideError(input, form, obj);
  }else{
    showError(input, form, obj);
  }
};
//валидация формы
function validateForm(obj){  
  const formsList = Array.from(document.querySelectorAll(obj.form));
  formsList.forEach((form)=>{
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
    });
    validateInput(form, obj);
  })
}
//валидация поля формы
function validateInput (form, obj){
  const inputsList = Array.from(form.querySelectorAll(obj.input));  
  const button = form.querySelector(obj.button);
  inputsList.forEach((input)=>{
    setButtonState(inputsList, button, obj);
    input.addEventListener('input', ()=>{
      isValid(form, input, obj);
      setButtonState(inputsList, button, obj);
    })
  }); 
}
//провека на невалидность хотя бы одного поля
function hasInvalidInput(inputsList){
  return inputsList.some((input)=>{
    return !input.validity.valid;
  })
}
//кнопка неактивна, если валидация не пройдена
function setButtonState (inputsList, button, obj){
  if(hasInvalidInput(inputsList)){
    button.setAttribute('disabled', true);    
    button.classList.add(obj.buttonDisabled);
  }else{
    button.removeAttribute('disabled');
    button.classList.remove(obj.buttonDisabled);
  }
}
validateForm(configValidation);
