import {observable, action, computed} from 'mobx';

class loginStore {
  @observable testsList;

  constructor() {
    this.testsList =
      [
        {id: '1', name: '2323213123213'},
        {id: '2', name: 'dsadsasdsadsd'},
        {id: '3', name: '2323asdasdasdsa213123213'},
        {id: '4', name: '23232dasdsad13123213'},
        {id: '5', name: '2323213123213'},
        {id: '6', name: '23232131asdasd23213'},
        {id: '7', name: '2323213sasadsasa123213'},
        {id: '8', name: '2323213dsasad123213'},
        {id: '9', name: '2323213asdsadsadsa123213'},
        {id: '10', name: '232321sasaas3123213'},
        {id: '11', name: '232321sadas3123213'},
        {id: '12', name: 'ddaddsa'},
        {id: '13', name: '2323dsdasd213123213'},
        {id: '14', name: '2323dasdasd213123213'},
        {id: '15', name: '23232asdasdas13123213'},
        {id: '16', name: '23232sadasd13123213'},
        {id: '17', name: '2323asdas213123213'},
        {id: '18', name: '2323asdasdas213123213'},
        {id: '19', name: '23232dadasdsa13123213'},
        {id: '20', name: '23232dasasda13123213'},
      ];

  }

  @action setData = (testsList) => {
    this.testsList = testsList;
  };

  @action setCurTestId = (testId) => {
    localStorage.setItem('testId', testId);
  };

  @action setTasksList = (tasksList) => {
    localStorage.setItem('tasksList', tasksList)
  };

  @action handlePasswordChange = (e) => {
    e.preventDefault();
    this.userInfo.password = e.target.value;
  };

  @computed get getData() {
    return this.testsList;
  };
}

export default new loginStore();
