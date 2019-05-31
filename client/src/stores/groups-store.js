import {observable, action, computed} from 'mobx';

class groupsStore{
  @observable groupsList;

  constructor(){
    this.groupsList = [{id: '1', name: 'Drittes Reich'},{id: '2', name: 'Фиксики'}];
  }

  @action setData = (groupsList) =>{
    this.groupsList = groupsList;
  };

  @action handlePasswordChange = (e) =>{
    e.preventDefault();
    this.userInfo.password = e.target.value;
  };

  @computed get getData(){
    return this.groupsList;
  };
}

export default new groupsStore();
