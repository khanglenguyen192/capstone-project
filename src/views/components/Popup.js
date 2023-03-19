import React from "react";
import "../pages/department/Department.css";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h4 className="title" style={{ margin: "0" }}>
          {props.title}
        </h4>
        {props.children}
        <div className="btn">
          <button id="btn-cancel" onClick={() => props.setTrigger(false)}>
            Hủy bỏ
          </button>
          <button id="btn-accept" onClick={() => props.setTrigger(false)}>
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
