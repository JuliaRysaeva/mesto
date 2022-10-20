import {fullPic, subtitle} from '../utils/constants.js'
import Popup from './Popup.js'

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  open(name, link){
    super.open();
    fullPic.src = link;
    subtitle.textContent = name;
    fullPic.alt = name;    
  }
}