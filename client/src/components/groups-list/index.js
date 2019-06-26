import React from 'react';
import {inject, observer} from 'mobx-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {observable} from "mobx";
import back from '../../images/adminBack.jpg';
import './index.css';

@inject("groupsStore")
@observer

export default class GroupsList extends React.Component {

  @observable
  compState = {
    selected: null,
    selectedGroupID: null,
    selectedGroupName: null
  };

  componentWillMount = () => {
    if (localStorage.getItem('groupId')) localStorage.removeItem('groupId');
    fetch('/api/groups', {
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
        this.props.groupsStore.setData(response.groupsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickListItemHandle(group, selectedIndex) {
    this.compState = ({
      selected: selectedIndex,
      selectedGroupID: group.id,
      selectedGroupName: group.name,
    });
  }

  openGroupHandler() {
    localStorage.setItem('groupId', this.compState.selectedGroupID);
    this.props.history.push('/admin/groups/students');
  }

  showGroupsList() {
    if (this.props.groupsStore.groupsList.length > 0) {
      return (
        <ListGroup className="list">
          {this.props.groupsStore.getData.map((test, index) => (
            <ListGroupItem className="list-item  list-group-item.active  text-left" tag="button"
                           active={this.compState.selected === index}
                           onClick={() => this.onClickListItemHandle(test, index)}
                           onDoubleClick={() => this.openGroupHandler()}>
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
        <div>
          <div className="task-back-body">
            <div className="header">
              <div className="header-text">
                Список групп:
              </div>
            </div>
            {this.showGroupsList()}
          </div>
        </div>
      </div>
    )
  }
}
