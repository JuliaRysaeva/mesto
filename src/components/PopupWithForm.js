import Popup from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup, handleFormSubmit){
    super(popup);
    this._handleSubmit = handleFormSubmit;
    this._form = document.querySelector('.popup__form');
  }
  _getInputValues(){
    this._inputsList=Array.from(this._form.querySelectorAll('.popup__form-field'));  
    this._formValues={};
    this._inputsList.forEach((input)=>{
      this._formValues[input.name]=input.value;             
    })    
    console.log(this._formValues);  
    return this._formValues;     
  } 
  setEventListeners(){
    super.setEventListeners();   
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this.close();
      this._handleSubmit(this._getInputValues());    
    })
  }
  close(){
    super.close()
    this._form.reset();
  }
}