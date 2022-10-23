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
      item = new Card({name: item.name, link: item.link}, template);
      const generate = item.generateCard();
      cardList.addItem(generate);
    }
  }, cardsContainer);
  cardList.renderItems();

//обработчик отправки формы карточки
/* function handleAddCardFormSubmit(e) {
  e.preventDefault();  
  const name = cardName.value;
  const link = cardLink.value; 
  const card = createCard({name:name, link:link});
  cardsContainer.prepend(card);  
} */

//обработчики для добавления карточки
/* buttonAddCard.addEventListener('click', () => {
  open(popupNewCard);
  cardFormValidator.disableButton(); */
  //при каждом открытии попапа поля пустые
/*   cardForm.reset();   */
//});
//buttonCloseNewCard.addEventListener('click', () => close(popupNewCard));

//валидация
const formForProfile=document.querySelector('.popup_type_profile-edit')
const profileFormValidator = new FormValidator(configValidation, formForProfile);
profileFormValidator.enableValidation();
const formForCard=document.querySelector('.popup_type_add-card') 
const cardFormValidator = new FormValidator(configValidation, formForCard);
cardFormValidator.enableValidation();

//открытие формы для карточки
buttonAddCard.addEventListener('click', ()=>{
  const item = new PopupWithForm(popupNewCard, handleCardFormSubmit)
  item.setEventListeners();
  item.open()})

//открытие формы для профиля
buttonProfileEdit.addEventListener('click', ()=>{
  const item1 = new PopupWithForm(popupProfileEdit,
    handleProfileFormSubmit)
    item1.setEventListeners();
    item1.open();
    const item = new UserInfo({name:profileName, job:profileJob})
    const userData = item.getUserInfo();
    nameInput.value=userData.name;
    jobInput.value=userData.job;

  }); 
  function handleProfileFormSubmit(data){     
    const item = new UserInfo({name:profileName, job:profileJob})
    item.setUserInfo(data.name, data.job);                
   } 

  function handleCardFormSubmit(){
}
