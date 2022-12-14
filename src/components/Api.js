export class Api{
  constructor(config){
    this._url = config.url;
    this._headers=config.headers;    
  }
  _serverResult(res){
    if (res.ok){        
      return res.json()        
    }else{
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
  //отображение карточек
  getInitialCards(){
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => this._serverResult(res))
  }
  getUserInfoApi(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => this._serverResult(res))
  }
  //инфо о пользователе
  setUserInfoApi(name, about){   
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH', 
      headers:this._headers,
      body: JSON.stringify({name: name, about: about})
    })
    .then(res => this._serverResult(res))
  }
  //добавление карточки
  addCardApi(name, link){
    return fetch(`${this._url}/cards`, {
      method: 'POST', 
      headers:this._headers,
      body: JSON.stringify({name: name, link: link})
    })
    .then(res => this._serverResult(res))
  }
  //удаление карточки
  deleteCardApi(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE', 
      headers:this._headers
    })
    .then(res => this._serverResult(res))
  }
  //смена аватара
  changeAvatarApi(url){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH', 
      headers:this._headers,
      body: JSON.stringify({avatar: url})
    })
    .then(res => this._serverResult(res))
  }
  //постановка лайка 
  addLikeApi(card){
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      method: 'PUT',  
      headers:this._headers,
      body: JSON.stringify({_id:'a76f63b4457d81002b00501b'})
    })
    .then(res => this._serverResult(res))
  }
  //удаление лайка
  deleteLikeApi(card){
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers:this._headers
    })
    .then(res => this._serverResult(res))
  }
}