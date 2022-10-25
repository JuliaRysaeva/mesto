export class Card {
  constructor ({name, link}, template, clickOnCard){
  this._name=name;
  this._link=link;
  this._clickOnCard = clickOnCard;
  this._template = template;
  }
  //метод, возвращающий карточку из разметки в DOM элемент
  _getTemplate(){
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  _setEventListeners(){
    //лайк
    this._likeButton.addEventListener('click', ()=>{
      this._likeCard(); 
    });
    //удаление
    this._element.querySelector('.element__bin').addEventListener('click', (evt)=>{
      this._deleteCard(evt);
    });
    // на весь экран
    this._cardImage.addEventListener('click', ()=>{
      this._clickOnCard({name:this._name, link:this._link});
    }); 
  }
  _deleteCard(evt){
    const cardToDelete = evt.target.closest('.element');
    cardToDelete.remove();
  }
  _likeCard(){
    this._likeButton.classList.toggle('element__vector_active'); 
  }
  //метод, создающий карточку с названием и картинкой (наполнение карточки)
  generateCard(){
    this._element=this._getTemplate();
    this._cardImage = this._element.querySelector('.element__mask-group');
    this._likeButton = this._element.querySelector('.element__vector');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;    
  }
}



