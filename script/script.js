let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#about');
let openButton = content.querySelector('.profile__icon');
let closeButton = popup.querySelector('.popup__close-icon');
let safeButton = popup.querySelector('.popup__button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');

//поля формы при открытии заполняются данными, которые отражены на странице
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

  function formSubmitHandler (evt) {    
  // Отмена стандартной отправки формы для определения собственной логики отправки. 
  evt.preventDefault();

  // Значение полей jobInput и nameInput из свойства value
  nameInput.value;
  jobInput.value;
  
  // Новые значения профиля из формы с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}   
   // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', formSubmitHandler);
  
  function Popup() {
  popup.classList.toggle('popup_opened');
 }
  openButton.addEventListener ('click', Popup);
  closeButton.addEventListener ('click', Popup);
  safeButton.addEventListener ('click', Popup);
