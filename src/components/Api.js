export class Api{
  constructor(config){
    this._url = config.url;
    this._headers=config.headers;    
  }
  //отображение карточек
  getInitialCards(){
    return fetch(`${this._url}/cards`, {headers: this._headers})
    .then(res => {
      if (res.ok){
        return res.json()        
      }else{
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((er)=>{return Promise.reject(er)})
  }
/*   getUserInfo(){
    return fetch(`${this._url}/users/me`, {headers: this._headers})
    .then(res => {
      if (res.ok){        
        return res.json()        
      }else{
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((er)=>{return Promise.reject(er)})
  } */
  //инфо о пользователе
  setUserInfoApi(name, about){   
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH', 
      headers:this._headers,
      body: JSON.stringify({name: name, about: about})})
    .then(res => {
      if (res.ok){        
        return res.json()        
      }else{
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((er)=>{return Promise.reject(er)})
  }
  //добавление карточки
  addCardApi(name, link){
    return fetch(`${this._url}/cards`, {
      method: 'POST', 
      headers:this._headers,
      body: JSON.stringify({name: name, link: link})})
      .then(res => {
      if (res.ok){        
        return res.json()        
      }else{
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((er)=>{return Promise.reject(er)})
  }
  
deleteCardApi(cardId){
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE', 
    headers:this._headers})
    .then(res => {
    if (res.ok){        
      return res.json()        
    }else{
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch((er)=>{return Promise.reject(er)})
}
//смена аватара
changeAvatar(url){
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH', 
    headers:this._headers,
    body: JSON.stringify({avatar: url})})
  .then(res => {
    if (res.ok){        
      return res.json()        
    }else{
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch((er)=>{return Promise.reject(er)})
}
//постановка лайка 
addLikeApi(card){
  return fetch(`${this._url}/cards/${card._id}/likes`, {
    method: 'PUT', 
    headers:this._headers,
    body: JSON.stringify({_id:'1ab53a77e830727eb646c0cb'})})
    .then(res => {
    if (res.ok){        
      return res.json()        
    }else{
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch((er)=>{return Promise.reject(er)})
}
//удаление лайка
deleteLikeApi(card){
  return fetch(`${this._url}/cards/${card._id}/likes`, {
    method: 'DELETE', 
    headers:this._headers})
    .then(res => {
    if (res.ok){        
      return res.json()        
    }else{
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch((er)=>{return Promise.reject(er)})
}
}
