import React from 'react';
import {inject, observer} from 'mobx-react';
import {TextArea} from 'semantic-ui-react';
import {observable} from "mobx";
import {Button} from 'reactstrap';
import './index.css';

@inject("testsStore")
@observer
class Tasks extends React.Component {

  @observable messageText = '';
  @observable isEnd = false;
  @observable tasks = [
    {
      id: '1',
      task: 'aaaa',
    },
    {
      id: '2',
      task: 'sssss',
    },
    {
      id: '3',
      task: 'ddddd',
    },
    {
      id: '4',
      task: 'fffff',
    },
  ];

  @observable iterator = 0;

  componentWillMount = () => {
    //Get tests list FETCH('testsList')

  };

  onTextChange = (event) => {
    this.messageText = event.target.value;
  };

  onClickHandler = (e) =>{
    e.preventDefault();
    if(!this.isEnd) this.iterator++;
    if(this.iterator + 1 > this.tasks.length -1) this.isEnd = true;
  };

  render() {
    return (
      <div>
        <div className="body-with-headFooter">
          {this.tasks[this.iterator].task}
        </div>
        <div>
          <TextArea autoHeight className="message-input" rows={1}
                    value={this.messageText} onChange={this.onTextChange} required/>
        </div>
        <div>
          <Button onClick={this.onClickHandler}> {this.isEnd ? 'Закончить тест' : 'Далее'} </Button>
        </div>

      </div>
    )
  }
}

export default Tasks;
