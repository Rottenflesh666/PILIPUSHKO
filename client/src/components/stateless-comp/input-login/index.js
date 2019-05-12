import React from 'react';
import './index.css';

const LoginInput = props => (
  <div className="width100">
    <input
      className="input-login"
      required={props.required}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.control}
      placeholder={props.placeholder}
      autoComplete="off"/>
  </div>
);

export default LoginInput;
