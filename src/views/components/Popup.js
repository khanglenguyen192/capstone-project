import React from 'react';
import './Popup.css';


export default function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        { props.children }
        <div className='btn'>
          <button id='btn-cancel' onClick={ () => props.setTrigger(false) }>Hủy bỏ</button>
          <button id='btn-accept' onClick={ () => props.setTrigger(false) }>Hoàn tất</button>
        </div>
      </div>
    </div>
  ) : "";
}