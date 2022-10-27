export const configValidation = {
  form: '.popup__form',
  input: '.popup__form-field',
  button: '.popup__button',
  inputError: 'popup__form-field_type_error',
  errorVisible: 'popup__input-error_active',  
  buttonDisabled: 'popup__button_disabled'
};
export class FormValidator {
  constructor(validationConfig, popup) {
    this._form = validationConfig.form;
    this._input = validationConfig.input;
    this._button = validationConfig.button;
    this._inputError = validationConfig.inputError;
    this._errorVisible = validationConfig.errorVisible;    
    this._buttonDisabled = validationConfig.buttonDisabled;
    this._formItem = popup;
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
    this._formButton = this._formItem.querySelector(this._button);
    this._setButtonState(); 
    
    this._inputsList.forEach((input)=>{
      input.addEventListener('input', ()=>{
        this._isValid(input);
        this._setButtonState();                
      });
    })       
  }
  //провека на невалидность хотя бы одного поля
  _hasInvalidInput(inputsList){
    return inputsList.some((input)=>{
      return !input.validity.valid
    })
  }
  //кнопка неактивна, если валидация не пройдена
  _setButtonState (){
    if (this._hasInvalidInput(this._inputsList)){
      this.disableButton();
    }else{
      this._formButton.removeAttribute('disabled');
      this._formButton.classList.remove(this._buttonDisabled);
    }
  }
  //деактивация кнопки
  disableButton(){
    this._formButton.setAttribute('disabled', true);
    this._formButton.classList.add(this._buttonDisabled);
  }
  //метод валидации формы
  enableValidation(){
    this._setEventListeners();
  }
  //очищении формы от ошибок, если до этого она была закрыта с ошибками
  resetError(){
    this._inputsList.forEach((input)=>{
      input.classList.remove(this._inputError)
    });
    const errors = Array.from(this._formItem.querySelectorAll('.popup__input-error'));
    errors.forEach((er)=>{
      er.classList.remove(this._errorVisible);
      er.textContent='';
    })
  }
}
