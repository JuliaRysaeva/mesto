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
const cardsContainer = content.querySelector('.elements');
const template = document.querySelector('#template').content;
const picturePopup = document.querySelector('.popup_type_full-picture');
const closeButtonForPic = picturePopup.querySelector('.popup__close-icon_type_full-picture');
const fullPic = picturePopup.querySelector('.full-picture__card');
const subtitle = picturePopup.querySelector('.full-picture__subtitle');

const initialCards = [
  {name: 'Земля', link: 'images/earth.jpg'},
  {name: 'Сатурн', link: 'images/saturn.jpg'},
  {name: 'Луна', link: 'images/moon.jpg'},
  {name: 'Уран', link: 'images/uranus.jpg'},
  {name: 'Венера', link: 'images/venus.jpg'},
  {name: 'Млечный путь', link: 'images/milkyway.jpg'},
];

function handleProfileFormSubmit (evt) {
  evt.preventDefault();  
  // Новые значения профиля из формы с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

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

//обработтчики для добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  buttonCreateCard.classList.add('popup__button_disabled');
  //при каждом открытии попапа поля пустые
  cardForm.reset();
});
buttonCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));
buttonCreateCard.addEventListener('click', () => closePopup(popupNewCard));

//закрытие окна с большой картинкой 

//При каждом выполнении функции renderCard на кнопку закрытия добавляются обработчики,
//они копятся и происходит утечка памяти, это лишняя нагрузка. 
//Обработчик для закрытия нужно расположить в глобальной области видимости
closeButtonForPic.addEventListener('click', () => closePopup(picturePopup));

//поля формы по умолчанию заполнены данными со страниицы
buttonProfileEdit.addEventListener ('click', function (){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}); 
//обработчик отправки формы при создании новой карточки
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  buttonCreateCard.setAttribute('disabled', true)
  const name = cardName.value;
  const link = cardLink.value;
  const card=renderCard({name: name, link: link});
  cardsContainer.prepend(card);
}
cardForm.addEventListener('submit', handleAddCardFormSubmit);

//вывод массива карточек на страницу
function renderCard(el) {
  const item = template.cloneNode(true);
  const pic = item.querySelector('.element__mask-group');
  pic.alt = el.name;
  pic.src = el.link;
  item.querySelector('.element__title').textContent = el.name;  
  //кнопка лайка
  const likeButton = item.querySelector('.element__vector');
  likeButton.addEventListener('click', function (){
  likeButton.classList.toggle('element__vector_active');      
  });
  //удаление
  const binButton = item.querySelector('.element__bin');
  binButton.addEventListener('click', function(evt){
    const cardToDelete = evt.target.closest('.element');
    cardToDelete.remove();
  })

  //картинка на весь экран
  pic.addEventListener('click', function (){
    openPopup(picturePopup);
    fullPic.src = el.link;
    subtitle.textContent = el.name;
    fullPic.alt = el.name;
  });
  //сохранение карточки в возвращаемом значении функции
  return item;
};
initialCards.forEach((el) =>{
  //результат фнкции в переменную card
  const card = renderCard({name: el.name, link: el.link});
  cardsContainer.prepend(card);   
});
//закрытие попапов нажатием на оверлей
function closeByOverlay(evt){
  if(!evt.target.closest('.popup__container')){
    closePopup(document.querySelector('.popup_opened'));
  }}
popupNewCard.addEventListener('click', closeByOverlay);
popupProfileEdit.addEventListener('click', closeByOverlay);
picturePopup.addEventListener('click', closeByOverlay);
