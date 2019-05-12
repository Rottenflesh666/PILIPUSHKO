import React from 'react';
import {inject, observer} from 'mobx-react';
import Back from '../../images/island.jpg';
import imgPerson from '../../images/person_x1.png';
import imgLock from '../../images/lock_black_x1.png';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../stateless-comp/input-login/index.css';
import './index.css';

@inject('loginStore')
@observer
export default class login extends React.Component {

  componentWillMount = () => {
    let accessMode = localStorage.getItem('accessMode');
    if (accessMode !== null) {
      accessMode === 0 ? this.props.history.push('/tests') : this.props.history.push('/tests');
    }
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userInfo: this.props.loginStore.userInfo
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          console.log('404 : Not found');
        } else if (response.status === 403) {
          console.log('403 : Authorization error');
        }
      })
      .then((response) => {
        if (!response.accessMode) {
          localStorage.setItem('accessMode', '0');
          this.props.history.push('/tests');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <MuiThemeProvider>
        <img src={Back} className="back-image"/>
        <div>
          <div className="back-frm-login">
            <div className="input-group">
              <div className="width100">
                <div>
                  <div className="width30 display-inline-block">
                    <img className="opacity-0-5" src={imgPerson}/>
                  </div>
                  <div className="width70 display-inline-block">
                    <TextField
                      hintStyle={{color: 'rgb(193, 190, 190)'}}
                      hintText=""
                      floatingLabelText="Login"
                      floatingLabelFocusStyle={{color: "#ffffff"}}
                      floatingLabelStyle={{color: '#828282'}}
                      underlineFocusStyle={{borderColor: "#ffffff"}}
                      underlineStyle={{borderColor: '#828282'}}
                      style={{
                        margin: 5,
                        width: '90%',
                        maxWidth: 300,
                        fontSize: '22px',
                        height: '72px'
                      }}
                      inputStyle={{color: '#828282'}}
                      onChange={this.props.loginStore.handleLoginChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="width30 display-inline-block">
                    <img className="lock-img-fix opacity-0-5" src={imgLock}/>
                  </div>
                  <div className="width70 display-inline-block">
                    <TextField
                      hintStyle={{color: 'rgb(193, 190, 190)'}}
                      hintText=""
                      floatingLabelText="Password"
                      floatingLabelFocusStyle={{color: "#ffffff"}}
                      floatingLabelStyle={{color: '#828282'}}
                      underlineFocusStyle={{borderColor: "#ffffff"}}
                      underlineStyle={{borderColor: '#828282'}}
                      style={{
                        margin: 5,
                        width: '90%',
                        maxWidth: 300,
                        fontSize: '22px',
                        height: '72px'
                      }}
                      inputStyle={{color: '#FFFFFF'}}
                      onChange={this.props.loginStore.handlePasswordChange}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons-block">
                <button className="btn-forgot display-inline-block">FORGOT PASSWORD</button>
                <button className="btn-login display-inline-block"
                        onClick={this.handleLoginSubmit}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
