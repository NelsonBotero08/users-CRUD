import React, { useState } from "react";
import "../Styles/UserCard.css";
import DeleteUserModal from "./DeleteUserModal";

const UserCard = ({
  user,
  deleteUser,
  setInfoUpdate,
  openModal,
  handleUserClick,
}) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleModalDelet = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteUser("/users", user.id);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    setInfoUpdate(user);
    openModal();
  };

  return (
    <article
      onClick={() => handleUserClick(user)}
      className="article__usercard"
    >
      <section className="usercard__section">
        {user.image_url ? (
          <img
            className="usercard__img"
            src={user.image_url}
            alt={user.first_name}
          />
        ) : (
          <i className="bx bx-user bx-user--usercard"></i>
        )}
        <h3 className="usercard__name">
          {user.first_name} {user.last_name}
        </h3>
      </section>
      <ul className="usercard__info">
        <li className="usercard__list">
          <span className="usercard__label">Email</span>
          <span className="usercard__value">{user.email}</span>
        </li>
        <li className="usercard__list">
          <span className="usercard__label">Birthday</span>
          <span className="usercard__value">
            <i className="bx bx-gift birthday"></i>
            {user.birthday}
          </span>
        </li>
        <div className="usercard__btn">
          <i
            className="bx bxs-trash delete"
            onClick={(e) => {
              e.stopPropagation();
              handleModalDelet();
            }}
          ></i>
          {openModalDelete && (
            <DeleteUserModal
              handleModalDelet={handleModalDelet}
              user={user}
              handleDelete={handleDelete}
            />
          )}
          <i className="bx bx-edit-alt update" onClick={handleSubmit}></i>
        </div>
      </ul>
      {showSuccessMessage && (
        <div className="success-message--delete">
          <p className="success-message__p--delete">
            Usuario eliminado con éxito
          </p>
        </div>
      )}
    </article>
  );
};

export default UserCard;
