import React from "react";

export default function AddButton(props) {
  return (
    <button
      type="button"
      class="btn btn-custom btn-rounded w-md waves-effect waves-light mb-4"
      routerLink="/add-project"
      onClick={props.onClick}
    >
      <i class="mdi mdi-plus-circle"></i> {props.text}
    </button>
  );
}
