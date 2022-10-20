export default class Popup {
  constructor(popupSelector){
    this._popup = popupSelector;
  }
  /* _handleEscClose(e){
    if (e.key==='Escape'){
      close(document.querySelector('.popup_opened'));
    }
  } */
  open(){
    this._popup.classList.add('popup_opened');
    //document.addEventListener('keyup', this._handleEscClose());
  }
  close(){    
    this._popup.classList.remove('popup_opened');
    //document.removeEventListener('keyup', this._handleEscClose());
  }  
  setEventListeners(){
    //закрытие по кнопке закрытия
    this._button = document.querySelector('.popup__close-icon')
    this._button.addEventListener ('click', () => close(this._popup));
//закрытие по оверлею
    this._popup.addEventListener('click', (e)=>{
      if(!e.target.closest('.popup__container')
      &&(!e.target.closest('.full-picture__card-container'))){
        close(document.querySelector('.popup_opened'));
      }
    }
    )
  }
}