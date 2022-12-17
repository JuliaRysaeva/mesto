import Popup from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup, handleFormSubmit){
    super(popup);
    this._handleSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton=this._form.querySelector('.popup__button');
    this._submitButtonDefaultText = this._submitButton.textContent;
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
    //console.log('butt',this._submitButton)
    this._form.addEventListener('submit', (e)=>{           
      this._handleSubmit(this._getInputValues());
      e.preventDefault();      
    })
  }
  setButtonState(isLoading, text){
    if(isLoading){
      this._submitButton.textContent = text;
    }else{
      this._submitButton.textContent=this._submitButtonDefaultText      
    }    
  }
  close(){
    super.close()
    this._form.reset();
  }
}