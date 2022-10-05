export const configValidation = {
  form: '.popup__form',
  input: '.popup__form-field',
  button: '.popup__button',
  inputError: 'popup__form-field_type_error',
  errorVisible: 'popup__input-error_active',  
  buttonDisabled: 'popup__button_disabled'
};
export class FormValidator {
  constructor(obj, form) {
    this._form = obj.form;
    this._input = obj.input;
    this._button = obj.button;
    this._inputError = obj.inputError;
    this._errorVisible = obj.errorVisible;    
    this._buttonDisabled = obj.buttonDisabled;
    this._formItem = form;
  }
//функция выделения поля с ошибкой и показ текста ошибки
  _showError(input){ 
    this._error = this._formItem.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    this._error.classList.add(this._errorVisible);
    this._error.textContent=input.validationMessage;
  }
  //функция для скрытия текста с ошибкой, если поле заполнено верно
  _hideError(input){
    this._error = this._formItem.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    this._error.classList.remove(this._errorVisible);
    this._error.textContent='';
  }
  //проверка поля формы на наличие ошибки 
  _isValid(input){
    if (input.validity.valid){
      this._hideError(input);
    }else{
      this._showError(input);
    }
  };
  //валидация поля формы
  _setEventListeners (){
    this._inputsList = Array.from(this._formItem.querySelectorAll(this._input));
    this._button = this._formItem.querySelector(this._button);
    this._inputsList.forEach((input)=>{
    this._setButtonState(this._inputsList, this._button);
      input.addEventListener('input', ()=>{
        this._isValid(input);
        this._setButtonState(this._inputsList, this._button);
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
    if (this._hasInvalidInput(inputsList)){
      button.setAttribute('disabled', true);    
      button.classList.add(this._buttonDisabled);
    }else{
      button.removeAttribute('disabled');
      button.classList.remove(this._buttonDisabled);
    }
  }
  //метод валидации формы
  enableValidation(){  
    this._formItem.addEventListener('submit', (e)=>{
      e.preventDefault();
    });
    this._setEventListeners();
  }
}


