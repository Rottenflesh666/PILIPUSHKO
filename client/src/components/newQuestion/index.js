import React from 'react';
import {inject, observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Button} from 'reactstrap';
import {TextArea} from 'semantic-ui-react';
import {observable} from "mobx/lib/mobx";
import back from '../../images/adminBack.jpg';
import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class NewQuestion extends React.Component {


  @observable newQuestion = {
    question: '',
    answer: '',
    dataEmpty: true
  };


  handleChange = (event) => {
    if (event.target.name === 'question')
      this.newQuestion.question = event.target.value;
    else
      this.newQuestion.answer = event.target.value;

    this.newQuestion.dataEmpty = this.newQuestion.question.length < 10 || this.newQuestion.answer.length < 10;
  };


  componentWillMount = () => {

  };

  onNewQuestionHandler = () => {
    fetch('/admin/newQuestion', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.newQuestion),
    })
      .then((response) => {
        if (response.status === 200) {
          this.newQuestion.question = "";
          this.newQuestion.answer = "";
          this.newQuestion.dataEmpty = true;

          alert('Success');
        } else if (response.status === 404) {
          console.log('404 : Not found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  Добавление вопроса
                </div>
              </div>

              <div>
                <div className="card">
                  <div className="card-header area-input-header">
                    Вопрос
                  </div>
                  <div className="card-body">
                <TextArea className="area-input msgCreator" rows={1}
                          name="question"
                          value={this.newQuestion.question}
                          onChange={this.handleChange}
                          required/>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header area-input-header">
                    Ответ
                  </div>
                  <div className="card-body">
               <TextArea autoHeight className="area-input msgCreator" rows={1}
                         name="answer"
                         value={this.newQuestion.answer}
                         onChange={this.handleChange}
                         required/>
                  </div>
                </div>
              </div>

              <div className="footer bg-primary h-45px">
                <div className="display-inline button-right ">
                  <Button className="width100 h-100 button"
                          disabled={this.newQuestion.dataEmpty}
                          onClick={this.onNewQuestionHandler}> {'Добавить'}
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
