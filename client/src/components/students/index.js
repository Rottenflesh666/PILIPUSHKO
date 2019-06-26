import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextArea} from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {observable} from "mobx/lib/mobx";
import back from '../../images/adminBack.jpg';
import StudentsTable from '../stateless-comp/table';

import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class Students extends React.Component {

  componentWillMount = () => {

  };


  onCreateHandler = () => {

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

              <StudentsTable/>
              <div className="footer bg-primary h-45px">
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
