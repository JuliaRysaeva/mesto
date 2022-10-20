export default class UserInfo {
  constructor ({name, job}){
    this._name = name;
    this._job = job;
  }
  getUserInfo(){
    console.log({
      name: this._name,
      job: this._job
    });
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }
  setUserInfo(nameInput, jobInput){
    nameInput.value = this._name.textContent;
    jobInput.value = this._job.textContent;
  }  
}