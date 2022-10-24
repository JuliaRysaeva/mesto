import {fullPic, subtitle} from '../utils/constants.js'
import Popup from './Popup.js'
import Card from './Card.js'

export class PopupWithImage extends Popup{
  constructor(popup){
    super(popup)
  }
  open(){
    super.open();
    fullPic.src =a.link;
    subtitle.textContent = a.name;
    fullPic.alt =a.name;    
  }
}