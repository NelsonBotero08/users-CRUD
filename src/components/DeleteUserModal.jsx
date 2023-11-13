import React from "react";
import "../Styles/ModalDelete.css";

const DeleteUserModal = ({ handleModalDelet, user, handleDelete }) => {
  return (
    <div className="modal-overlaydelete">
      <div className="content__delete">
        <h3 className="delete__title">Eliminar Usuario</h3>
        <p className="delete__name">
          {user.first_name} {user.last_name}
        </p>

        <div className="delete__div--btn">
          <button className="delete__btn--yes" onClick={() => handleDelete()}>
            Aceptar
          </button>
          <button
            className="delete__btn--no"
            onClick={() => handleModalDelet()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
