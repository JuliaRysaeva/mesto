import {fullPic, subtitle} from '../utils/constants.js'
import Popup from './Popup.js'

export class PopupWithImage extends Popup{
  constructor(popup){
    super(popup)
  }
  open({name, link}){
    super.open();
    subtitle.textContent = name;
    fullPic.alt = name;
    fullPic.src = link; 
  }
}