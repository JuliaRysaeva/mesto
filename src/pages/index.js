import './index.css'; // импорт главного файла стилей
import {Card} from '../components/Card.js';
import {configValidation, FormValidator} from '../components/FormValidator.js';
import {content, popupProfileEdit, formProfileEdit, nameInput, jobInput, buttonProfileEdit,
  buttonCloseProfileEdit, profileName, profileJob, buttonAddCard, popupNewCard, cardForm,
  cardName, cardLink, buttonCloseNewCard, cardsContainer, template, picturePopup,
  closeButtonForPic, fullPic, subtitle} from '../utils/constants.js';
  import {PopupWithForm} from '../components/PopupWithForm.js'  
  import {PopupWithImage} from '../components/PopupWithImage.js'
  import Section from '../components/Section.js'
  import UserInfo from '../components/UserInfo.js'

import earth from '../images/earth.jpg';
import saturn from '../images/saturn.jpg';
import moon from '../images/moon.jpg';
import uranus from '../images/uranus.jpg';
import venus from '../images/venus.jpg'
import milkyway from '../images/milkyway.jpg'

const initialCards = [
  {name: 'Земля', link: earth},
  {name: 'Сатурн', link: saturn},
  {name: 'Луна', link: moon},
  {name: 'Уран', link: uranus},
  {name: 'Венера', link: venus},
  {name: 'Млечный путь', link: milkyway}
]
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

// rартинка на весь экран
const picture = new PopupWithImage(picturePopup)
function handleCardClick({name:name, link:link}){   
picture.open({name:name, link:link});
picture.setEventListeners();
}
picture.setEventListeners();
//открытие формы для профиля
const item = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit)
item.setEventListeners();
const element = new UserInfo({name:profileName, job:profileJob})

buttonProfileEdit.addEventListener('click', ()=>{
  item.open();
  profileFormValidator.disableButton();
  const userData = element.getUserInfo();
  nameInput.value=userData.name;
  jobInput.value=userData.job;
});
  function handleProfileFormSubmit(data){
    element.setUserInfo(data.name, data.job);
  }
//открытие формы для карточки
const addCardPopup = new PopupWithForm(popupNewCard, handleCardFormSubmit);
buttonAddCard.addEventListener('click', ()=>{
  addCardPopup.open();
  cardFormValidator.disableButton();
})
addCardPopup.setEventListeners();
function handleCardFormSubmit(data){
  const newCard = new Card({name: data.card, link: data.about}, template, handleCardClick);
  const createNewCard = newCard.generateCard();
  cardsContainer.prepend(createNewCard);
}