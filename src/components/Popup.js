export default class Popup {
  constructor(popup){
    this._popup = popup;
  }
  _handleEscClose(e){
    if (e.key==='Escape'){
      this.close();
    } 
  }  
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup',(e)=>{this._handleEscClose(e)}, {once: true})  
  }
  close(){    
    this._popup.classList.remove('popup_opened');      
  }
  setEventListeners(){
    //закрытие по кнопке закрытия
    this._button = this._popup.querySelector('.popup__close-icon');    
    this._button.addEventListener('click', ()=>{
      this.close()});
    //закрытие по оверлею
    this._popup.addEventListener('click', (e)=>{
      if(!e.target.closest('.popup__overlay_type_close')){
        this.close();
      }
    }
    )
  }
}