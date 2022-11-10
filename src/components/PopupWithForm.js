import Popup from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup, handleFormSubmit, text){
    super(popup);
    this._handleSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this.buttonText = text;    
  }
  _getInputValues(){
    this._inputsList=Array.from(this._form.querySelectorAll('.popup__form-field'));  
    this._formValues={};
    this._inputsList.forEach((input)=>{
      this._formValues[input.name]=input.value;             
    }) 
    return this._formValues;     
  } 
  setEventListeners(){
    super.setEventListeners();  
    this._button=this._form.querySelector('.popup__button') 
    this._form.addEventListener('submit', (e)=>{           
      this._handleSubmit(this._getInputValues());
      e.preventDefault();
      
      this.close(); 
    })
  }
  close(){
    super.close()
    this._form.reset();
  }
}