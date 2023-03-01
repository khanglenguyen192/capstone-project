import React, { useState } from "react";
import { Modal } from "antd";

export default function ConfirmDialog(props) {
  const [isShow, setShow] = useState(props.isShow);

  const footer = [
    <button
      class="btn btn-custom save-event waves-effect waves-light btn-fw"
      type="button"
      onClick={props.mainActionButtonClick}
    >
      {props.mainButtonText}
    </button>,
    <button
      class="btn btn-light waves-effect btn-fw"
      type="button"
      onClick={props.subActionButtonClick}
    >
      {props.subButtonText}
    </button>,
  ];

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal
        title={props.title}
        open={isShow}
        footer={footer}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </div>
  );
}

// export default function ConfirmDialog(props) {
//   return (
//     <div>
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">
//           {props.title}
//         </h5>
//         <button
//           type="button"
//           class="close"
//           data-dismiss="modal"
//           onClick="closeModal()"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <h5>{props.content}</h5>
//         {/* <div *ngIf="model.HTML" [innerHTML]="model.HTML"></div> */}
//       </div>
//       <div class="modal-footer">
//         <button
//           class="btn btn-custom save-event waves-effect waves-light btn-fw"
//           type="button"
//           onClick="yesBtnClicked()"
//         >
//           {props.mainActionButtonText}
//         </button>
//         <button
//           class="btn btn-light waves-effect btn-fw"
//           type="button"
//           onClick="noBtnClicked()"
//         >
//           {props.subActionButtonText}
//         </button>
//       </div>
//     </div>
//   );
// }
