import React from 'react';
import {inject, observer} from 'mobx-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import back from '../../images/notepad_coffe.jpg';
import decode from "jwt-decode";
import {observable} from "mobx";
import './index.css';

@inject("testsStore")
@observer

export default class TestsList extends React.Component {

  @observable
  compState = {
    selected: null,
    selectedTestID: null,
    selectedUserName: null
  };

  componentWillMount = () => {
    let route = this.props.location.pathname;
    fetch('/api/tests', {
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
        this.props.testsStore.setData(response.testsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickListItemHandle(test, selectedIndex) {
    this.compState = ({
      selected: selectedIndex,
      selectedTestID: test.id,
      selectedTestName: test.name
    });
  }

  openTestHandler() {
    localStorage.setItem('testId', this.compState.selectedTestID);
    this.props.history.push(`/admin/tests/${this.compState.selectedTestID}`);
  }

  showTestsList() {
    if (this.props.testsStore.testsList.length > 0) {
      return (
        <ListGroup className="list">
          {this.props.testsStore.getData.map((test, index) => (
            /*list-item-user*/
            <ListGroupItem className="list-item  list-group-item.active  text-left" tag="button"
                           active={this.compState.selected === index}
                           onClick={() => this.onClickListItemHandle(test, index)}
                           onDoubleClick={() => this.openTestHandler()}>
              {test.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      )
    } else {
      return (
        <div className="center-screen h6 font-italic text-center">
          Тесты не найдены
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <img src={back} className="back-image"/>
        <div className="task-back-body">
          <div className="header">
            <div className="header-text">
              Список тестов:
            </div>
          </div>
          <div className="bodyList">
            {this.showTestsList()}
          </div>
        </div>
      </div>
    )
  }
}
