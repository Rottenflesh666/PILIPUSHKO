import {observable, action, computed} from 'mobx';

class loginStore{
  @observable testsList;

  constructor(){
    this.testsList = [];

  }

  @action setData = (testsList) =>{
    this.testsList = testsList;
  };

  @action setCurTestId = (testId) =>{
    localStorage.setItem('testId', testId);
  };

  @action setTasksList = (tasksList) =>{
    localStorage.setItem('tasksList', tasksList)
  };

  @action handlePasswordChange = (e) =>{
    e.preventDefault();
    this.userInfo.password = e.target.value;
  };

  @computed get getData(){
    return this.testsList;
  };
}

export default new loginStore();
