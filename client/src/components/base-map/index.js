import React from 'react';
import {inject, observer} from 'mobx-react';
import back from '../../images/notepad_coffe.jpg';
import {Button} from 'reactstrap';
import './index.css';

@observer
export default class TestsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }

  componentWillMount = () => {

  };

  onBackHandler=()=>{
    this.router.history.goBack;
  };

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img" src={imagePreviewUrl}/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div>
        <img src={back} className="back-image"/>
        <div className="task-back-body">
          <div className="header">
            <div className="header-text">
              Вспомогательное изображение базы к тесту
            </div>
          </div>
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <div className="footer bg-primary h-45px">
            <div className="rightButtonsContainer">
              <div className="display-inline btnRight228 ">
                <input className="fileInput" id="fuckInput"
                       type="file"
                       onChange={(e) => this.handleImageChange(e)}/>
                <label htmlFor="fuckInput" style={{
                  height: '100%',
                  marginBottom: '0',
                  width: '100%',
                  textAlign: 'center',
                }} onChange={(e) => this.handleImageChange(e)}
                >
                  <div className="lblTxt">
                    Выберите файл
                  </div>
                </label>
              </div>
              <div className="display-inline button-right2">
                <Button className="width100 h-100 button"
                        onClick={this.onEditClickHandler}> {'Развернуть'}
                </Button>
              </div>
            </div>
            <div className="display-inline button-left ">
              <Button className="width120 h-100 button"
                      disabled={this.iterator === 0}
                      onClick={this.props.history.goBack}> {'Назад'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


{/*
<input className="fileInput"
       type="file"
       onChange={(e)=>this._handleImageChange(e)} />*/
}
