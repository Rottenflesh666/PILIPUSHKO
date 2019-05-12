import {observable, action} from 'mobx';

class loginStore{
  @observable userInfo;

  constructor(){
    this.userInfo = {
      login:'',
      password:'',
    }
  }

  @action handleLoginChange = (e) =>{
    e.preventDefault();
    this.userInfo.login = e.target.value;
  };

  @action handlePasswordChange = (e) =>{
    e.preventDefault();
    this.userInfo.password = e.target.value;
  };

  @action clearForm = () =>{
    this.userInfo = {
      login:'',
      password:'',
    }
  }
}

export default new loginStore();
