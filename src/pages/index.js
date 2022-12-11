import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {configValidation} from '../components/FormValidator.js';
import {Api} from '../components/Api.js';
import {content, popupProfileEdit, formProfileEdit, nameInput, jobInput, buttonProfileEdit,
  buttonCloseProfileEdit, profileName, profileJob, buttonAddCard, popupNewCard, cardForm,
  cardName, cardLink, buttonCloseNewCard, cardsContainer, template, picturePopup,
  closeButtonForPic, fullPic, subtitle} from '../utils/constants.js';
  import {PopupWithForm} from '../components/PopupWithForm.js'  
  import {PopupWithImage} from '../components/PopupWithImage.js'
   import Section from '../components/Section.js'
  import UserInfo from '../components/UserInfo.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

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
//api
const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'bf7d5ae4-8116-46c1-83be-285f1b27d098'
  }  
}
const api = new Api(configApi)

//открытие формы для профиля
const profilePhoto = document.querySelector('.profile__photo')
const profileOverlay = document.querySelector('.profile__overlay')

const popupEditProfile = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit)
popupEditProfile.setEventListeners();

const userInfo = new UserInfo({name:profileName, about:profileJob, avatar:profilePhoto})
buttonProfileEdit.addEventListener('click', ()=>{
  popupEditProfile.open();
  profileFormValidator.disableButton();
  const userData = userInfo.getUserInfo();
  nameInput.value=userData.name;
  jobInput.value=userData.about;
});
//обработчик отправки данных профиля на сервер
function handleProfileFormSubmit(data){
  api.getUserInfoApi()
  .then(res=>{
   userInfo.setUserInfo(res.name, res.about);
    console.log('res'+ res)
  })
  api.setUserInfoApi(data.name, data.about)
  .then(res=>{
    return res;
  }) 
  .catch((err) => {console.log(err);
  });
}
//смена аватара
const popupForAvatar = document.querySelector('.popup_type_update-avatar')   
const newAvatar = new PopupWithForm(popupForAvatar, handleAvatar)
newAvatar.setEventListeners();
profileOverlay.addEventListener('click', ()=>{ 
  newAvatar.open();
})
function handleAvatar(data){
   api.changeAvatar(data.link)
   .then(res=>{
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => {console.log(err);
  });
}
//функция генерации карточки
function createCard(data){
  const newCard = new Card({
    name: data.name, 
    link: data.link,
    likes:data.likes,
    owner: {
      _id: data.owner._id
    },
    _id: data._id
  },
    template, handleCardClick,{
      handler: (card)=>{
        const likes = document.querySelector('.element__likes');
        if(card.checkLike()){
          api.deleteLikeApi(data)
          .then(res=>{
            likes.textContent = res.length;})
          }else{
            api.addLikeApi(data)
            .then(res=>{
              likes.textContent = res.length;})
            }},      
      /* handleAddLikeApi:()=>{
        api.addLikeApi(data).then(res=>{
          return res;
        })
      }, 
      handleDeleteLikeApi:()=>{
        api.deleteLikeApi(data).then(res=>{
          return res;
        })        
      } ,*/   
      deleteConfirm:()=>{
        handleDeleteSubmit(data)
      }
    })
  const createNewCard = newCard.generateCard();
  return createNewCard;  
}
//открытие формы для карточки (работает)
const popupAddCard = new PopupWithForm(popupNewCard, handleCardFormSubmit, 'text');
buttonAddCard.addEventListener('click', ()=>{
  cardFormValidator.resetError();
  popupAddCard.open();
  cardFormValidator.disableButton();
})
//обработчик отправки данных новой карточки новой карточки(работает)
popupAddCard.setEventListeners();
function handleCardFormSubmit(data){
  api.addCardApi(data.name, data.link)
  .then(res=>{
    cardsContainer.prepend(createCard(res));
  })
}
//добавление карточки на сервер (работает)
api.getInitialCards()
.then((data)=>{
const items=data.slice(0,10);
  const cardList = new Section({
    items: items,
    renderer: (item)=>{
      cardList.addItem(createCard(item));
    }
  }, cardsContainer);
  cardList.renderItems();
  api.getUserInfoApi().then(res=>{
  return res})
})
.catch((err) => {
  console.log(err);
});
//удаление (работает)
const popupForDelete = document.querySelector('.popup_type_delete-card');
const PopupWithConfirm=new PopupWithConfirmation(popupForDelete, handleDeleteSubmit);
PopupWithConfirm.setEventListeners();

function handleDeleteSubmit(card){
  PopupWithConfirm.open();
  api.deleteCardApi(card._id)
  .then(()=>{  
  })
  .catch((err) => {
    console.log(err);
  });
}
