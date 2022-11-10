export default class UserInfo {
  constructor ({name, about, avatar}){
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
  getUserInfo(){
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }
  getAvatar(){
    return {
      avatar: this._avatar.src
    }
  }
  setAvatar(newAvatar){
    this._avatar.src=newAvatar;
    this._avatar.alt='Ваше фото';
  }
  setUserInfo(newName, newAbout){
    this._name.textContent=newName;
    this._about.textContent=newAbout;
  }
}