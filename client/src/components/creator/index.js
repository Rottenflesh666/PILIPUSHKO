import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Button} from 'reactstrap';
import {TextArea} from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {observable} from "mobx/lib/mobx";
import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class Creator extends React.Component {

  @observable tasks = [];

  @observable taskName = '';

  selectedTasks = [];
  newTest = {
    test: '',
    tasks: [],
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
    for (let i = 0; i < this.selectedTasks.length; i++) {
      this.newTest.tasks.push(this.tasks[this.selectedTasks[i]]);
    }
    this.newTest.tasks = this.taskName;
    fetch('/admin/create', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.newTest),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Success');
        } else if (response.status === 404) {
          console.log('404 : Not found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onCreateTaskHandler = () => {
    this.props.history.push('/newQuestion')
  };

  onClickListItemHandle = (index) => {
    for (let i = 0; i < this.selectedTasks.length; i++) {
      if (index === this.selectedTasks[i]) {
        this.selectedTasks.splice(i, i);
        return;
      }
    }
    this.selectedTasks.push(index);
  };

  handleTxtAreaChange = (e) => {
    this.taskName = e.target.value;
  };

  showTasksList = () => {
    if (this.tasks.length > 0) {
      return (
        <ListGroup className="list">
          {this.tasks.map((task, index) => (
            <ListGroupItem className="list-item  list-group-item.active  text-left" tag="button">
              {task.task}
              <input type="checkbox" className="checkBox"
                     onChange={() => this.onClickListItemHandle(index)}/>
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
            <div className="tasksListBody">
              {this.showTasksList()}
            </div>
            <div className="textAreaCreator1">
               <TextArea autoHeight value={this.taskName} onChange={this.handleTxtAreaChange}
                         className="message-input msgCreator" rows={1}
                         required/>
            </div>
            <div className="footer bg-primary h-45px">
              <div className="display-inline button-right ">
                <Button className="width100 h-100 button"
                        onClick={this.onCreateHandler}> {'Создать тест'}
                </Button>
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
    )
  }
}