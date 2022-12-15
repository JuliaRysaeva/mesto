export class Card {
  constructor (data, template, clickOnCard,{handler, deleteConfirm}){
  this._name=data.name;
  this._link=data.link;
  this._ownerId = data.owner._id;  
  this._cardId = data._id; 
  this._likes = data.likes;
  this._template = template;
  this._clickOnCard = clickOnCard;
  this._handler = handler;
  this._deleteConfirm=deleteConfirm; 
  }
  //проверка на наличие моего id в списке лайков
  checkLike(){
    return this._likes.some(el => {
      return el._id === this._ownerId/* 'a76f63b4457d81002b00501b' */;});  
  }
  //обновление массива массива лайков
  likeCard(likes){ 
    this._likes = likes;  
    this._likesNum.textContent=this._likes.length;   
    this._likeButton.classList.toggle('element__vector_active', this.checkLike())
  }  
  //метод, создающий карточку с названием и картинкой
  generateCard(){
    this._element=this._getTemplate();
    this._cardImage = this._element.querySelector('.element__mask-group');
    this._likeButton = this._element.querySelector('.element__vector'); 
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._showBin();
    this.likeCard(this._likes);
    return this._element;    
  }
  _setEventListeners(){
    //лайк    
    this._likesNum = this._element.querySelector('.element__likes')
    this._likeButton.addEventListener('click', ()=>{      
      this._handler(this);
    })
    //удаление  
      this._element.querySelector('.element__bin')
      .addEventListener('click', ()=>{
        this._deleteConfirm();
    });
    // на весь экран
    this._cardImage.addEventListener('click', ()=>{
      this._clickOnCard({name:this._name, link:this._link});
    }); 
  }
   //метод, возвращающий карточку из разметки в DOM элемент
   _getTemplate(){
    const cardElement = this._template
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }
  deleteCard(evt){    
    const cardToDelete = evt.target.closest('.element');
    cardToDelete.remove();
  }   
  //корзина удаления только на карточках с моим id
  _showBin(){
    if ((this._ownerId==='a76f63b4457d81002b00501b')){
    this._element.querySelector('.element__bin')
    .classList.add('element__bin_active');
    }      
  }  
}
