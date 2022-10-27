import './index.css'; // импорт главного файла стилей
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {configValidation} from '../components/FormValidator.js';
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
  {card: 'Земля', link: earth},
  {card: 'Сатурн', link: saturn},
  {card: 'Луна', link: moon},
  {card: 'Уран', link: uranus},
  {card: 'Венера', link: venus},
  {card: 'Млечный путь', link: milkyway}
]
//валидация
const formForProfile=document.querySelector('.popup_type_profile-edit')
const profileFormValidator = new FormValidator(configValidation, formForProfile);
profileFormValidator.enableValidation();
const formForCard=document.querySelector('.popup_type_add-card') 
const cardFormValidator = new FormValidator(configValidation, formForCard);
cardFormValidator.enableValidation();

// картинка на весь экран
const picture = new PopupWithImage(picturePopup)
picture.setEventListeners();

function handleCardClick({name:name, link:link}){
  picture.open({name:name, link:link});  
}
//открытие формы для профиля
const popupEditProfile = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit)
popupEditProfile.setEventListeners();
const userInfo = new UserInfo({name:profileName, job:profileJob})

buttonProfileEdit.addEventListener('click', ()=>{
  popupEditProfile.open();
  profileFormValidator.disableButton();
  const userData = userInfo.getUserInfo();
  nameInput.value=userData.name;
  jobInput.value=userData.job;
});
  function handleProfileFormSubmit(data){
    userInfo.setUserInfo(data.name, data.job);
  }
//отображение массива карточек
  const cardList = new Section({
    items: initialCards,
    renderer: (item)=>{
      cardList.addItem(createCard(item));
    }
  }, cardsContainer);
  cardList.renderItems();

//открытие формы для карточки
const popupAddCard = new PopupWithForm(popupNewCard, handleCardFormSubmit);
buttonAddCard.addEventListener('click', ()=>{
  cardFormValidator.resetError();
  popupAddCard.open();
  cardFormValidator.disableButton();
})
//добавление новой карточки
popupAddCard.setEventListeners();
function handleCardFormSubmit(data){
  cardsContainer.prepend(createCard(data));
}
//функция генерации карточки
function createCard(data){
  const newCard = new Card({name: data.card, link: data.link}, template, handleCardClick);
  const createNewCard = newCard.generateCard();
  return createNewCard;
}