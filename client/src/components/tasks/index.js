import React from 'react';
import {inject, observer} from 'mobx-react';
import {TextArea} from 'semantic-ui-react';
import {observable} from "mobx";
import {Button} from 'reactstrap';
import ConfirmDialog from '../stateless-comp/confirm-dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import back from '../../images/notepad_coffe.jpg';
import './index.css';

@inject("testsStore")
@observer
class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isEnd: false};
  }

  @observable messageText = '';
  @observable isEnd = false;
  @observable isResultOpen = false;
  @observable labelText = '';
  @observable tasks = [];
  @observable resultStr = '';
  goodTasks = [];


  @observable iterator = 0;

  componentWillMount() {
    let iterator = localStorage.getItem('iterator');
    let testStart;
    let kastyl;
    let testId = localStorage.getItem('testId');
    if (iterator === null) {
      localStorage.setItem('iterator', '0');
      testStart = true;
    }
    else {
      this.iterator = parseInt(iterator);
      kastyl = parseInt(iterator) + 1;
    }
    fetch('/api/tasks', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: testId,
      })
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

        if (testStart) {
          for (let i = 0; i < this.tasks.length; i++) {
            this.goodTasks.push(false);
          }
        }
        if (kastyl === response.tasks.length) {
          this.isEnd = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  onTextChange = (event) => {
    this.messageText = event.target.value;
  };

  onNextClickHandler = () => {
    let userId = localStorage.getItem('userId');
    if (!this.goodTasks[this.iterator]) {
      fetch('/tasks/result', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          result: this.messageText,
          taskId: this.tasks[this.iterator].id,
        })
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            console.log('404 : Not found');
          }
        })
        .then((response) => {
          this.goodTasks[this.iterator] = response.correctly;
          this.labelText = '';
          this.messageText = '';
          if (!this.isEnd) {
            this.iterator++;
            localStorage.removeItem('iterator');
            localStorage.setItem('iterator', `${this.iterator}`);
          }
          if (this.iterator + 1 > this.tasks.length - 1) this.isEnd = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      this.labelText = '';
      this.messageText = '';
      if (!this.isEnd) {
        this.iterator++;
        localStorage.removeItem('iterator');
        localStorage.setItem('iterator', `${this.iterator}`);
      }
      if (this.iterator + 1 > this.tasks.length - 1) this.isEnd = true;
    }
  };

  onPrevClickHandler = (e) => {
    e.preventDefault();
    this.labelText = '';
    this.messageText = '';
    this.isEnd = false;
    this.iterator--;
    localStorage.removeItem('iterator');
    localStorage.setItem('iterator', `${this.iterator}`);
  };

  onCheckClickHandler = (e) => {
    e.preventDefault();
    fetch('/api/tasks/check', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.messageText),
    })
      .then((response) => {
        if (response.status === 200) {
          this.labelText = 'Успех';
        }
        else if (response.status === 406) {
          this.labelText = 'Неверный запрос';
        }
        else if (response.status === 404) {
          console.log('404 : Not found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEndClickHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('iterator');
    localStorage.removeItem('testId');
    this.props.history.push('/tests');
  };

  onShowResultClickHandler = (e) => {
    e.preventDefault();
    if (!this.goodTasks[this.iterator]) {
      fetch('/tasks/result', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testId: this.tasks[this.iterator].id,
        })
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            console.log('404 : Not found');
          }
        })
        .then((response) => {
          this.goodTasks[this.iterator] = response.correctly;
          let rightCount = 0;
          for (let i = 0; i < this.tasks.length; i++)
            if (this.goodTasks[i]) rightCount++;
          this.resultStr = `Решено правильно ${rightCount} заданий из ${this.tasks.length}.`;
          this.isResultOpen = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    if (this.tasks.length === 0) return (<div>null</div>);
    return (
      <MuiThemeProvider>
        <div>
          <img src={back} className="back-image"/>
          <div>
            <ConfirmDialog
              title="Результат"
              message={this.resultStr}
              onConfirm={this.onEndClickHandler}
              open={this.isResultOpen}
            />
            <div className="task-back-body">
              <div className="body-with-headFooter">
                <div className="header-text">
                  {this.tasks[this.iterator].task}
                </div>
              </div>
              <div className="message-form">
              <TextArea className="message-input" rows={1}
                        value={this.messageText} onChange={this.onTextChange} required/>
              </div>
              <div className="footer bg-primary h-45px">
                <div className="display-inline button-right">
                  <Button className="width100 h-100 button"
                          onClick={this.isEnd ? this.onShowResultClickHandler : this.onNextClickHandler}> {this.isEnd ? 'Закончить тест' : 'Далее'}
                  </Button>
                </div>
                <div className="display-inline button-right2">
                  <Button className="width100 h-100 button"
                          disabled={this.messageText.length === 0}
                          onClick={this.onCheckClickHandler}> {'Проверить'}
                  </Button>
                </div>
                <div className="display-inline ">
                <TextArea disabled={true} className='labelText' resize={'none'}
                          value={this.labelText}/>
                </div>
                <div className="display-inline button-left ">
                  <Button className="width100 h-100 button"
                          disabled={this.iterator === 0}
                          onClick={this.onPrevClickHandler}> {'Назад'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Tasks;
