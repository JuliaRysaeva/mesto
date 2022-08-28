const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('#name');
const jobInput = popup.querySelector('#about');
const openButton = content.querySelector('.profile__icon');
const closeButton = popup.querySelector('.popup__close-icon');
const safeButton = popup.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const addButton = content.querySelector('.profile__add-button');
const newCard = document.querySelector('.newcard');
const cardForm = document.querySelector('.newcard__form');
const cardName = document.querySelector('.newcard__name');
const cardLink = document.querySelector('.newcard__link');
const createButton = document.querySelector('.newcard__button');
const closeButtonForCard = newCard.querySelector('.popup__close-icon');
const elements = content.querySelector('.elements');
const template = document.querySelector('#template').content;
 
//поля формы по умолчанию заполнены данными со страниицы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
 
  function formSubmitHandler (evt) {    
  // Отмена стандартной отправки формы для определения собственной логики отправки. 
  evt.preventDefault();  
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
  //НЕсохрание данных при закрытии попапа  
    closeButton.addEventListener ('click', function (){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }); 
     
  function handleSubmit(e){
    e.preventDefault();    
    const Name = cardName.value;
    const Link = cardLink.value;
    Cards({name: `${Name}`, link: `${Link}`});
    //при каждом открытии попапа поля пустые
    cardName.value='';
    cardLink.value='';
  }
  cardForm.addEventListener('submit', handleSubmit);

  function newCardForm (){    
    newCard.classList.toggle('popup_opened');    
  }
    addButton.addEventListener('click', newCardForm);
    closeButtonForCard.addEventListener('click', newCardForm);
    createButton.addEventListener('click', newCardForm);    
    
  const elArray = [
    {name: 'Земля', link: 'images/earth.jpg'},
    {name: 'Сатурн', link: 'images/saturn.jpg'},
    {name: 'Луна', link: 'images/moon.jpg'},
    {name: 'Уран', link: 'images/uranus.jpg'},
    {name: 'Венера', link: 'images/venus.jpg'},
    {name: 'Млечный путь', link: 'images/milkyway.jpg'},
  ];
    //отображение массива и добавление новой карточки
  function Cards(el) {
    //копирование содержимого шаблона в переменную item
    const item = template.cloneNode(true);
    item.querySelector('.element__title').textContent = el.name;
    item.querySelector('.element__mask-group').src = el.link;    
    //выбираем кнопку лайка из шаблона  
    const likeButton = item.querySelector('.element__vector');
    //функция обработчик клика с колбэком 
    likeButton.addEventListener('click', function (){
    likeButton.classList.toggle('element__vector_active');      
   });
   elements.prepend(item);
   
   //удаление 
    const binButton = document.querySelector('.element__bin');
    binButton.addEventListener('click', function(evt){
      const delCard = evt.target.closest('.element');
      delCard.remove();
    })
    //картинка на весь экран
    const picturePopup = document.querySelector('.full-picture');
    const Pic = document.querySelector('.element__mask-group');    
    const closeButtonForPic = picturePopup.querySelector('.popup__close-icon');
    const bigPic = picturePopup.querySelector('.element__mask-group');
    const subtitle = picturePopup.querySelector('.full-picture__subtitle');    
    
    function showPic(){
      picturePopup.classList.toggle('full-picture_opened');
      bigPic.src=el.link;
      subtitle.textContent = el.name;
    }    
    Pic.addEventListener('click', showPic);
    closeButtonForPic.addEventListener('click',function (){
      picturePopup.classList.remove('full-picture_opened');
    });
  }; 
    elArray.forEach(Cards);