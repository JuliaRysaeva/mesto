export const content = document.querySelector('.content');
export const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
export const nameInput = popupProfileEdit.querySelector('.popup__form-field_user-name_name');
export const jobInput = popupProfileEdit.querySelector('.popup__form-field_user-job_job');
export const buttonProfileEdit = content.querySelector('.profile__icon');
export const buttonCloseProfileEdit = popupProfileEdit.querySelector('.popup__close-icon');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__job');
export const buttonAddCard = content.querySelector('.profile__add-button');
export const popupNewCard = document.querySelector('.popup_type_add-card');
export const cardForm = document.querySelector('.popup__form_type_add-card');
export const cardName = document.querySelector('.popup__form-field_card-name_name');
export const cardLink = document.querySelector('.popup__form-field_card-link_link');
export const buttonCloseNewCard = popupNewCard.querySelector('.popup__close-icon_type_add-card');
export const cardsContainer = content.querySelector('.elements');
export const template = document.querySelector('#template').content;
export const picturePopup = document.querySelector('.popup_type_full-picture');
export const closeButtonForPic = picturePopup.querySelector('.popup__close-icon_type_full-picture');
export const fullPic = picturePopup.querySelector('.full-picture__card');
export const subtitle = picturePopup.querySelector('.full-picture__subtitle');

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'a8376a6a-c722-450c-a41c-6e86d0a979a4'
  }  
}
export const configValidation = {
  form: '.popup__form',
  input: '.popup__form-field',
  button: '.popup__button',
  inputError: 'popup__form-field_type_error',
  errorVisible: 'popup__input-error_active',  
  buttonDisabled: 'popup__button_disabled'
};