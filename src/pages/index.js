import './index.css'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Api} from '../components/Api.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithConfirmation} from '../components/PopupWithConfirmation'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import {popupProfileEdit, nameInput, jobInput,
  buttonProfileEdit, picturePopup, profileName,
  profileJob, buttonAddCard, popupNewCard, cardsContainer,
  template, configApi, configValidation} from '../utils/constants.js'

  let userId /* = 'a76f63b4457d81002b00501b' */
//валидация
const formForProfile=document.querySelector('.popup_type_profile-edit')
const profileFormValidator = new FormValidator(configValidation, formForProfile);
profileFormValidator.enableValidation();
const formForCard=document.querySelector('.popup_type_add-card') 
const cardFormValidator = new FormValidator(configValidation, formForCard);
cardFormValidator.enableValidation();
const formForAvatar=document.querySelector('.popup_type_update-avatar') 
const avatarFormValidator = new FormValidator(configValidation, formForAvatar);
avatarFormValidator.enableValidation();
// картинка на весь экран
const picture = new PopupWithImage(picturePopup)
picture.setEventListeners();

function handleCardClick({name:name, link:link}){
  picture.open({name:name, link:link});  
}
//api
const api = new Api(configApi)
const profilePhoto = document.querySelector('.profile__photo')
const userInfo = new UserInfo({name:profileName, about:profileJob,
  avatar:profilePhoto, userId: userId})

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
.then(([res, arr])=>{
  userInfo.setUserInfo(res.name, res.about, res._id); 
  userInfo.setAvatar(res.avatar);
  const userData = userInfo.getUserInfo();
  nameInput.value=userData.name;
  jobInput.value=userData.about;
  cardList.renderItems(arr)
})
.catch((err)=>{
  console.log(err)
})
const cardList = new Section({
  renderer: (item)=>{
    cardList.addItem(createCard(item));
  }
}, cardsContainer);
//открытие формы для профиля
const profileOverlay = document.querySelector('.profile__overlay')
const popupEditProfile = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit)
popupEditProfile.setEventListeners();

buttonProfileEdit.addEventListener('click', ()=>{
  popupEditProfile.open();
  profileFormValidator.resetError();
  profileFormValidator.disableButton();
});
//обработчик отправки данных профиля на сервер
function handleProfileFormSubmit(data){
  popupEditProfile.setButtonState(true,'Сохранение...')
  api.setUserInfoApi(data.name, data.about)
  .then(res=>{
    userInfo.setUserInfo(res.name, res.about, res._id)
    popupEditProfile.close()
  }) 
  .catch((err) => {console.log(err)})
  .finally(()=>popupEditProfile.setButtonState(false,'Сохранение...'))
}
//смена аватара
const popupForAvatar = document.querySelector('.popup_type_update-avatar')   
const newAvatar = new PopupWithForm(popupForAvatar, handleAvatar)
newAvatar.setEventListeners();
profileOverlay.addEventListener('click', ()=>{ 
  newAvatar.open();
  avatarFormValidator.resetError();
  avatarFormValidator.disableButton();
})
function handleAvatar(data){
  newAvatar.setButtonState(true,'Сохранение...')
   api.changeAvatarApi(data.link)
   .then(res=>{
    userInfo.setAvatar(res.avatar)
    newAvatar.close()
  })
  .catch((err) => {console.log(err);
  })
  .finally(()=>newAvatar.setButtonState(false,'Сохранение...'))
}
//удаление
const popupForDelete = document.
querySelector('.popup_type_delete-card');
const popupWithConfirm=new PopupWithConfirmation(popupForDelete,handleDeleteSubmit);
popupWithConfirm.setEventListeners();

function handleDeleteSubmit(card){
    popupWithConfirm.open();  
     api.deleteCardApi(card._id)
  .then(()=>{
    card.deleteCard();
  })
  .catch((err) => {
    console.log(err);
  }); 
}
//функция генерации карточки
function createCard(data){
  const newCard = new Card(
    data,
    userInfo.getUserInfo()._id,
    template,
    handleCardClick,
    {handler: (card)=>{
      if(card.checkLike()){
        api.deleteLikeApi(data)
        .then(res=>{
          card.likeCard(res.likes)
        });
        card.likeCard(data.likes);
      }else{
        api.addLikeApi(data)
        .then(res=>{
          card.likeCard(res.likes)
        });
      }
    },
    deleteConfirm:()=>{handleDeleteSubmit(data)}
  })
  const createNewCard = newCard.generateCard();
  return createNewCard;
}
  //открытие формы для карточки
  const popupAddCard = new PopupWithForm(popupNewCard, 
    handleCardFormSubmit);
  buttonAddCard.addEventListener('click', ()=>{
    popupAddCard.open();
    cardFormValidator.resetError();
    cardFormValidator.disableButton();
  })
  //обработчик отправки данных новой карточки
  popupAddCard.setEventListeners();
  function handleCardFormSubmit(data){
    popupAddCard.setButtonState(true,'Создание...')
    api.addCardApi(data.name, data.link)
    .then(res=>{
      cardList.addNewCard(createCard(res))
      popupAddCard.close()
    })
    .catch((err) => {console.log(err)})
    .finally(()=>{
      popupAddCard.setButtonState(false,'Создание...')
    })
  }


