const configValidation = {
  form: '.popup__form',
  input: '.popup__form-field',
  button: '.popup__button',
  inputError: 'popup__form-field_type_error',
  errorVisible: 'popup__input-error_active',  
  buttonDisabled: 'popup__button_disabled'
};

export class FormValidator {
  constructor(obj) {
    this._form = obj.form;
    this._input = obj.input;
    this._button = obj.button;
    this._inputError = obj.inputError;
    this._errorVisible = obj.errorVisible;    
    this._buttonDisabled = obj.buttonDisabled;
}
//функция выделения поля с ошибкой и показ текста ошибки
_showError(input, form){
  const error = form.querySelector(`.${input.id}-error`); 
  input.classList.add(this._inputError);
  error.classList.add(this._errorVisible);
  error.textContent=input.validationMessage;
}
//функция для скрытия текста с ошибкой, если поле заполнено верно
_hideError(input, form){
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(this._inputError);
  error.classList.remove(this._errorVisible);
  error.textContent='';
}
//проверка поля формы на наличие ошибки 
_isValid(form, input){
  if (input.validity.valid){
    this._hideError(input, form);
  }else{
    this._showError(input, form);
  }
};
//валидация поля формы
_validateInput (form){
  const inputsList = Array.from(form.querySelectorAll(this._input));  
  const button = form.querySelector(this._button);
  inputsList.forEach((input)=>{
    this._setButtonState(inputsList, button);
    input.addEventListener('input', ()=>{
      this._isValid(form, input);
      this._setButtonState(inputsList, button);
    })
  }); 
}
 //провека на невалидность хотя бы одного поля
_hasInvalidInput(inputsList){
  return inputsList.some((input)=>{
    return !input.validity.valid;
  })
}
//кнопка неактивна, если валидация не пройдена
_setButtonState (inputsList, button){
  if(this._hasInvalidInput(inputsList)){
    button.setAttribute('disabled', true);    
    button.classList.add(this._buttonDisabled);
  }else{
    button.removeAttribute('disabled');
    button.classList.remove(this._buttonDisabled);
  }}

//метод валидации формы
validateForm(obj){
  const formsList = Array.from(document.querySelectorAll(obj.form));
  formsList.forEach((form)=>{
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
    });
    this._validateInput(form, obj);
  })
}
}
const form = new FormValidator(configValidation).validateForm(configValidation);

