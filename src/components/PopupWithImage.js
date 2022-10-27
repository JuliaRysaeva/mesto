import Popup from './Popup.js'

export class PopupWithImage extends Popup{
  constructor(popup){
    super(popup)
    this.subtitle = this._popup.querySelector('.full-picture__subtitle')
    this.fullPic = this._popup.querySelector('.full-picture__card')
  }
  open({name, link}){
    super.open();
    this.subtitle.textContent = name;
    this.fullPic.alt = name;
    this.fullPic.src = link; 
  }
}