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

  @observable messageText = '';
  @observable isEnd = false;
  @observable isResultOpen = false;
  @observable labelText = 'Неверный запрос';
  @observable tasks = [
    {
      id: '1',
      task: 'Что означает, например, такое время вылета (прилета) в таблице Trip: "1900-01-01 14:30:00.000"?',
    },
    {
      id: '2',
      task: 'Что означают ответы "Несовпадение данных", "Неверное число записей" и т.п. при проверке решения?',
    },
    {
      id: '3',
      task: 'Что такое "стоимость", "эффективность", "план выполнения", "оптимизация" и зачем нам это? ',
    },
    {
      id: '4',
      task: 'При повторном решении ранее решенного упражнения SELECT появляется кнопка "Записать". Что это? Изменится ли при этом мой рейтинг?',
    },
  ];

  @observable iterator = 0;

  componentWillMount = () => {
    //Get tests list FETCH('testsList')

  };

  onTextChange = (event) => {
    this.messageText = event.target.value;
  };

  onNextClickHandler = (e) => {
    e.preventDefault();
    this.labelText = '';
    this.messageText = '';
    if (!this.isEnd) this.iterator++;
    if (this.iterator + 1 > this.tasks.length - 1) this.isEnd = true;
  };

  onPrevClickHandler = (e) => {
    e.preventDefault();
    this.labelText = '';
    this.messageText = '';
    this.isEnd = false;
    this.iterator--;
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
    this.props.history.push('/tests')
  };

  onShowResultClickHandler = (e) => {
    e.preventDefault();
    this.isResultOpen = true;
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <img src={back} className="back-image"/>
          <div>
            <ConfirmDialog
              title="Результат"
              message={'Решено правильно ... заданий из ... ?'}
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
                  <TextArea disabled={true} className='labelText' resize={'none'} value={this.labelText}/>
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
