import {clickOnCard} from './index.js';
import {handleAddCardFormSubmit} from './index.js';
import {cardsContainer} from './index.js';

const initialCards = [
  {name: 'Земля', link: 'images/earth.jpg'},
  {name: 'Сатурн', link: 'images/saturn.jpg'},
  {name: 'Луна', link: 'images/moon.jpg'},
  {name: 'Уран', link: 'images/uranus.jpg'},
  {name: 'Венера', link: 'images/venus.jpg'},
  {name: 'Млечный путь', link: 'images/milkyway.jpg'},
];

export class Card {
  constructor (name, link, clickOnCard, handleAddCardFormSubmit) {
  this._name=name;
  this._link=link;
  this._clickOnCard = clickOnCard;
  this._handleAddCardFormSubmit = handleAddCardFormSubmit;
  }
  //метод, возвращающий карточку из разметки в DOM элемент
  _getTemplate(){
    const cardElement = document
    .querySelector('#template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
  //метод, создающий карточку с названием и картинкой (наполнение карточки)
  generateCard(){
    this._element=this._getTemplate();
    this._cardImage = this._element.querySelector('.element__mask-group');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
  _setEventListeners(){
    //лайк
    this._element.querySelector('.element__vector').addEventListener('click', ()=>{
      this._likeCard(); 
    });
    //удаление
    this._element.querySelector('.element__bin').addEventListener('click', (evt)=>{
      this._deleteCard(evt);
    });
    //на весь экран
    this._cardImage.addEventListener('click', ()=>{
      this._clickOnCard(this._name, this._link);
    });
  }
  _deleteCard(evt){
    const cardToDelete = evt.target.closest('.element');
    cardToDelete.remove();
  }
  _likeCard(){
    this._element.querySelector('.element__vector').classList.toggle('element__vector_active'); 
  }
}
initialCards.forEach((el)=>{
  const card = new Card(el.name, el.link, clickOnCard, handleAddCardFormSubmit);
  const createCard=card.generateCard();
  cardsContainer.append(createCard);
});

