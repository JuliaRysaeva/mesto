import Popup from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup, handleFormSubmit){
    super(popup);
    this._handleSubmit = handleFormSubmit;
  }
  _getInputValues(){
    this._inputsList=Array.from(document.querySelectorAll('.popup__form-field'));
    this._formValues={};
    this._inputsList.forEach((input)=>{
      this._formValues[input.name]=input.value;
    })
    return this._formValues;
  }
  close(){
    super.close()
    this._form.reset();
  }
  setEventListeners(){
    super.setEventListeners();
    this._form = document.querySelector('.popup__form');
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this.close();
      this._handleSubmit(this._getInputValues());
    })
  }
}