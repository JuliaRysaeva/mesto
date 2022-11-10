import Popup from './Popup.js'
export class PopupWithConfirmation extends Popup{
constructor(popup, handleDeleteSubmit){
  super(popup);
  this._handleDelete = handleDeleteSubmit;
  this._form = this._popup.querySelector('.popup__form');  
}
setEventListeners(){
  super.setEventListeners();   
  this._form.addEventListener('submit', ()=>{           
    this._handleDelete();
    this.close(); 
  })
}
close(){
  super.close()
  this._form.reset();
}
}