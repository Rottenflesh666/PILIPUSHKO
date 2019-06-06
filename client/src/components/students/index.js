import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextArea} from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {observable} from "mobx/lib/mobx";
import back from '../../images/adminBack.jpg';
import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class Students extends React.Component {

  @observable students = [
    {
      id: '1',
      fullName: 'Barambek kek uzukym1',
    },
    {
      id: '2',
      fullName: 'Barambek kek uzukym2',
    },
  ];
  @observable result = '';
  groupId = 0;

  componentWillMount = () => {
    this.groupId = localStorage.getItem('groupId');
    fetch('/groups/students', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupId: this.groupId,
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
        this.students = response.students;
      })
      .catch((err) => {
        console.log(err);
      });
  };


  onCreateHandler = () => {

  };

  onClickListItemHandle(student) {
    this.compState = ({});
  }

  showTasksList = () => {
    if (this.students.length > 0) {
      return (
        <ListGroup className="list">
          {this.students.map((student, index) => (
            <ListGroupItem className="list-item  list-group-item.active  text-left" tag="button"
                           onClick={() => this.onClickListItemHandle(student)}>
              {student.fullName}
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
                  Список студентов:
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
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
