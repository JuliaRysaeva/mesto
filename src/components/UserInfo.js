export default class UserInfo {
  constructor ({name, about, avatar}){
    this._name = name
    this._about = about
    this._avatar = avatar
  }
  getUserInfo(){
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      _id: this.userId
    }
  }
  setUserInfo(newName, newAbout, userId){
    this._name.textContent=newName;
    this._about.textContent=newAbout;
    this.userId=userId;
  }
  setAvatar(newAvatar){
    this._avatar.src=newAvatar;
    this._avatar.alt='Ваше фото';
  }

}