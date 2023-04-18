import React from 'react';
import './Popup.css';

export default function Popup(props) {
const handleSubmit = () => {
  props.setTrigger(false);
  props.onSubmit();
}

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <h4 className='title' style={ { margin: '0' } }>{ props.title }</h4>
        { props.children }
        <div className='btn'>
          <button id='btn-cancel' onClick={ () => props.setTrigger(false) }>Hủy bỏ</button>
          <button id='btn-accept' onClick={ handleSubmit }>Hoàn tất</button>
        </div>
      </div>
    </div>
  ) : "";
}