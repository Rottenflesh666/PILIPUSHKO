import React from 'react';
import {inject, observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Button} from 'reactstrap';
import '../stateless-comp/input-login/index.css';
import './index.css';

@observer
export default class Admin extends React.Component {

  componentWillMount = () => {
        let accessMode = localStorage.getItem('accessMode');
        if (accessMode === null || accessMode !== '1') {
          this.props.history.push('/login');
        }
  };

  handleGroupsButton = (e) => {
    e.preventDefault();
    this.props.history.push('/admin/groups');

  };

  handleCreateTestButton = (e) => {
    e.preventDefault();
    this.props.history.push('/admin/creation');
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Button
            onClick={this.handleCreateTestButton}> {'Создать тест'}
          </Button>
        </div>
        <div>
          <Button
            disabled={this.iterator === 0}
            onClick={this.handleGroupsButton}> {'Cписок групп'}
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}
