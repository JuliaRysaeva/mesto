import './index.css'; // импорт главного файла стилей
import {Card} from '../components/Card.js';
import {configValidation, FormValidator} from '../components/FormValidator.js';
import {content, popupProfileEdit, formProfileEdit, nameInput, jobInput, buttonProfileEdit,
  buttonCloseProfileEdit, profileName, profileJob, buttonAddCard, popupNewCard, cardForm,
  cardName, cardLink, buttonCloseNewCard, cardsContainer, template, picturePopup,
  closeButtonForPic, fullPic, subtitle} from '../utils/constants.js';
  import Popup from '../components/Popup.js'
  import {PopupWithForm} from '../components/PopupWithForm.js'  
  import {PopupWithImage} from '../components/PopupWithImage.js'
  import Section from '../components/Section.js'
  import UserInfo from '../components/UserInfo.js'

import earth from '../images/earth.jpg';
import saturn from '../images/saturn.jpg';
import moon from '../images/moon.jpg';
import uranus from '../images/uranus.jpg';

const initialCards = [
  {name: 'Земля', link: earth},
  {name: 'Сатурн', link: saturn},
  {name: 'Луна', link: moon},
  {name: 'Уран', link: uranus}]

  const cardList = new Section({
    items: initialCards,
    renderer: (item)=>{      
      item = new Card({name: item.name, link: item.link}, template, handleCardClick);
      const generate = item.generateCard();
      cardList.addItem(generate);
    }
  }, cardsContainer);
  cardList.renderItems();

//валидация
const formForProfile=document.querySelector('.popup_type_profile-edit')
const profileFormValidator = new FormValidator(configValidation, formForProfile);
profileFormValidator.enableValidation();
const formForCard=document.querySelector('.popup_type_add-card') 
const cardFormValidator = new FormValidator(configValidation, formForCard);
cardFormValidator.enableValidation();

//открытие формы для профиля
buttonProfileEdit.addEventListener('click', ()=>{
  const item = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit)
    item.setEventListeners();
    item.open();
    const element = new UserInfo({name:profileName, job:profileJob})
    const userData = element.getUserInfo();
    nameInput.value=userData.name;
    jobInput.value=userData.job;
  });
  function handleProfileFormSubmit(data){     
    const item = new UserInfo({name:profileName, job:profileJob})
    item.setUserInfo(data.name, data.job);
  }

//открытие формы для карточки
 buttonAddCard.addEventListener('click', ()=>{
  const item = new PopupWithForm(popupNewCard, handleCardFormSubmit) 
  item.setEventListeners();
  item.open();
})
function handleCardFormSubmit(data){
    const newCard = new Card({card: data.card, about: data.about}, 
      template, handleCardClick);
      console.log(newCard)
   const createNewCard = newCard.generateCard();
   cardsContainer.prepend(createNewCard);
  }
  function handleCardClick(){  
  const picture = new PopupWithImage(picturePopup)    
  picture.open();
}
