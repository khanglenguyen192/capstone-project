import React, { useState } from "react";
import { Modal } from "antd";

export default function ConfirmDialog(props) {
  const footer = [
    <button
      class="btn btn-custom save-event waves-effect waves-light btn-fw"
      type="button"
      onClick={props.mainButtonClick}
    >
      {props.mainButtonText}
    </button>,
    <button
      class="btn btn-light waves-effect btn-fw ml-3"
      type="button"
      onClick={props.subButtonClick}
    >
      {props.subButtonText}
    </button>,
  ];

  return (
    <Modal
      title={props.title}
      open={props.isShow}
      footer={footer}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  );
}
