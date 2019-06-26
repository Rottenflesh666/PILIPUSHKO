import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Button} from 'reactstrap';
import {TextArea} from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {observable} from "mobx/lib/mobx";
import back from '../../images/adminBack.jpg';
import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class Creator extends React.Component {

  @observable tasks = [];

  @observable taskName = '';
  @observable isEditOn = false;
  @observable txtAreaDisabled = true;
  @observable taskValue = '';

  selectedTasks = [];
  newTest = {
    test: '',
    tasks: [],
  };

  @observable
  compState = {
    selected: null,
    selectedTaskID: null,
    selectedTaskName: null,
    selectedTaskValue: null,
  };


  componentWillMount = () => {
    fetch('/admin/tasks', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          console.log('404 : Not found');
        }
      })
      .then((response) => {
        this.tasks = response.tasks;
      })
      .catch((err) => {
        console.log(err);
      });
  };


  onCreateHandler = () => {
    this.props.history.push(`${this.props.match.path}/map`);
  };

  onCreateTaskHandler = () => {
    this.props.history.push('/newQuestion')
  };

  onClickListItemHandle = (task, index) => {
    this.compState = ({
      selected: index,
      selectedTaskID: task.id,
      selectedTaskName: task.task,
      selectedTaskValue: task.value,
    });
    this.taskName = task.task;
    this.taskValue = task.value;
    this.txtAreaDisabled = false;
  };


  handleTxtAreaChange = (e) => {
    this.taskName = e.target.value;
  };

  onEditClickHandler = () => {
    this.isEditOn = !this.isEditOn;
    if (!this.txtAreaDisabled) this.txtAreaDisabled = !this.txtAreaDisabled;
  };

  handleTaskValueChange = (e) =>{
    this.taskValue = e.target.value;
  };

  showTasksList = () => {
    if (this.tasks.length > 0) {
      return (
        <ListGroup className="list">
          {this.tasks.map((task, index) => (
            <ListGroupItem className="list-item  list-group-item.active  text-left" tag="button"
                           onClick={() => this.onClickListItemHandle(task, index)}>
              {task.task}
            </ListGroupItem>
          ))}
        </ListGroup>
      )
    } else {
      return (
        <div className="center-screen h6 font-italic text-center">
          Вопросы не найдены
        </div>
      )
    }
  };

  render() {
    return (
      <div>
        <img src={back} className="back-image"/>
        <MuiThemeProvider>
          <div>
            <div className="task-back-body">
              <div className="header">
                <div className="header-text">
                  Список вопросов:
                </div>
                <div>
                  {/*Название теста:*/}
                </div>
              </div>
              <div
                className={this.isEditOn ? "tasksListBodyActiveModify" : "tasksListBodyDisabledModify"}>
                {this.showTasksList()}
              </div>
              <div className={this.isEditOn ? "" : "hideDisabledPart"}>

              </div>
              <div className={this.isEditOn ? "rightPartCreator" : "disabledPart"}>
                <div
                  className="textAreaCreatorActiveModify">
               <TextArea autoHeight value={this.taskName} onChange={this.handleTxtAreaChange}
                         className={this.isEditOn ? "message-input msgCreator max-height100" : ""}
                         rows={1}
                         disabled={this.txtAreaDisabled}
                         required/>
                </div>
                <div className="rightPartBottom">
                  <div className="markLabelDiv">
                    <div>Баллы:</div>
                  </div>
                  <div className="markInputDiv">
                    <TextArea  value={this.taskValue}
                               disabled={this.txtAreaDisabled}
                               onChange={this.handleTaskValueChange}
                               className="markInput"/>
                  </div>
                  <Button className="btnSaveEditedQuestion">Сохранить</Button>
                </div>
              </div>
              <div className="footer bg-primary h-45px">
                <div className="rightButtonsContainer">
                  <div className="display-inline button-right ">
                    <Button className="width100 h-100 button"
                            onClick={this.onCreateHandler}> {'Карта базы'}
                    </Button>
                  </div>
                  <div className="display-inline button-right2">
                    <Button className="width100 h-100 button"
                            onClick={this.onEditClickHandler}> {this.isEditOn ? 'Отключить' : 'Редактировать'}
                    </Button>
                  </div>
                </div>
                <div className="display-inline button-left ">
                  <Button className="width120 h-100 button"
                          disabled={this.iterator === 0}
                          onClick={this.onCreateTaskHandler}> {'Добавить вопрос'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
