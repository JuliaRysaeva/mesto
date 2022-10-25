export default class Popup {
  constructor(popup){
    this._popup = popup;
  }
  _handleEscClose(e){
    if (e.key==='Escape'){
      this.close();} 
  } 
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup',(e)=>{this._handleEscClose(e)})   
  }
  close(){    
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup',(e)=>{this._handleEscClose(e)});   
  }
  setEventListeners(){
    //закрытие по кнопке закрытия
    this._button = document.querySelector('.popup__close-icon');    
    this._button.addEventListener ('click', ()=>{
      console.log("клик по кнопке" +`${this._button}`)
      this.close()});
    //закрытие по оверлею
    this._popup.addEventListener('click', (e)=>{
      if(!e.target.closest('.popup__container')
      &&(!e.target.closest('.full-picture__card-container'))){
        this.close();
      }
    }
    )
  }
}