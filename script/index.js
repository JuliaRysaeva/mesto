const content = document.querySelector('.content');
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const nameInput = popupProfileEdit.querySelector('.popup__form-field_user-name_name');
const jobInput = popupProfileEdit.querySelector('.popup__form-field_user-job_job');
const buttonProfileEdit = content.querySelector('.profile__icon');
const buttonCloseProfileEdit = popupProfileEdit.querySelector('.popup__close-icon');
const buttonSafeCard = popupProfileEdit.querySelector('.popup__button_type_safe');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const buttonAddCard = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_add-card');
const cardForm = document.querySelector('.popup__form_type_add-card');
const cardName = document.querySelector('.popup__form-field_card-name_name');
const cardLink = document.querySelector('.popup__form-field_card-link_link');
const buttonCreateCard = document.querySelector('.popup__button_type_create');
const buttonCloseNewCard = popupNewCard.querySelector('.popup__close-icon_type_add-card');
export const cardsContainer = content.querySelector('.elements');
const template = document.querySelector('#template').content;
const picturePopup = document.querySelector('.popup_type_full-picture');
const closeButtonForPic = picturePopup.querySelector('.popup__close-icon_type_full-picture');
const fullPic = picturePopup.querySelector('.full-picture__card');
const subtitle = picturePopup.querySelector('.full-picture__subtitle');

import {Card} from './Card.js';
//обработчик отправки формы профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();  
  // Новые значения профиля из формы с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

//обработчик отправки формы карточки
export function handleAddCardFormSubmit(e) {
  e.preventDefault();
  buttonCreateCard.setAttribute('disabled', true)
  const name = cardName.value;
  const link = cardLink.value;
  const card=new Card(name, link, clickOnCard, handleAddCardFormSubmit).generateCard();
  cardsContainer.prepend(card);
}
cardForm.addEventListener('submit', handleAddCardFormSubmit);

buttonProfileEdit.addEventListener ('click', function (){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}); 

export function clickOnCard (name, link){
  fullPic.src = link;
  subtitle.textContent = name;
  fullPic.alt = name;
  openPopup(picturePopup);
  closeButtonForPic.addEventListener('click',()=>closePopup(picturePopup));
}
//закрытие попапа нажатием на Esc
function keyHandler(evt){
  if (evt.key==='Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}
//функции открытия/закрытия попапов
function openPopup(popup) {  
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
}
function closePopup(popup) {
  document.removeEventListener('keyup', keyHandler);
  popup.classList.remove('popup_opened');
}
buttonProfileEdit.addEventListener ('click', () => openPopup(popupProfileEdit));
buttonCloseProfileEdit.addEventListener ('click', () => closePopup(popupProfileEdit));
buttonSafeCard.addEventListener ('click', () => closePopup(popupProfileEdit));

//обработчики для добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  buttonCreateCard.classList.add('popup__button_disabled');
  //при каждом открытии попапа поля пустые
  cardForm.reset();
});
buttonCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));
buttonCreateCard.addEventListener('click', () => closePopup(popupNewCard));
//закрытие попапов нажатием на оверлей
function closeByOverlay(evt){
  if(!evt.target.closest('.popup__container')&&(!evt.target.closest('.full-picture__card-container'))){
    closePopup(document.querySelector('.popup_opened'));
  }}
popupNewCard.addEventListener('click', closeByOverlay);
popupProfileEdit.addEventListener('click', closeByOverlay);
picturePopup.addEventListener('click', closeByOverlay);