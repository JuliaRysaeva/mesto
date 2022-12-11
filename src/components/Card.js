export class Card {
  constructor (data, template, clickOnCard,
    {handler, /* handleAddLikeApi, handleDeleteLikeApi, */ deleteConfirm}){
  this._name=data.name;
  this._link=data.link;
  this._clickOnCard = clickOnCard;
  this._template = template;
  this._userId = data.owner._id;
  this._likes = data.likes;
  this._cardId = data._id; 
  this._handler = handler;
  /* this._addLikeApi=handleAddLikeApi;
  this._deleteLikeApi=handleDeleteLikeApi; */
  this._deleteConfirm=deleteConfirm;
  }
  //смена состояния кнопки лайка
  _likeCard(){
    if (this.checkLike()){      
      this._likeButton.classList.add('element__vector_active');
      //console.log("есть лайк")
    } else{      
      this._likeButton.classList.remove('element__vector_active'); 
      //console.log("нет лайка")
    }
  }
  //проверка на наличие моего id в списке лайков
  checkLike(){
     const res = this._likes.some(el => {
      el._id === this._userId;     
    });return res;
  }
  _setEventListeners(){
    //лайк    
    const likes = this._element.querySelector('.element__likes');
    likes.textContent = this._likes.length;
    this._likeButton.addEventListener('click', ()=>{    
      this._handler(this);
      this._likeCard();
    });
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
    if ((this._userId==='1ab53a77e830727eb646c0cb')){
    this._element.querySelector('.element__bin')
    .classList.add('element__bin_active');
    }      
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
    this._showBin();
    return this._element;    
  }
}



